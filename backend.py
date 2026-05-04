#!/usr/bin/env python3
"""收银系统POS v3.0 - SQLite + REST API"""
import sqlite3, json, os, mimetypes, re, urllib.parse, datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.db")
STATIC = os.path.dirname(os.path.abspath(__file__))
PORT = 8999

def init_db():
    c = sqlite3.connect(DB).cursor()
    tables = [
        "CREATE TABLE IF NOT EXISTS brands(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL UNIQUE,status TEXT DEFAULT '启用',sort INTEGER DEFAULT 1)",
        "CREATE TABLE IF NOT EXISTS types(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL UNIQUE,sort INTEGER DEFAULT 1)",
        "CREATE TABLE IF NOT EXISTS spec_units(id TEXT PRIMARY KEY,sort_order INTEGER DEFAULT 1)",
        "CREATE TABLE IF NOT EXISTS spec_items(id INTEGER PRIMARY KEY AUTOINCREMENT,unit_id TEXT NOT NULL,name TEXT NOT NULL,sort_order INTEGER DEFAULT 1,FOREIGN KEY(unit_id)REFERENCES spec_units(id))",
        "CREATE TABLE IF NOT EXISTS project_categories(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,sort INTEGER DEFAULT 1)",
        "CREATE TABLE IF NOT EXISTS tags(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL UNIQUE,sort INTEGER DEFAULT 1)",
        "CREATE TABLE IF NOT EXISTS scopes(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL UNIQUE,status TEXT DEFAULT '启用')",
        "CREATE TABLE IF NOT EXISTS hand_cards(id INTEGER PRIMARY KEY AUTOINCREMENT,code TEXT NOT NULL UNIQUE,store TEXT DEFAULT '')",
        "CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,spec TEXT DEFAULT '',category TEXT DEFAULT '',status TEXT DEFAULT '启用',scope TEXT DEFAULT '',brand TEXT DEFAULT '',position TEXT DEFAULT '',gift TEXT DEFAULT '',tags TEXT DEFAULT '',price REAL DEFAULT 0,cost REAL DEFAULT 0,stock INTEGER DEFAULT 0)",
        "CREATE TABLE IF NOT EXISTS projects(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,category_id INTEGER,status TEXT DEFAULT '启用',sales_price REAL DEFAULT 0,cost_price REAL DEFAULT 0,available_times INTEGER DEFAULT 1,sales_count INTEGER DEFAULT 0)",
        "CREATE TABLE IF NOT EXISTS packages(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,price REAL DEFAULT 0,status TEXT DEFAULT '启用',items TEXT DEFAULT '')",
        "CREATE TABLE IF NOT EXISTS gifts(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,points INTEGER DEFAULT 0,stock INTEGER DEFAULT 0,status TEXT DEFAULT '启用')",
        "CREATE TABLE IF NOT EXISTS stored_cards(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,face_value REAL DEFAULT 0,price REAL DEFAULT 0,status TEXT DEFAULT '启用')",
        "CREATE TABLE IF NOT EXISTS members(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,phone TEXT,level TEXT DEFAULT '普通会员',points INTEGER DEFAULT 0,balance REAL DEFAULT 0,total_consumption REAL DEFAULT 0,join_date TEXT DEFAULT(date('now')),status TEXT DEFAULT '正常')",
        "CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY AUTOINCREMENT,order_no TEXT NOT NULL UNIQUE,customer TEXT,phone TEXT,total REAL DEFAULT 0,payment TEXT DEFAULT '',status TEXT DEFAULT '已完成',items TEXT DEFAULT '',created_at TEXT DEFAULT(datetime('now','localtime')),remark TEXT DEFAULT '')",
        "CREATE TABLE IF NOT EXISTS bookings(id INTEGER PRIMARY KEY AUTOINCREMENT,customer TEXT NOT NULL,phone TEXT,service TEXT,date TEXT,time TEXT,duration INTEGER DEFAULT 60,status TEXT DEFAULT '待确认',staff TEXT DEFAULT '',remark TEXT DEFAULT '',created_at TEXT DEFAULT(datetime('now','localtime')))",
        "CREATE TABLE IF NOT EXISTS coupons(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,type TEXT DEFAULT '满减',value REAL DEFAULT 0,min_amount REAL DEFAULT 0,status TEXT DEFAULT '启用',stock INTEGER DEFAULT 100,used INTEGER DEFAULT 0)",
        "CREATE TABLE IF NOT EXISTS rooms(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,beds INTEGER DEFAULT 1,status TEXT DEFAULT '启用')",
    ]
    for s in tables:
        c.execute(s)
    if c.execute("SELECT COUNT(*)FROM brands").fetchone()[0]==0:
        for x in["三合堂","同仁堂","云南白药","片仔癀","东阿阿胶","广誉远"]:c.execute("INSERT INTO brands(name)VALUES(?)",(x,))
        for x,n in[("畅销系列",1),("内衣产品系列",2),("童装系列",3),("自定义系列",4)]:c.execute("INSERT INTO types(name,sort)VALUES(?,?)",(x,n))
        for x,n in[("瓶",1),("盒",2),("个",3),("套",4),("包",5),("罐",6),("箱",7)]:c.execute("INSERT INTO spec_units(id,sort_order)VALUES(?,?)",(x,n))
        for u,x in[("瓶","50ml"),("瓶","100ml"),("瓶","200ml"),("瓶","500ml"),("盒","5片"),("盒","10片"),("盒","20片"),("盒","10包"),("盒","10根"),("盒","20贴"),("个","1个/包"),("套","1套/盒")]:c.execute("INSERT INTO spec_items(unit_id,name)VALUES(?,?)",(u,x))
        for x,n in[("热卖",1),("新品",2),("限时优惠",3),("火爆",4),("畅销",5),("推荐",6)]:c.execute("INSERT INTO tags(name,sort)VALUES(?,?)",(x,n))
        for x in["全身","局部","头部","足部","背部"]:c.execute("INSERT INTO scopes(name)VALUES(?)",(x,))
        for x,n in[("情趣系列",1),("内生系列",2),("经典项目",3),("特色项目",4),("艾灸系列",5),("理疗项目",6)]:c.execute("INSERT INTO project_categories(name,sort)VALUES(?,?)",(x,n))
        for pdata in[("瑶浴药包-排毒","盒>10包","瑶浴系列","全身","热卖,畅销","三合堂","",""),("瑶浴药包-活血","盒>10片","瑶浴系列","全身","畅销","三合堂","",""),("瑶浴药包-温阳","盒>10包","瑶浴系列","全身","新品","三合堂","",""),("艾条-纯金艾","盒>10根","艾条系列","","热卖,推荐","同仁堂","",""),("艾条-药艾","盒>10根","艾条系列","","热卖","同仁堂","",""),("精油-薰衣草","瓶>100ml","精油系列","全身","热卖,畅销","三合堂","","是"),("精油-茶树","瓶>50ml","精油系列","局部","","三合堂","",""),("刮痧板-牛角","个>1个/包","器具","","推荐","三合堂","","是"),("拔罐套装-12罐","套>1套/盒","器具","","新品","云南白药","",""),("姜贴-驱寒","盒>20贴","贴敷系列","局部","热卖,新品","三合堂","","")]:c.execute("INSERT INTO products(name,spec,category,scope,tags,brand,position,gift)VALUES(?,?,?,?,?,?,?,?)",pdata)
        for i in range(1,11):c.execute("INSERT INTO hand_cards(code,store)VALUES(?,?)",(f"手牌{i:03d}","三合堂001店"))
        for mdata in[("张三","13800138001","黄金会员",1200,500,3500,"2024-01-15"),("李四","13800138002","普通会员",350,100,1200,"2024-03-20"),("王五","13800138003","钻石会员",5000,2000,15000,"2023-11-01"),("赵六","13800138004","黄金会员",800,300,2800,"2024-06-10"),("钱七","13800138005","普通会员",100,0,500,"2024-09-05")]:c.execute("INSERT INTO members(name,phone,level,points,balance,total_consumption,join_date)VALUES(?,?,?,?,?,?,?)",mdata)
        for x in["VIP1","VIP2","标准房1","标准房2","标准房3"]:c.execute("INSERT INTO rooms(name,beds)VALUES(?,?)",(x,1 if"VIP"in x else 2))
        c.connection.commit()
    c.connection.close()

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin","*")
        self.send_header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS")
        self.send_header("Access-Control-Allow-Headers","Content-Type")
    def _json(self,data,code=200):
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type","application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(json.dumps(data,ensure_ascii=False,default=str).encode())
    def _db(self):
        c=sqlite3.connect(DB);c.row_factory=sqlite3.Row;return c
    def _body(self):
        length = int(self.headers.get("Content-Length",0))
        return json.loads(self.rfile.read(length).decode()) if length else {}
    def _query(self):
        return dict(urllib.parse.parse_qsl(urllib.parse.urlparse(self.path).query))
    def do_GET(self):
        path = urllib.parse.urlparse(self.path).path
        qs = self._query()
        if path=="/api/brands":self._json(self._db().execute("SELECT*FROM brands ORDER BY sort").fetchall())
        elif path=="/api/types":self._json(self._db().execute("SELECT*FROM types ORDER BY sort").fetchall())
        elif path=="/api/spec-units":
            db=self._db();units=db.execute("SELECT*FROM spec_units ORDER BY sort_order").fetchall()
            for u in units:u["items"]=db.execute("SELECT*FROM spec_items WHERE unit_id=? ORDER BY sort_order",(u["id"],)).fetchall()
            self._json(units)
        elif path=="/api/tags":self._json(self._db().execute("SELECT*FROM tags ORDER BY sort").fetchall())
        elif path=="/api/scopes":self._json(self._db().execute("SELECT*FROM scopes").fetchall())
        elif path=="/api/hand-cards":self._json(self._db().execute("SELECT*FROM hand_cards").fetchall())
        elif path=="/api/project-categories":self._json(self._db().execute("SELECT*FROM project_categories ORDER BY sort").fetchall())
        elif path=="/api/rooms":self._json(self._db().execute("SELECT*FROM rooms").fetchall())
        elif path=="/api/products":
            rows=self._db().execute("SELECT*FROM products").fetchall()
            if"search"in qs:
                s=qs["search"]
                rows=[r for r in rows if s.lower()in r["name"].lower()or s.lower()in r["tags"].lower()]
            if"status"in qs:
                rows=[r for r in rows if r["status"]==qs["status"]]
            self._json(rows)
        elif path=="/api/projects":self._json(self._db().execute("SELECT p.*,pc.name as category_name FROM projects p LEFT JOIN project_categories pc ON p.category_id=pc.id").fetchall())
        elif path=="/api/packages":self._json(self._db().execute("SELECT*FROM packages").fetchall())
        elif path=="/api/gifts":self._json(self._db().execute("SELECT*FROM gifts").fetchall())
        elif path=="/api/stored-cards":self._json(self._db().execute("SELECT*FROM stored_cards").fetchall())
        elif path=="/api/members":self._json(self._db().execute("SELECT*FROM members ORDER BY id").fetchall())
        elif path=="/api/orders":self._json(self._db().execute("SELECT*FROM orders ORDER BY id DESC").fetchall())
        elif path=="/api/bookings":self._json(self._db().execute("SELECT*FROM bookings ORDER BY id DESC").fetchall())
        elif path=="/api/coupons":self._json(self._db().execute("SELECT*FROM coupons").fetchall())
        elif path=="/api/stats":
            db=self._db();t="date('now','localtime')"
            self._json({"products":db.execute("SELECT COUNT(*)FROM products").fetchone()[0],"projects":db.execute("SELECT COUNT(*)FROM projects").fetchone()[0],"packages":db.execute("SELECT COUNT(*)FROM packages").fetchone()[0],"stored_cards":db.execute("SELECT COUNT(*)FROM stored_cards").fetchone()[0],"members":db.execute("SELECT COUNT(*)FROM members").fetchone()[0],"orders_today":db.execute(f"SELECT COUNT(*)FROM orders WHERE date(created_at)={t}").fetchone()[0],"revenue_today":db.execute(f"SELECT COALESCE(SUM(total),0)FROM orders WHERE date(created_at)={t}").fetchone()[0],"bookings_today":db.execute(f"SELECT COUNT(*)FROM bookings WHERE date={t}").fetchone()[0],"active_members":db.execute("SELECT COUNT(*)FROM members WHERE status='正常'").fetchone()[0],"rooms":db.execute("SELECT COUNT(*)FROM rooms").fetchone()[0],"hand_cards":db.execute("SELECT COUNT(*)FROM hand_cards").fetchone()[0]})
        else:self._static(path)
    def do_POST(self):
        path=urllib.parse.urlparse(self.path).path;body=self._body();db=self._db()
        try:
            if path=="/api/products":
                db.execute("INSERT INTO products(name,spec,category,scope,tags,brand,position,gift,price,cost,stock)VALUES(?,?,?,?,?,?,?,?,?,?,?)",(body.get("name",""),body.get("spec",""),body.get("category",""),body.get("scope",""),body.get("tags",""),body.get("brand",""),body.get("position",""),body.get("gift",""),body.get("price",0),body.get("cost",0),body.get("stock",0)))
                db.commit();self._json({"ok":True,"id":db.execute("SELECT last_insert_rowid()").fetchone()[0]})
            elif path=="/api/orders":
                no="ORD"+datetime.datetime.now().strftime("%Y%m%d%H%M%S")+str(datetime.datetime.now().microsecond)[:3]
                db.execute("INSERT INTO orders(order_no,customer,phone,total,payment,items,remark)VALUES(?,?,?,?,?,?,?)",(no,body.get("customer",""),body.get("phone",""),body.get("total",0),body.get("payment","现金"),json.dumps(body.get("items",[]),ensure_ascii=False),body.get("remark","")))
                db.commit();self._json({"ok":True,"order_no":no})
            elif path=="/api/members":
                db.execute("INSERT INTO members(name,phone,level,points,balance)VALUES(?,?,?,?,?)",(body.get("name",""),body.get("phone",""),body.get("level","普通会员"),body.get("points",0),body.get("balance",0)))
                db.commit();self._json({"ok":True,"id":db.execute("SELECT last_insert_rowid()").fetchone()[0]})
            elif path=="/api/bookings":
                db.execute("INSERT INTO bookings(customer,phone,service,date,time,duration,staff,remark)VALUES(?,?,?,?,?,?,?,?)",(body.get("customer",""),body.get("phone",""),body.get("service",""),body.get("date",""),body.get("time",""),body.get("duration",60),body.get("staff",""),body.get("remark","")))
                db.commit();self._json({"ok":True,"id":db.execute("SELECT last_insert_rowid()").fetchone()[0]})
            elif path=="/api/coupons":
                db.execute("INSERT INTO coupons(name,type,value,min_amount,stock)VALUES(?,?,?,?,?)",(body.get("name",""),body.get("type","满减"),body.get("value",0),body.get("min_amount",0),body.get("stock",100)))
                db.commit();self._json({"ok":True,"id":db.execute("SELECT last_insert_rowid()").fetchone()[0]})
            else:self._json({"error":"not found"},404)
        except Exception as e:db.rollback();self._json({"error":str(e)},400)
        finally:db.close()
    def do_PUT(self):
        path=urllib.parse.urlparse(self.path).path;body=self._body();db=self._db()
        try:
            m=re.match(r"/api/(\w+)/(\d+)",path)
            if m:
                t,i=m.groups()
                if t in["products","members","bookings","orders","projects","packages","coupons"]:
                    sets=",".join(f"{k}=?"for k in body if k!="id")
                    db.execute(f"UPDATE {t} SET {sets} WHERE id=?",[body[k]for k in body if k!="id"]+[int(i)])
                    db.commit();self._json({"ok":True});return
            self._json({"error":"not found"},404)
        except Exception as e:db.rollback();self._json({"error":str(e)},400)
        finally:db.close()
    def do_DELETE(self):
        path=urllib.parse.urlparse(self.path).path;db=self._db()
        try:
            m=re.match(r"/api/(\w+)/(\d+)",path)
            if m:
                t,i=m.groups()
                if t in["products","members","bookings","orders","projects","packages","coupons"]:
                    db.execute(f"DELETE FROM {t} WHERE id=?",(int(i),));db.commit();self._json({"ok":True});return
            self._json({"error":"not found"},404)
        except Exception as e:self._json({"error":str(e)},400)
        finally:db.close()
    def _static(self,path):
        if path=="/":path="/index.html"
        fp=os.path.join(STATIC,path.lstrip("/"))
        if not os.path.isfile(fp):self.send_response(404);self._cors();self.end_headers();self.wfile.write(b"404");return
        mt,_=mimetypes.guess_type(fp)
        self.send_response(200);self._cors();self.send_header("Content-Type",mt or "application/octet-stream");self.send_header("Cache-Control","no-cache");self.end_headers()
        with open(fp,"rb")as f:self.wfile.write(f.read())
    def log_message(self,*a):print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] {a[1]} {a[2]} {a[3]}")

if __name__=="__main__":
    init_db()
    print(f"POS v3.0 on http://0.0.0.0:{PORT}")
    HTTPServer(("0.0.0.0",PORT),Handler).serve_forever()
