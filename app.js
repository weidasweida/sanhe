/* ========== i18n Dictionary ========== */
const i18n = {
  zh: {
    brand: "收银通",
    admin: "管理员",
    storeName: "旗舰店",
    "nav.overview": "总览",
    "nav.checkout": "快速开单",
    "nav.appointment": "预约管理",
    "nav.appt.records": "预约记录",
    "nav.appt.board": "预约看板",
    "nav.appt.data": "预约数据",
    "nav.appt.staff": "可约员工",
    "nav.appt.params": "预约参数",
    "nav.products": "商品管理",
    "nav.products.home": "商品主页",
    "nav.products.product": "产品管理",
    "nav.products.project": "项目管理",
    "nav.products.package": "套餐管理",
    "nav.products.card": "储值卡管理",
    "nav.products.gift": "积分礼品",
    "nav.products.params": "产品参数",
    "nav.products.tag": "自定义标签",
    "nav.products.category": "项目类别",
    "nav.products.unit": "销售单位",
    "nav.products.handCard": "手牌管理",
    "nav.inventory": "库存管理",
    "nav.orders": "订单管理",
    "nav.members": "会员管理",
    "nav.reports": "营业报表",
    "nav.promotion": "优惠营销",
    "nav.settings": "系统设置",
    // 预约记录
    "appt.filterDate": "筛选日期",
    "appt.filterStatus": "全部状态",
    "appt.filterStore": "选择门店",
    "appt.pending": "待确认",
    "appt.confirmed": "已确认",
    "appt.completed": "已完成",
    "appt.cancelled": "已取消",
    "appt.expired": "已过期",
    "appt.time": "预约时间",
    "appt.project": "预约项目",
    "appt.room": "房间",
    "appt.customer": "预约客户",
    "appt.method": "预约方式",
    "appt.online": "线上",
    "appt.offline": "线下",
    "appt.payStatus": "支付状态",
    "appt.paid": "已支付",
    "appt.unpaid": "未支付",
    "appt.createdAt": "创建日期",
    "appt.remark": "备注",
    "appt.consumeStatus": "消费状态",
    "appt.pendingConsume": "待消费",
    "appt.consumed": "已消费",
    "appt.actions": "操作",
    "appt.cancel": "取消",
    "appt.print": "打印",
    "appt.edit": "修改",
    "appt.service": "服务",
    "appt.sync": "同步",
    "appt.export": "导出",
    "appt.label": "标签",
    // 预约看板
    "board.date": "日期",
    "board.expandAll": "展开所有子项",
    "board.unassigned": "未分配",
    "board.message": "传达",
    "board.mainChef": "主餐师",
    "board.clerk": "店员",
    "board.reception": "前台",
    "board.specialList": "特推单",
    "board.pendingConfirm": "待确认",
    "board.rejected": "已拒绝",
    "board.cancelled": "已取消",
    "board.completed": "已完成",
    "board.closed": "已关闭",
    "board.newAppt": "新建预约",
    "board.schedule": "排班",
    "board.today": "今天",
    // 预约数据
    "data.title": "预约数据分析",
    "data.total": "预约总数",
    "data.completed": "预约完成数",
    "data.overdue": "超时预约数",
    "data.cancelled": "预约取消数",
    "data.conversion": "转化率",
    "data.byStaff": "按员工",
    "data.byProject": "按项目",
    "data.staff": "员工",
    "data.project": "项目",
    "data.store": "所属门店",
    "data.performance": "本月业绩",
    // 可约员工
    "staff.title": "可约员工设置",
    "staff.sort": "排序",
    "staff.name": "顾客",
    "staff.keyProject": "关键顾客项目",
    "staff.store": "所属门店",
    "staff.action": "操作",
    "staff.add": "添加员工",
    "staff.searchPlaceholder": "搜索姓名 / 手机号...",
    // 预约参数
    "param.global": "全局参数",
    "param.store": "门店参数",
    "param.interval": "预约时间间隔",
    "param.minute": "分钟",
    "param.hour": "小时",
    "param.reminder": "预约提醒",
    "param.hoursBefore": "小时前",
    "param.editContent": "编辑提醒内容",
    "param.limitPerDay": "每人每日预约上限",
    "param.times": "次",
    "param.allowOvertime": "允许预约超营业时间",
    "param.allowMultiItem": "允许选择多个项目",
    "param.onlineEnabled": "启用线上预约",
    "param.simpleMode": "简约模式",
    "param.durationRule": "约单时长规则",
    "param.serviceDuration": "服务时长计算",
    "param.byTotal": "按总服务时长",
    "param.byMax": "按最大选择时长",
    "param.arrivalAlloc": "到店分配人数",
    "param.staffLimit": "员工接单上限",
    "param.staffReminder": "员工提醒",
    "param.sendSms": "发送短信",
    "param.sendWechat": "发送微信",
    // 通用
    "search": "搜索",
    "noData": "暂无数据",
    "total": "共",
    "items": "条",
    "page": "页",
    "save": "保存",
    "cancel": "取消",
    "confirm": "确认",
    "edit": "编辑",
    "delete": "删除",
    "loading": "加载中...",
  },
  en: {
    brand: "CashierPay",
    admin: "Admin",
    storeName: "Flagship Store",
    "nav.overview": "Overview",
    "nav.checkout": "Quick Checkout",
    "nav.appointment": "Appointments",
    "nav.appt.records": "Appt. Records",
    "nav.appt.board": "Appt. Board",
    "nav.appt.data": "Appt. Data",
    "nav.appt.staff": "Available Staff",
    "nav.appt.params": "Appt. Settings",
    "nav.products": "Products",
    "nav.products.home": "Product Home",
    "nav.products.product": "Product Mgmt",
    "nav.products.project": "Project Mgmt",
    "nav.products.package": "Packages",
    "nav.products.card": "Prepaid Cards",
    "nav.products.gift": "Gift Points",
    "nav.products.params": "Product Params",
    "nav.products.tag": "Custom Tags",
    "nav.products.category": "Categories",
    "nav.products.unit": "Sale Units",
    "nav.products.handCard": "Hand Cards",
    "nav.inventory": "Inventory",
    "nav.orders": "Orders",
    "nav.members": "Members",
    "nav.reports": "Reports",
    "nav.promotion": "Promotion",
    "nav.settings": "Settings",
    // Appointment Records
    "appt.filterDate": "Filter Date",
    "appt.filterStatus": "All Status",
    "appt.filterStore": "Select Store",
    "appt.pending": "Pending",
    "appt.confirmed": "Confirmed",
    "appt.completed": "Completed",
    "appt.cancelled": "Cancelled",
    "appt.expired": "Expired",
    "appt.time": "Time",
    "appt.project": "Service",
    "appt.room": "Room",
    "appt.customer": "Customer",
    "appt.method": "Method",
    "appt.online": "Online",
    "appt.offline": "Offline",
    "appt.payStatus": "Payment",
    "appt.paid": "Paid",
    "appt.unpaid": "Unpaid",
    "appt.createdAt": "Created",
    "appt.remark": "Notes",
    "appt.consumeStatus": "Status",
    "appt.pendingConsume": "Pending",
    "appt.consumed": "Done",
    "appt.actions": "Actions",
    "appt.cancel": "Cancel",
    "appt.print": "Print",
    "appt.edit": "Edit",
    "appt.service": "Service",
    "appt.sync": "Sync",
    "appt.export": "Export",
    "appt.label": "Label",
    // Appointment Board
    "board.date": "Date",
    "board.expandAll": "Expand All",
    "board.unassigned": "Unassigned",
    "board.message": "Message",
    "board.mainChef": "Main Chef",
    "board.clerk": "Clerk",
    "board.reception": "Reception",
    "board.specialList": "Special",
    "board.pendingConfirm": "Pending",
    "board.rejected": "Rejected",
    "board.cancelled": "Cancelled",
    "board.completed": "Completed",
    "board.closed": "Closed",
    "board.newAppt": "New Appt.",
    "board.schedule": "Schedule",
    "board.today": "Today",
    // Appointment Data
    "data.title": "Appointment Analytics",
    "data.total": "Total",
    "data.completed": "Completed",
    "data.overdue": "Overdue",
    "data.cancelled": "Cancelled",
    "data.conversion": "Conversion Rate",
    "data.byStaff": "By Staff",
    "data.byProject": "By Service",
    "data.staff": "Staff",
    "data.project": "Service",
    "data.store": "Store",
    "data.performance": "Monthly Performance",
    // Available Staff
    "staff.title": "Available Staff Settings",
    "staff.sort": "Sort",
    "staff.name": "Name",
    "staff.keyProject": "Key Projects",
    "staff.store": "Store",
    "staff.action": "Actions",
    "staff.add": "Add Staff",
    "staff.searchPlaceholder": "Search name / phone...",
    // Appointment Parameters
    "param.global": "Global Settings",
    "param.store": "Store Settings",
    "param.interval": "Appt. Interval",
    "param.minute": "min",
    "param.hour": "hour(s)",
    "param.reminder": "Reminder",
    "param.hoursBefore": "hour(s) before",
    "param.editContent": "Edit Reminder Content",
    "param.limitPerDay": "Max Appts Per Day",
    "param.times": "times",
    "param.allowOvertime": "Allow overtime booking",
    "param.allowMultiItem": "Allow multiple services",
    "param.onlineEnabled": "Enable online booking",
    "param.simpleMode": "Simple Mode",
    "param.durationRule": "Duration Rules",
    "param.serviceDuration": "Duration Calculation",
    "param.byTotal": "By total duration",
    "param.byMax": "By max selected",
    "param.arrivalAlloc": "Arrival allocation",
    "param.staffLimit": "Staff booking limit",
    "param.staffReminder": "Staff Reminder",
    "param.sendSms": "Send SMS",
    "param.sendWechat": "Send WeChat",
    // Common
    "search": "Search",
    "noData": "No data",
    "total": "Total",
    "items": "items",
    "page": "Page",
    "save": "Save",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "edit": "Edit",
    "delete": "Delete",
    "loading": "Loading...",
  }
};

/* ========== State ========== */
let currentLang = 'zh';
let currentTheme = 'aurora-blue';

/* ========== i18n Render ========== */
function renderI18n(lang) {
  currentLang = lang;
  const dict = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) el.placeholder = dict[key];
  });
  // Update language switch button text
  const langBtn = document.querySelector('.lang-switch');
  if (langBtn) {
    langBtn.textContent = lang === 'zh' ? 'EN / 中文' : '中文 / EN';
  }
}

function toggleLang() {
  const next = currentLang === 'zh' ? 'en' : 'zh';
  renderI18n(next);
}

/* ========== Theme ========== */
function setTheme(theme) {
  currentTheme = theme;
  document.getElementById('app').dataset.theme = theme;
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.theme === theme);
  });
  // Re-render charts if on dashboard
  if (typeof drawCharts === 'function') drawCharts();
  closeThemePanel();
}

function toggleThemePanel() {
  document.getElementById('themePanel').classList.toggle('open');
  document.getElementById('themeOverlay').classList.toggle('open');
}

function closeThemePanel() {
  document.getElementById('themePanel').classList.remove('open');
  document.getElementById('themeOverlay').classList.remove('open');
}

/* ========== Navigation ========== */
function navigate(el, page) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.nav-group').forEach(g => {
    g.classList.remove('expanded');
  });
  el.classList.add('active');
}

/* ========== Mobile: Sidebar Drawer ========== */
function toggleMobileMenu() {
  document.getElementById('mobileDrawer').classList.toggle('open');
  document.getElementById('mobileOverlay').classList.toggle('open');
  // Close any expanded groups when opening drawer
  if (document.getElementById('mobileDrawer').classList.contains('open')) {
    document.querySelectorAll('.mobile-drawer-group').forEach(g => g.classList.remove('expanded'));
  }
}
function closeMobileMenu() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('open');
  document.querySelectorAll('.mobile-drawer-group').forEach(g => g.classList.remove('expanded'));
}

/* ========== Mobile: Toggle drawer group (e.g. 预约管理) ========== */
function toggleDrawerGroup(el) {
  const group = el.closest('.mobile-drawer-group');
  if (!group) return;
  // Close other groups
  document.querySelectorAll('.mobile-drawer-group').forEach(g => {
    if (g !== group) g.classList.remove('expanded');
  });
  group.classList.toggle('expanded');
}

/* ========== Mobile: Go Back ========== */
function goBack() {
  // 1) If on products page with a non-home tab, return to product home
  if (typeof switchProductTab === 'function') {
    const activeTab = document.querySelector('.p-tab-content.active');
    if (activeTab && activeTab.dataset.tab !== 'home') {
      switchProductTab('home');
      return;
    }
  }
  // 2) If on booking page with a non-home tab, return to booking home
  if (typeof switchBookingTab === 'function') {
    const activeTab = document.querySelector('.booking-tab-content.active');
    if (activeTab && activeTab.dataset.tab !== 'records') {
      switchBookingTab('records');
      return;
    }
  }
  // 3) Fallback: browser back
  window.history.back();
}

/* ========== Mobile: Bottom Nav Active State ========== */
function setMobileNavActive(page) {
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
}

/* ========== Mobile: Sub Nav Tab Switching ========== */
function switchMobileSubTab(el, page, tabId) {
  document.querySelectorAll('.mobile-subnav-item').forEach(item => {
    item.classList.remove('active');
  });
  el.classList.add('active');
  // If the page has a switch function, call it
  if (page === 'booking' && typeof switchBookingTab === 'function') {
    switchBookingTab(tabId);
  } else if (page === 'products' && typeof switchProductTab === 'function') {
    switchProductTab(tabId);
  } else if (page === 'inventory' && typeof switchInventoryTab === 'function') {
    switchInventoryTab(tabId);
  }
}

/* 底部导航通用跳转：已在该页面则回到主页，否则跳转 */
function navigateBottomNav(pageFile) {
  const cur = window.location.pathname.split('/').pop();
  if (cur === pageFile) {
    // 已在该页面，回到主页
    if (pageFile === 'products.html' && typeof switchProductTab === 'function') {
      switchProductTab('home');
    } else if (pageFile === 'booking.html' && typeof switchSubTab === 'function') {
      switchSubTab('records', '');
    } else if (pageFile === 'checkout.html' && typeof switchCheckoutTab === 'function') {
      switchCheckoutTab('home');
    } else if (pageFile === 'index.html') {
      // 总览已经在主页
    }
  } else {
    window.location.href = pageFile;
  }
}

function toggleNavGroup(el) {
  const group = el.closest('.nav-group');
  if (!group) return;
  const page = el.dataset.page;
  // If the menu group has a page target and we're not on that page, navigate there
  if (page && window.location.pathname.indexOf(page) === -1) {
    window.location.href = page;
    return;
  }
  // 已在该页面：回到该页面主页
  if (page === 'products.html' && typeof switchProductTab === 'function') {
    switchProductTab('home');
  } else if (page === 'booking.html' && typeof switchSubTab === 'function') {
    switchSubTab('records','');
  }
  group.classList.toggle('expanded');
}

/* ========== Page Routing ========== */
function goToPage(page) {
  const pageMap = {
    'overview': 'index.html',
    'checkout': 'checkout.html',
    'appt-records': 'appointment.html#records',
    'appt-board': 'appointment.html#board',
    'appt-data': 'appointment.html#data',
    'appt-staff': 'appointment.html#staff',
    'appt-params': 'appointment.html#params',
    'products': 'index.html',
    'orders': 'index.html',
    'members': 'index.html',
    'reports': 'index.html',
    'promotion': 'index.html',
    'settings': 'index.html',
  };
  const target = pageMap[page];
  if (target) {
    window.location.href = target;
  }
}

/* ========== Mobile Touch Ripple ========== */
function createRipple(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'touch-ripple';
  const size = Math.max(rect.width, rect.height) * 0.6;
  const x = (e.clientX || e.touches?.[0]?.clientX || rect.left + rect.width/2) - rect.left - size/2;
  const y = (e.clientY || e.touches?.[0]?.clientY || rect.top + rect.height/2) - rect.top - size/2;
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
}

/* 对有 onclick 的元素添加触控涟漪（手机端） */
if ('ontouchstart' in window) {
  document.addEventListener('touchstart', function(e) {
    let target = e.target.closest('[onclick], .clickable, button, .btn, .p-big-card, .p-sm-card, .nav-item, .mobile-nav-item, .mobile-drawer-item, .b-tab, .p-back-link');
    if (target) createRipple(e);
  }, { passive: true });
}

/* ========== Mobile Sidebar Swipe to Close ========== */
let sidebarTouchStartX = 0;
let sidebarTouchStartY = 0;
document.addEventListener('touchstart', function(e) {
  const drawer = document.querySelector('.mobile-sidebar-drawer.open');
  if (!drawer) {
    // 记录屏幕左侧边缘触摸，准备打开侧边栏
    if (e.touches[0].clientX < 30) {
      sidebarTouchStartX = e.touches[0].clientX;
      sidebarTouchStartY = e.touches[0].clientY;
    }
    return;
  }
  // 在打开的抽屉上触摸，准备关闭
  sidebarTouchStartX = e.touches[0].clientX;
  sidebarTouchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  const overlay = document.querySelector('.mobile-sidebar-overlay.open');
  if (!overlay) return;
  const dx = e.touches[0].clientX - sidebarTouchStartX;
  const dy = e.touches[0].clientY - sidebarTouchStartY;
  // 如果是横向滑动，阻止页面滚动
  if (Math.abs(dx) > Math.abs(dy) && dx < -20) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchend', function(e) {
  const overlay = document.querySelector('.mobile-sidebar-overlay.open');
  if (!overlay) return;
  const dx = e.changedTouches[0].clientX - sidebarTouchStartX;
  // 向右滑出 >50px 或 从左侧边缘向右滑 >40px 打开
  if (sidebarTouchStartX < 30 && dx > 40) {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) menuBtn.click();
  }
  // 向左滑入 < -50px 关闭
  if (dx < -50) {
    const closeBtn = document.querySelector('.mobile-drawer-close');
    if (closeBtn) closeBtn.click();
  }
}, { passive: true });

/* ========== Init ========== */
document.addEventListener('DOMContentLoaded', () => {
  renderI18n('zh');
  setTheme('aurora-blue');
});
