#!/usr/bin/env python3
"""收银系统后端 — SQLite + HTTP API"""

import sqlite3
import json
import os
import mimetypes
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.db")
STATIC_DIR = os.path.dirname(os.path.abspath(__file__))
PORT = 8999

# ====== 数据库初始化 ======
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # 品牌
    c.execute('''CREATE TABLE IF NOT EXISTS brands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        status TEXT DEFAULT '启用'
    )''')

    # 产品类型（系列分类）
    c.execute('''CREATE TABLE IF NOT EXISTS types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        sort INTEGER DEFAULT 1
    )''')

    # 规格/单位（分层结构）
    c.execute('''CREATE TABLE IF NOT EXISTS spec_units (
        id TEXT PRIMARY KEY,
        sort_order INTEGER DEFAULT 1
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS spec_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        unit_id TEXT NOT NULL,
        name TEXT NOT NULL,
        sort_order INTEGER DEFAULT 1,
        FOREIGN KEY (unit_id) REFERENCES spec_units(id)
    )''')

    # 项目分类
    c.execute('''CREATE TABLE IF NOT EXISTS project_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sort INTEGER DEFAULT 1
    )''')

    # 自定义标签
    c.execute('''CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        sort INTEGER DEFAULT 1
    )''')

    # 手牌
    c.execute('''CREATE TABLE IF NOT EXISTS hand_cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL UNIQUE,
        store TEXT DEFAULT ''
    )''')

    # 产品
    c.execute('''CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        spec TEXT DEFAULT '',
        category TEXT DEFAULT '',
        status TEXT DEFAULT '启用',
        scope TEXT DEFAULT '',
        benchmark TEXT DEFAULT '否',
        brand TEXT DEFAULT '',
        position TEXT DEFAULT '',
        gift TEXT DEFAULT ''
    )''')

    # 插入默认数据（只在首次创建表时）
    _insert_defaults(c)
    conn.commit()
    conn.close()

def _insert_defaults(c):
    # 品牌默认
    c.execute("SELECT COUNT(*) FROM brands")
    if c.fetchone()[0] == 0:
        defaults = [
            '三合堂', '同仁堂', '云南白药', '片仔癀', '东阿阿胶',
            '广誉远', '九芝堂', '太极集团', '华润三九', '白云山',
            '马应龙', '江中', '修正'
        ]
        for name in defaults:
            c.execute("INSERT OR IGNORE INTO brands (name, status) VALUES (?, '启用')", (name,))

    # 类型默认
    c.execute("SELECT COUNT(*) FROM types")
    if c.fetchone()[0] == 0:
        types = [('畅销系列',1), ('内衣产品系列',2), ('童装系列',3), ('自定义系列',4)]
        for name, sort in types:
            c.execute("INSERT OR IGNORE INTO types (name, sort) VALUES (?,?)", (name, sort))

    # 规格/单位默认
    c.execute("SELECT COUNT(*) FROM spec_units")
    if c.fetchone()[0] == 0:
        units = ['瓶', '盒', '个', '套', '包', '罐', '箱']
        for i, u in enumerate(units):
            c.execute("INSERT OR IGNORE INTO spec_units (id, sort_order) VALUES (?,?)", (u, i+1))
        specs = [
            ('瓶', '50ml', 1), ('瓶', '100ml', 2), ('瓶', '200ml', 3), ('瓶', '500ml', 4),
            ('盒', '5片', 1), ('盒', '10片', 2), ('盒', '20片', 3), ('盒', '10包', 4), ('盒', '10根', 5), ('盒', '20贴', 6),
            ('个', '1个/包', 1), ('套', '1套/盒', 1),
        ]
        for unit_id, name, sort in specs:
            c.execute("INSERT OR IGNORE INTO spec_items (unit_id, name, sort_order) VALUES (?,?,?)",
                      (unit_id, name, sort))

    # 项目分类默认
    c.execute("SELECT COUNT(*) FROM project_categories")
    if c.fetchone()[0] == 0:
        categories = [('情趣系列',1),('内生系列',2),('经典项目',3),
                      ('特色项目',4),('艾灸系列',5),('理疗项目',6)]
        for name, sort in categories:
            c.execute("INSERT INTO project_categories (name, sort) VALUES (?,?)", (name, sort))

    # 自定义标签默认
    c.execute("SELECT COUNT(*) FROM tags")
    if c.fetchone()[0] == 0:
        tags = [('热卖',1),('新品',2),('限时优惠',3),('火爆',4),('畅销',5),('推荐',6)]
        for name, sort in tags:
            c.execute("INSERT INTO tags (name, sort) VALUES (?,?)", (name, sort))

    # 手牌默认
    c.execute("SELECT COUNT(*) FROM hand_cards")
    if c.fetchone()[0] == 0:
        for i in range(1, 11):
            code = f"sh{i:02d}"
            c.execute("INSERT INTO hand_cards (code, store) VALUES (?, '三合900店')", (code,))

    # 产品默认
    c.execute("SELECT COUNT(*) FROM products")
    if c.fetchone()[0] == 0:
        products = [
            ('瑶浴药包-排毒', '盒>10包', '瑶浴系列', '启用', '全身', '热卖,畅销', '—', '—', '—'),
            ('瑶浴药包-活血', '盒>10片', '瑶浴系列', '启用', '全身', '畅销', '—', '—', '—'),
            ('瑶浴药包-温阳', '盒>10包', '瑶浴系列', '启用', '全身', '新品', '—', '—', '—'),
            ('艾条-纯金艾', '盒>10根', '艾条系列', '启用', '—', '热卖,推荐', '—', '—', '—'),
            ('艾条-药艾', '盒>10根', '艾条系列', '启用', '—', '热卖', '—', '—', '—'),
            ('精油-薰衣草', '瓶>100ml', '精油系列', '启用', '全身', '热卖,畅销,限时优惠', '—', '—', '是'),
            ('精油-茶树', '瓶>50ml', '精油系列', '停用', '局部', '', '—', '—', '—'),
            ('刮痧板-牛角', '个>1个', '器具', '启用', '—', '推荐', '—', '—', '是'),
            ('拔罐套装-12罐', '套>1套', '器具', '启用', '—', '新品', '—', '—', '—'),
            ('姜贴-驱寒', '盒>20片', '贴敷系列', '启用', '局部', '热卖,新品', '—', '—', '—'),
        ]
        for p in products:
            c.execute("INSERT INTO products (name,spec,category,status,scope,benchmark,brand,position,gift) VALUES (?,?,?,?,?,?,?,?,?)", p)

# ====== HTTP Handler ======
class Handler(BaseHTTPRequestHandler):
    def _send(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode())

    def _serve_static(self, path):
        """提供静态文件服务"""
        if path == '/' or path == '':
            path = '/index.html'
        file_path = os.path.join(STATIC_DIR, path.lstrip('/'))
        # 安全检查：防止路径穿越
        real_path = os.path.realpath(file_path)
        if not real_path.startswith(os.path.realpath(STATIC_DIR)):
            self.send_error(403)
            return
        if not os.path.isfile(real_path):
            self.send_error(404)
            return
        content_type, _ = mimetypes.guess_type(real_path)
        if not content_type:
            content_type = 'application/octet-stream'
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        with open(real_path, 'rb') as f:
            self.wfile.write(f.read())

    def do_OPTIONS(self):
        self._send({})

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip('/')
        params = parse_qs(parsed.query)

        # API 路由
        if path.startswith('/api/'):
            self._handle_api_get(path, params)
            return

        # 静态文件
        self._serve_static(path)

    def _handle_api_get(self, path, params):
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        c = conn.cursor()

        try:
            if path == '/api/brands':
                c.execute("SELECT id, name, status FROM brands ORDER BY id")
                rows = [dict(r) for r in c.fetchall()]
                self._send({'code': 0, 'data': rows})

            elif path == '/api/types':
                c.execute("SELECT id, name, sort FROM types ORDER BY sort")
                rows = [dict(r) for r in c.fetchall()]
                self._send({'code': 0, 'data': rows})

            elif path == '/api/spec-units':
                c.execute("SELECT id, sort_order FROM spec_units ORDER BY sort_order")
                units = []
                for u in c.fetchall():
                    unit_id = u['id']
                    c.execute("SELECT id, name, sort_order FROM spec_items WHERE unit_id=? ORDER BY sort_order",
                              (unit_id,))
                    items = [dict(i) for i in c.fetchall()]
                    units.append({'id': unit_id, 'specs': items})
                self._send({'code': 0, 'data': units})

            elif path == '/api/project-categories':
                c.execute("SELECT id, name, sort FROM project_categories ORDER BY sort")
                rows = [dict(r) for r in c.fetchall()]
                self._send({'code': 0, 'data': rows})

            elif path == '/api/tags':
                c.execute("SELECT id, name, sort FROM tags ORDER BY sort")
                rows = [dict(r) for r in c.fetchall()]
                self._send({'code': 0, 'data': rows})

            elif path == '/api/hand-cards':
                c.execute("SELECT id, code, store FROM hand_cards ORDER BY id")
                rows = [dict(r) for r in c.fetchall()]
                self._send({'code': 0, 'data': rows})

            elif path == '/api/products':
                c.execute("SELECT id, name, spec, category, status, scope, benchmark, brand, position, gift FROM products ORDER BY id")
                rows = [dict(r) for r in c.fetchall()]
                self._send({'code': 0, 'data': rows})

            elif path.startswith('/api/products/'):
                pid = path.split('/')[-1]
                c.execute("SELECT id, name, spec, category, status, scope, benchmark, brand, position, gift FROM products WHERE id=?", (pid,))
                row = c.fetchone()
                if row:
                    self._send({'code': 0, 'data': dict(row)})
                else:
                    self._send({'code': 404, 'msg': '产品不存在'}, 404)

            # ====== 订单 ======
            elif path == '/api/orders':
                c.execute("SELECT * FROM orders ORDER BY id DESC")
                rows = [dict(r) for r in c.fetchall()]
                self._send({'code': 0, 'data': rows})

            elif path.startswith('/api/orders/'):
                oid = path.split('/')[-1]
                c.execute("SELECT * FROM orders WHERE id=?", (oid,))
                row = c.fetchone()
                if row:
                    self._send({'code': 0, 'data': dict(row)})
                else:
                    self._send({'code': 404, 'msg': '订单不存在'}, 404)

            # ====== 会员 ======
            elif path == '/api/members':
                c.execute("SELECT * FROM members ORDER BY id DESC")
                rows = [dict(r) for r in c.fetchall()]
                self._send({'code': 0, 'data': rows})

            elif path.startswith('/api/members/'):
                mid = path.split('/')[-1]
                c.execute("SELECT * FROM members WHERE id=?", (mid,))
                row = c.fetchone()
                if row:
                    self._send({'code': 0, 'data': dict(row)})
                else:
                    self._send({'code': 404, 'msg': '会员不存在'}, 404)

            # ====== 预约 ======
            elif path == '/api/bookings':
                c.execute("SELECT * FROM bookings ORDER BY id DESC")
                rows = [dict(r) for r in c.fetchall()]
                self._send({'code': 0, 'data': rows})

            elif path.startswith('/api/bookings/'):
                bid = path.split('/')[-1]
                c.execute("SELECT * FROM bookings WHERE id=?", (bid,))
                row = c.fetchone()
                if row:
                    self._send({'code': 0, 'data': dict(row)})
                else:
                    self._send({'code': 404, 'msg': '预约不存在'}, 404)

            else:
                self._send({'code': 404, 'msg': 'Not Found'}, 404)
        finally:
            conn.close()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip('/')
        if not path.startswith('/api/'):
            self.send_error(404)
            return
        length = int(self.headers.get('Content-Length', 0))
        body = json.loads(self.rfile.read(length)) if length else {}

        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()

        try:
            if path == '/api/brands':
                name = body.get('name', '').strip()
                if not name:
                    self._send({'code': 1, 'msg': '品牌名称不能为空'})
                    return
                try:
                    c.execute("INSERT INTO brands (name, status) VALUES (?, '启用')", (name,))
                    conn.commit()
                    self._send({'code': 0, 'msg': '新增成功', 'data': {'id': c.lastrowid}})
                except sqlite3.IntegrityError:
                    self._send({'code': 2, 'msg': '品牌已存在'})

            elif path == '/api/types':
                name = body.get('name', '').strip()
                sort = int(body.get('sort', 1))
                if not name:
                    self._send({'code': 1, 'msg': '类型名称不能为空'})
                    return
                try:
                    c.execute("INSERT INTO types (name, sort) VALUES (?,?)", (name, sort))
                    conn.commit()
                    self._send({'code': 0, 'msg': '新增成功', 'data': {'id': c.lastrowid}})
                except sqlite3.IntegrityError:
                    self._send({'code': 2, 'msg': '类型已存在'})

            elif path == '/api/spec-units':
                unit_id = body.get('id', '').strip()
                if not unit_id:
                    self._send({'code': 1, 'msg': '单位名称不能为空'})
                    return
                try:
                    c.execute("SELECT COUNT(*) FROM spec_units WHERE id=?", (unit_id,))
                    if c.fetchone()[0] == 0:
                        c.execute("INSERT INTO spec_units (id) VALUES (?)", (unit_id,))
                        conn.commit()
                    self._send({'code': 0, 'msg': '新增成功'})
                except sqlite3.IntegrityError:
                    self._send({'code': 2, 'msg': '单位已存在'})

            elif path == '/api/spec-items':
                unit_id = body.get('unit_id', '')
                name = body.get('name', '').strip()
                sort = int(body.get('sort', 1))
                if not unit_id or not name:
                    self._send({'code': 1, 'msg': '参数不完整'})
                    return
                c.execute("INSERT INTO spec_items (unit_id, name, sort_order) VALUES (?,?,?)",
                          (unit_id, name, sort))
                conn.commit()
                self._send({'code': 0, 'msg': '新增成功', 'data': {'id': c.lastrowid}})

            elif path == '/api/project-categories':
                name = body.get('name', '').strip()
                sort = int(body.get('sort', 1))
                if not name:
                    self._send({'code': 1, 'msg': '分类名称不能为空'})
                    return
                c.execute("INSERT INTO project_categories (name, sort) VALUES (?,?)", (name, sort))
                conn.commit()
                self._send({'code': 0, 'msg': '新增成功', 'data': {'id': c.lastrowid}})

            elif path == '/api/tags':
                name = body.get('name', '').strip()
                sort = int(body.get('sort', 1))
                if not name:
                    self._send({'code': 1, 'msg': '标签名称不能为空'})
                    return
                try:
                    c.execute("INSERT INTO tags (name, sort) VALUES (?,?)", (name, sort))
                    conn.commit()
                    self._send({'code': 0, 'msg': '新增成功', 'data': {'id': c.lastrowid}})
                except sqlite3.IntegrityError:
                    self._send({'code': 2, 'msg': '标签已存在'})

            elif path == '/api/hand-cards':
                code = body.get('code', '').strip()
                store = body.get('store', '三合900店').strip()
                if not code:
                    self._send({'code': 1, 'msg': '手牌编码不能为空'})
                    return
                try:
                    c.execute("INSERT INTO hand_cards (code, store) VALUES (?,?)", (code, store))
                    conn.commit()
                    self._send({'code': 0, 'msg': '新增成功', 'data': {'id': c.lastrowid}})
                except sqlite3.IntegrityError:
                    self._send({'code': 2, 'msg': '手牌编码已存在'})

            elif path == '/api/products':
                name = body.get('name', '').strip()
                if not name:
                    self._send({'code': 1, 'msg': '产品名称不能为空'})
                    return
                spec = body.get('spec', '')
                category = body.get('category', '')
                status = body.get('status', '启用')
                scope = body.get('scope', '')
                benchmark = body.get('benchmark', '否')
                brand = body.get('brand', '')
                position = body.get('position', '')
                gift = body.get('gift', '')
                c.execute("INSERT INTO products (name,spec,category,status,scope,benchmark,brand,position,gift) VALUES (?,?,?,?,?,?,?,?,?)",
                          (name, spec, category, status, scope, benchmark, brand, position, gift))
                conn.commit()
                self._send({'code': 0, 'msg': '新增成功', 'data': {'id': c.lastrowid}})

            elif path == '/api/hand-cards/batch':
                prefix = body.get('prefix', '').strip()
                start = int(body.get('start', 1))
                count = int(body.get('count', 1))
                suffix = body.get('suffix', '').strip()
                store = body.get('store', '三合900店').strip()
                if not prefix:
                    self._send({'code': 1, 'msg': '前缀不能为空'})
                    return
                if count < 1 or count > 1000:
                    self._send({'code': 1, 'msg': '数量范围 1~1000'})
                    return
                successes = 0
                errors = []
                for i in range(start, start + count):
                    code = f"{prefix}{i}{suffix}"
                    try:
                        c.execute("INSERT INTO hand_cards (code, store) VALUES (?,?)", (code, store))
                        successes += 1
                    except sqlite3.IntegrityError:
                        errors.append(code)
                conn.commit()
                msg = f"成功添加 {successes} 个手牌"
                if errors:
                    msg += f"，{len(errors)} 个已存在: {', '.join(errors[:5])}"
                    if len(errors) > 5:
                        msg += f'...等{len(errors)}个'
                self._send({'code': 0, 'msg': msg})

            # ====== 订单 POST ======
            elif path == '/api/orders':
                customer = body.get('customer', '').strip()
                order_no = body.get('order_no', '')
                import datetime, random
                if not order_no:
                    order_no = datetime.datetime.now().strftime('%Y%m%d%H%M%S') + str(random.randint(1000,9999))
                c.execute("INSERT INTO orders(order_no,customer,phone,total,payment,items,remark) VALUES(?,?,?,?,?,?,?)",
                          (order_no, customer, body.get('phone',''), body.get('total',0),
                           body.get('payment','现金'), json.dumps(body.get('items',[]), ensure_ascii=False),
                           body.get('remark','')))
                conn.commit()
                self._send({'code': 0, 'msg': '下单成功', 'data': {'id': c.lastrowid, 'order_no': order_no}})

            # ====== 会员 POST ======
            elif path == '/api/members':
                name = body.get('name', '').strip()
                if not name:
                    self._send({'code': 1, 'msg': '会员姓名不能为空'})
                    return
                c.execute("INSERT INTO members(name,phone,level,points,balance,join_date) VALUES(?,?,?,?,?,date('now'))",
                          (name, body.get('phone',''), body.get('level','普通会员'),
                           body.get('points',0), body.get('balance',0)))
                conn.commit()
                self._send({'code': 0, 'msg': '新增成功', 'data': {'id': c.lastrowid}})

            # ====== 预约 POST ======
            elif path == '/api/bookings':
                customer = body.get('customer', '').strip()
                if not customer:
                    self._send({'code': 1, 'msg': '客户姓名不能为空'})
                    return
                c.execute("INSERT INTO bookings(customer,phone,service,date,time,duration,staff,remark) VALUES(?,?,?,?,?,?,?,?)",
                          (customer, body.get('phone',''), body.get('service',''),
                           body.get('date',''), body.get('time',''),
                           body.get('duration',60), body.get('staff',''), body.get('remark','')))
                conn.commit()
                self._send({'code': 0, 'msg': '预约成功', 'data': {'id': c.lastrowid}})

            else:
                self._send({'code': 404, 'msg': 'Not Found'}, 404)
        finally:
            conn.close()

    def do_PUT(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip('/')
        if not path.startswith('/api/'):
            self.send_error(404)
            return
        length = int(self.headers.get('Content-Length', 0))
        body = json.loads(self.rfile.read(length)) if length else {}

        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()

        try:
            if path.startswith('/api/brands/'):
                brand_id = path.split('/')[-1]
                name = body.get('name', '').strip()
                status = body.get('status')
                if name:
                    try:
                        c.execute("UPDATE brands SET name=? WHERE id=?", (name, brand_id))
                    except sqlite3.IntegrityError:
                        self._send({'code': 2, 'msg': '品牌已存在'})
                        return
                if status:
                    c.execute("UPDATE brands SET status=? WHERE id=?", (status, brand_id))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            elif path.startswith('/api/types/'):
                type_id = path.split('/')[-1]
                name = body.get('name')
                sort = body.get('sort')
                if name:
                    c.execute("UPDATE types SET name=? WHERE id=?", (name, type_id))
                if sort is not None:
                    c.execute("UPDATE types SET sort=? WHERE id=?", (int(sort), type_id))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            elif path.startswith('/api/spec-units/'):
                old_id = path.split('/')[-1]
                new_id = body.get('id', '').strip()
                if not new_id:
                    self._send({'code': 1, 'msg': '单位名称不能为空'})
                    return
                # 更新单位 ID（级联更新 spec_items 的 unit_id）
                c.execute("UPDATE spec_items SET unit_id=? WHERE unit_id=?", (new_id, old_id))
                c.execute("UPDATE spec_units SET id=? WHERE id=?", (new_id, old_id))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            elif path.startswith('/api/spec-items/'):
                item_id = path.split('/')[-1]
                name = body.get('name')
                sort = body.get('sort')
                if name:
                    c.execute("UPDATE spec_items SET name=? WHERE id=?", (name, item_id))
                if sort is not None:
                    c.execute("UPDATE spec_items SET sort_order=? WHERE id=?", (int(sort), item_id))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            elif path.startswith('/api/project-categories/'):
                cat_id = path.split('/')[-1]
                name = body.get('name')
                sort = body.get('sort')
                if name:
                    c.execute("UPDATE project_categories SET name=? WHERE id=?", (name, cat_id))
                if sort is not None:
                    c.execute("UPDATE project_categories SET sort=? WHERE id=?", (int(sort), cat_id))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            elif path.startswith('/api/tags/'):
                tag_id = path.split('/')[-1]
                name = body.get('name')
                sort = body.get('sort')
                if name:
                    try:
                        c.execute("UPDATE tags SET name=? WHERE id=?", (name, tag_id))
                    except sqlite3.IntegrityError:
                        self._send({'code': 2, 'msg': '标签已存在'})
                        return
                if sort is not None:
                    c.execute("UPDATE tags SET sort=? WHERE id=?", (int(sort), tag_id))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            elif path.startswith('/api/hand-cards/'):
                card_id = path.split('/')[-1]
                code = body.get('code', '').strip()
                store = body.get('store', '').strip()
                if code:
                    try:
                        c.execute("UPDATE hand_cards SET code=? WHERE id=?", (code, card_id))
                    except sqlite3.IntegrityError:
                        self._send({'code': 2, 'msg': '手牌编码已存在'})
                        return
                if store:
                    c.execute("UPDATE hand_cards SET store=? WHERE id=?", (store, card_id))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            elif path.startswith('/api/products/'):
                pid = path.split('/')[-1]
                name = body.get('name')
                spec = body.get('spec')
                category = body.get('category')
                status = body.get('status')
                scope = body.get('scope')
                benchmark = body.get('benchmark')
                brand = body.get('brand')
                position = body.get('position')
                gift = body.get('gift')
                if name is not None:
                    c.execute("UPDATE products SET name=? WHERE id=?", (name, pid))
                if spec is not None:
                    c.execute("UPDATE products SET spec=? WHERE id=?", (spec, pid))
                if category is not None:
                    c.execute("UPDATE products SET category=? WHERE id=?", (category, pid))
                if status is not None:
                    c.execute("UPDATE products SET status=? WHERE id=?", (status, pid))
                if scope is not None:
                    c.execute("UPDATE products SET scope=? WHERE id=?", (scope, pid))
                if benchmark is not None:
                    c.execute("UPDATE products SET benchmark=? WHERE id=?", (benchmark, pid))
                if brand is not None:
                    c.execute("UPDATE products SET brand=? WHERE id=?", (brand, pid))
                if position is not None:
                    c.execute("UPDATE products SET position=? WHERE id=?", (position, pid))
                if gift is not None:
                    c.execute("UPDATE products SET gift=? WHERE id=?", (gift, pid))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            # ====== 订单 PUT ======
            elif path.startswith('/api/orders/'):
                oid = path.split('/')[-1]
                status = body.get('status')
                payment = body.get('payment')
                total = body.get('total')
                if status:
                    c.execute("UPDATE orders SET status=? WHERE id=?", (status, oid))
                if payment:
                    c.execute("UPDATE orders SET payment=? WHERE id=?", (payment, oid))
                if total is not None:
                    c.execute("UPDATE orders SET total=? WHERE id=?", (total, oid))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            # ====== 会员 PUT ======
            elif path.startswith('/api/members/'):
                mid = path.split('/')[-1]
                name = body.get('name')
                phone = body.get('phone')
                level = body.get('level')
                points = body.get('points')
                balance = body.get('balance')
                if name:
                    c.execute("UPDATE members SET name=? WHERE id=?", (name, mid))
                if phone is not None:
                    c.execute("UPDATE members SET phone=? WHERE id=?", (phone, mid))
                if level:
                    c.execute("UPDATE members SET level=? WHERE id=?", (level, mid))
                if points is not None:
                    c.execute("UPDATE members SET points=? WHERE id=?", (int(points), mid))
                if balance is not None:
                    c.execute("UPDATE members SET balance=? WHERE id=?", (float(balance), mid))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            # ====== 预约 PUT ======
            elif path.startswith('/api/bookings/'):
                bid = path.split('/')[-1]
                status = body.get('status')
                staff = body.get('staff')
                date = body.get('date')
                time = body.get('time')
                if status:
                    c.execute("UPDATE bookings SET status=? WHERE id=?", (status, bid))
                if staff:
                    c.execute("UPDATE bookings SET staff=? WHERE id=?", (staff, bid))
                if date:
                    c.execute("UPDATE bookings SET date=? WHERE id=?", (date, bid))
                if time:
                    c.execute("UPDATE bookings SET time=? WHERE id=?", (time, bid))
                conn.commit()
                self._send({'code': 0, 'msg': '更新成功'})

            else:
                self._send({'code': 404, 'msg': 'Not Found'}, 404)
        finally:
            conn.close()

    def do_DELETE(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip('/')
        if not path.startswith('/api/'):
            self.send_error(404)
            return

        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()

        try:
            if path.startswith('/api/brands/'):
                brand_id = path.split('/')[-1]
                c.execute("DELETE FROM brands WHERE id=?", (brand_id,))
                conn.commit()
                self._send({'code': 0, 'msg': '删除成功'})

            elif path.startswith('/api/types/'):
                type_id = path.split('/')[-1]
                c.execute("DELETE FROM types WHERE id=?", (type_id,))
                conn.commit()
                self._send({'code': 0, 'msg': '删除成功'})

            elif path == '/api/spec-units' and parsed.query:
                unit_id = parse_qs(parsed.query).get('id', [None])[0]
                if unit_id:
                    c.execute("DELETE FROM spec_items WHERE unit_id=?", (unit_id,))
                    c.execute("DELETE FROM spec_units WHERE id=?", (unit_id,))
                    conn.commit()
                    self._send({'code': 0, 'msg': '删除成功'})
                else:
                    self._send({'code': 1, 'msg': '缺少单位ID'})

            elif path.startswith('/api/spec-items/'):
                item_id = path.split('/')[-1]
                c.execute("DELETE FROM spec_items WHERE id=?", (item_id,))
                conn.commit()
                self._send({'code': 0, 'msg': '删除成功'})

            elif path.startswith('/api/project-categories/'):
                cat_id = path.split('/')[-1]
                c.execute("DELETE FROM project_categories WHERE id=?", (cat_id,))
                conn.commit()
                self._send({'code': 0, 'msg': '删除成功'})

            elif path.startswith('/api/tags/'):
                tag_id = path.split('/')[-1]
                c.execute("DELETE FROM tags WHERE id=?", (tag_id,))
                conn.commit()
                self._send({'code': 0, 'msg': '删除成功'})

            elif path.startswith('/api/hand-cards/'):
                if path.endswith('/batch'):
                    # 批量删除: DELETE /api/hand-cards/batch?ids=1,2,3
                    ids_str = parse_qs(parsed.query).get('ids', [None])[0]
                    if not ids_str:
                        self._send({'code': 1, 'msg': '缺少ids参数'})
                        return
                    ids = [int(x) for x in ids_str.split(',') if x.strip().isdigit()]
                    c.executemany("DELETE FROM hand_cards WHERE id=?", [(i,) for i in ids])
                    conn.commit()
                    self._send({'code': 0, 'msg': f'成功删除 {len(ids)} 个手牌'})
                else:
                    card_id = path.split('/')[-1]
                    c.execute("DELETE FROM hand_cards WHERE id=?", (card_id,))
                    conn.commit()
                    self._send({'code': 0, 'msg': '删除成功'})

            elif path.startswith('/api/products/'):
                if path.endswith('/batch'):
                    ids_str = parse_qs(parsed.query).get('ids', [None])[0]
                    if not ids_str:
                        self._send({'code': 1, 'msg': '缺少ids参数'})
                        return
                    ids = [int(x) for x in ids_str.split(',') if x.strip().isdigit()]
                    c.executemany("DELETE FROM products WHERE id=?", [(i,) for i in ids])
                    conn.commit()
                    self._send({'code': 0, 'msg': f'成功删除 {len(ids)} 个产品'})
                else:
                    pid = path.split('/')[-1]
                    c.execute("DELETE FROM products WHERE id=?", (pid,))
                    conn.commit()
                    self._send({'code': 0, 'msg': '删除成功'})

            # ====== 订单 DELETE ======
            elif path.startswith('/api/orders/'):
                oid = path.split('/')[-1]
                c.execute("DELETE FROM orders WHERE id=?", (oid,))
                conn.commit()
                self._send({'code': 0, 'msg': '删除成功'})

            # ====== 会员 DELETE ======
            elif path.startswith('/api/members/'):
                mid = path.split('/')[-1]
                c.execute("DELETE FROM members WHERE id=?", (mid,))
                conn.commit()
                self._send({'code': 0, 'msg': '删除成功'})

            # ====== 预约 DELETE ======
            elif path.startswith('/api/bookings/'):
                bid = path.split('/')[-1]
                c.execute("DELETE FROM bookings WHERE id=?", (bid,))
                conn.commit()
                self._send({'code': 0, 'msg': '删除成功'})

            else:
                self._send({'code': 404, 'msg': 'Not Found'}, 404)
        finally:
            conn.close()

    def log_message(self, format, *args):
        pass  # 静默日志，避免刷屏

# ====== 启动 ======
if __name__ == '__main__':
    init_db()
    server = HTTPServer(('0.0.0.0', PORT), Handler)
    print(f"✅ 后端服务已启动 → http://localhost:{PORT}")
    print(f"   品牌API:  http://localhost:{PORT}/api/brands")
    print(f"   类型API:  http://localhost:{PORT}/api/types")
    print(f"   规格API:  http://localhost:{PORT}/api/spec-units")
    print(f"   分类API:  http://localhost:{PORT}/api/project-categories")
    print(f"   标签API:  http://localhost:{PORT}/api/tags")
    print(f"   手牌API:  http://localhost:{PORT}/api/hand-cards")
    print(f"   产品API:  http://localhost:{PORT}/api/products")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n服务已停止")
        server.server_close()
