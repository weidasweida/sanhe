#!/usr/bin/env python3
"""
三兄弟状态更新脚本
定时查询小马弟和小马妹的 API，生成状态 JSON，推送 GitHub Pages
"""
import json
import urllib.request
import subprocess
import os
import sys
from datetime import datetime

STATUS_FILE = os.path.expanduser("~/cashier-system/docs/status.json")
REPO_DIR = os.path.expanduser("~/cashier-system")

BROTHERS = {
    "didi": {
        "name": "小马弟",
        "url": "http://47.236.39.12:8083/v1/chat/completions",
        "key": "A117118b.26"
    },
    "meimei": {
        "name": "小马妹",
        "url": "http://47.84.125.253:8084/v1/chat/completions",
        "key": "A117118b.26"
    }
}

def check_brother(bid, info):
    """查询一个兄弟的状态"""
    payload = json.dumps({
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": "你现在在做什么任务？用一句话简短回答"}]
    }).encode()
    
    req = urllib.request.Request(
        info["url"],
        data=payload,
        headers={
            "Authorization": f"Bearer {info['key']}",
            "Content-Type": "application/json"
        },
        method="POST"
    )
    
    result = {
        "name": info["name"],
        "status": "unknown",
        "task": "",
        "last_seen": datetime.now().strftime("%H:%M:%S"),
        "error": ""
    }
    
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        data = json.loads(resp.read())
        content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        result["status"] = "online"
        result["task"] = content.strip()[:200]
    except Exception as e:
        result["status"] = "offline"
        result["error"] = str(e)[:100]
    
    return result

def push_status(status_data):
    """推送状态文件到 GitHub"""
    os.chdir(REPO_DIR)
    
    # 写状态文件
    with open(STATUS_FILE, "w", encoding="utf-8") as f:
        json.dump(status_data, f, ensure_ascii=False, indent=2)
    
    # git commit & push
    try:
        subprocess.run(["git", "add", "docs/status.json"], capture_output=True)
        subprocess.run(["git", "commit", "-m", f"更新状态 {status_data['updated_at']}"], capture_output=True)
        result = subprocess.run(["git", "push"], capture_output=True, text=True)
        return result.stdout + result.stderr
    except Exception as e:
        return str(e)

def main():
    status = {
        "boss": {
            "name": "小马哥",
            "status": "online",
            "task": "统筹监督：拆解任务 → 派发 → 检查质量 → 返工",
            "last_seen": datetime.now().strftime("%H:%M:%S")
        },
        "brothers": {},
        "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "stats": {
            "online": 0,
            "offline": 0,
            "working": 0
        }
    }
    
    for bid, info in BROTHERS.items():
        result = check_brother(bid, info)
        status["brothers"][bid] = result
        if result["status"] == "online":
            status["stats"]["online"] += 1
        else:
            status["stats"]["offline"] += 1
    
    # 小马哥也算在线
    status["stats"]["online"] += 1
    
    push_status(status)
    print(f"状态已更新: {status['updated_at']}")
    for bid, s in status["brothers"].items():
        print(f"  {s['name']}: {s['status']} - {s['task'][:60]}")

if __name__ == "__main__":
    main()
