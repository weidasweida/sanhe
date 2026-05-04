/* ========== i18n Dictionary ========== */
const i18n = {
  zh: {
    brand: "收银通", admin: "管理员", storeName: "旗舰店",
    "nav.overview": "总览", "nav.checkout": "快速开单",
    "nav.products": "商品管理", "nav.inventory": "库存管理",
    "nav.orders": "订单管理", "nav.members": "会员管理",
    "nav.reports": "营业报表", "nav.promotion": "优惠营销",
    "nav.settings": "系统设置",
    scan: "扫码",
    walkIn: "散客",
    memberSelect: "选择会员",
    cartTitle: "购物车", items: "项", clearCart: "清空",
    cartEmpty: "点击左侧项目添加",
    subtotal: "小计", discount: "优惠", total: "合计",
    payWechat: "微信", payAlipay: "支付宝", payCash: "现金",
    payCard: "银行卡", payBalance: "储值卡支付",
    holdOrder: "挂单", holdPanel: "挂单列表",
    selectMember: "选择会员", memberSearchPlaceholder: "搜索姓名 / 手机号...",
    therapist: "技师", optional: "可自选",
    courseCard: "疗程卡", remaining: "剩余", times: "次",
    discountApplied: "已享折扣",
    noStock: "库存不足",
    paySuccess: "支付成功！",
    holdSuccess: "已挂单",
    "categories.all": "全部项目",
    "categories.acupuncture": "针灸",
    "categories.tuina": "推拿",
    "categories.osteopathy": "正骨",
    "categories.cupping": "拔罐",
    "categories.moxibustion": "艾灸",
    "categories.physio": "理疗",
    "categories.retail": "零售产品",
    "theme.title": "切换主题",
    "theme.auroraBlue": "极光蓝", "theme.twilightPurple": "暮光紫",
    "theme.tealGreen": "松石绿", "theme.lavaOrange": "熔岩橙",
    "theme.deepBlue": "深海蓝", "theme.royalPurple": "尊贵紫",
    "theme.forestGreen": "墨林绿", "theme.sunsetOrange": "落日橙",
    "theme.golden": "黄金满地", "theme.festiveRed": "恭贺欣喜",
    "theme.marble": "大理石", "theme.inkWash": "宣纸水墨",
    "cartItem.courseCardUsed": "划卡",
  },
  en: {
    brand: "CashierPay", admin: "Admin", storeName: "Flagship Store",
    "nav.overview": "Overview", "nav.checkout": "Quick Checkout",
    "nav.products": "Products", "nav.inventory": "Inventory",
    "nav.orders": "Orders", "nav.members": "Members",
    "nav.reports": "Reports", "nav.promotion": "Promotion",
    "nav.settings": "Settings",
    scan: "Scan",
    walkIn: "Walk-in",
    memberSelect: "Select Member",
    cartTitle: "Cart", items: "items", clearCart: "Clear",
    cartEmpty: "Click items to add",
    subtotal: "Subtotal", discount: "Discount", total: "Total",
    payWechat: "WeChat", payAlipay: "Alipay", payCash: "Cash",
    payCard: "Card", payBalance: "Balance Card",
    holdOrder: "Hold", holdPanel: "Hold Orders",
    selectMember: "Select Member", memberSearchPlaceholder: "Search name / phone...",
    therapist: "Therapist", optional: "Optional",
    courseCard: "Course Card", remaining: "Remaining", times: "sessions",
    discountApplied: "Discount Applied",
    noStock: "Out of Stock",
    paySuccess: "Payment Successful!",
    holdSuccess: "Order Held",
    "categories.all": "All Items",
    "categories.acupuncture": "Acupuncture",
    "categories.tuina": "Tuina",
    "categories.osteopathy": "Osteopathy",
    "categories.cupping": "Cupping",
    "categories.moxibustion": "Moxibustion",
    "categories.physio": "Physiotherapy",
    "categories.retail": "Retail",
    "theme.title": "Switch Theme",
    "theme.auroraBlue": "Aurora Blue", "theme.twilightPurple": "Twilight Purple",
    "theme.tealGreen": "Teal Green", "theme.lavaOrange": "Lava Orange",
    "theme.deepBlue": "Deep Blue", "theme.royalPurple": "Royal Purple",
    "theme.forestGreen": "Forest Green", "theme.sunsetOrange": "Sunset Orange",
    "theme.golden": "Golden", "theme.festiveRed": "Festive Red",
    "theme.marble": "Marble", "theme.inkWash": "Ink Wash",
    "cartItem.courseCardUsed": "Card Used",
  }
};

/* ========== State ========== */
let currentLang = 'zh';
let currentTheme = 'aurora-blue';
let cart = [];
let selectedMember = null;
let heldOrders = [];
let holdIdCounter = 1;

// ========== Product Data (from shared-data.js) ==========
// Categories and products are defined in shared-data.js as SHARED_categories and SHARED_products.
// Here we create local references for backward compatibility.
const categories = SHARED_categories
  .filter(c => c.visible)
  .sort((a, b) => a.sort - b.sort);

const products = SHARED_products.map(p => ({
  id: p.id,
  name: p.name.zh,
  price: p.price,
  category: p.category,
  type: p.type === 'service' ? 'treatment' : 'product',
  therapists: p.type === 'service' ? ['可选'] : [],
  image: p.icon,
  stock: p.stock
}));

// ========== Mock Members ==========

// ========== Mock Members ==========
const members = [
  { id: 'm1', name: '张三', phone: '91234567', level: '钻石会员', levelDiscount: 0.8, balance: 2580, courseCards: [{ name: '颈肩疗程卡', remaining: 4, total: 10, price: 980 }, { name: '全身调理卡', remaining: 2, total: 10, price: 1980 }] },
  { id: 'm2', name: '李四', phone: '98765432', level: '金卡', levelDiscount: 0.9, balance: 1200, courseCards: [{ name: '腰腿疗程卡', remaining: 6, total: 10, price: 980 }] },
  { id: 'm3', name: '王五', phone: '90001111', level: '银卡', levelDiscount: 1, balance: 500, courseCards: [] },
  { id: 'm4', name: '赵六', phone: '87654321', level: '钻石会员', levelDiscount: 0.8, balance: 5000, courseCards: [{ name: '季度畅享卡', remaining: 45, total: 90, price: 2980 }] },
  { id: 'm5', name: '陈七', phone: '85556666', level: '金卡', levelDiscount: 0.9, balance: 350, courseCards: [] },
];

// ========== Init ==========
let currentCategory = 'all';

function initCheckout() {
  renderTabs();
  renderProducts();
  renderI18n('zh');
  setTheme('aurora-blue');
  updateCart();
}

// ========== Category Tabs ==========
function renderTabs() {
  const container = document.getElementById('categoryTabs');
  container.innerHTML = categories.map(c => {
    const catName = getCategoryName(c.id, currentLang);
    return `<button class="checkout-tab ${c.id === currentCategory ? 'active' : ''}"
            onclick="switchCategory('${c.id}')">
      ${c.icon} ${catName}
    </button>`;
  }).join('');
  // Add settings button
  container.innerHTML += `<button class="checkout-tab checkout-tab-settings"
    onclick="openCategorySettings()" title="分类设置">⚙️</button>`;
}

function switchCategory(catId) {
  currentCategory = catId;
  renderTabs();
  renderProducts();
}

// ========== Product Grid ==========
function renderProducts(filter = '') {
  const grid = document.getElementById('productGrid');
  let filtered = currentCategory === 'all'
    ? products
    : products.filter(p => p.category === currentCategory);

  if (filter) {
    const q = filter.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="addToCart('${p.id}')">
      <div class="product-img">${p.image}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price"><span class="currency">¥</span>${p.price}</div>
      ${p.type === 'treatment' && p.therapists.length > 0
        ? `<div class="product-stock">${currentLang === 'zh' ? '技师' : 'Staff'}: ${p.therapists.slice(0,2).join('/')}${p.therapists.length > 2 ? '...' : ''}</div>`
        : p.type === 'product'
          ? `<div class="product-stock ${p.stock < 10 ? 'low' : ''}">${currentLang === 'zh' ? '库存' : 'Stock'}: ${p.stock}</div>`
          : `<div class="product-stock">${currentLang === 'zh' ? '自助' : 'Self'}</div>`
      }
    </div>
  `).join('');
}

function filterProducts() {
  const q = document.getElementById('searchInput').value;
  renderProducts(q);
}

// ========== Cart ==========
let cartItemId = 0;

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // 检查购物车是否已有
  const existing = cart.find(c => c.productId === productId && !c.therapist);
  if (existing && product.type === 'product') {
    existing.qty += 1;
    updateCart();
    return;
  }

  // 可选技师的项目，默认选第一个
  const therapist = product.therapists.length > 0 ? product.therapists[0] : null;

  cart.push({
    cartId: ++cartItemId,
    productId: product.id,
    name: product.name,
    price: product.price,
    qty: 1,
    type: product.type,
    therapist: therapist,
    therapists: product.therapists || [],
    image: product.image,
  });
  updateCart();
  // 滚动到购物车底部
  setTimeout(() => {
    const el = document.querySelector('.cart-items');
    if (el) el.scrollTop = el.scrollHeight;
  }, 50);
}

function removeFromCart(cartId) {
  cart = cart.filter(c => c.cartId !== cartId);
  updateCart();
}

function changeQty(cartId, delta) {
  const item = cart.find(c => c.cartId === cartId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  updateCart();
}

function clearCart() {
  cart = [];
  selectedMember = null;
  document.getElementById('memberName').textContent = currentLang === 'zh' ? '散客' : 'Walk-in';
  document.getElementById('memberDetail').textContent = '';
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartCount').textContent = `${count} ${currentLang === 'zh' ? '项' : 'items'}`;

  const itemsEl = document.getElementById('cartItems');
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><span>${currentLang === 'zh' ? '点击左侧项目添加' : 'Click items to add'}</span></div>`;
    document.getElementById('cartFooter').style.display = 'none';
    return;
  }

  document.getElementById('cartFooter').style.display = 'block';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">
          ¥${item.price}
          ${item.therapist ? ` · ${currentLang === 'zh' ? '技师' : 'Staff'}: ${item.therapist}` : ''}
        </div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn remove" onclick="changeQty(${item.cartId}, -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.cartId}, 1)">+</button>
      </div>
      <div class="cart-item-total">¥${(item.price * item.qty).toFixed(0)}</div>
    </div>
  `).join('');

  // 计算合计
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = selectedMember && selectedMember.levelDiscount < 1
    ? subtotal * (1 - selectedMember.levelDiscount)
    : 0;
  const total = subtotal - discount;

  document.getElementById('subtotalAmount').textContent = `¥${subtotal}`;

  if (discount > 0) {
    document.getElementById('discountLine').style.display = 'flex';
    document.getElementById('discountAmount').textContent = `-¥${discount.toFixed(0)}`;
  } else {
    document.getElementById('discountLine').style.display = 'none';
  }

  document.getElementById('totalAmount').innerHTML = `<span class="currency">¥</span>${total.toFixed(0)}`;
}

// ========== Therapist Selection ==========
// (Simple: click item to cycle therapist if available)
// This is handled inline in the cart display

// ========== Hold Order ==========
function holdOrder() {
  if (cart.length === 0) return;
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
  heldOrders.push({
    id: holdIdCounter++,
    time: timeStr,
    cart: JSON.parse(JSON.stringify(cart)),
    member: selectedMember,
    total: cart.reduce((s,c) => s + c.price * c.qty, 0),
  });
  clearCart();
  renderHoldList();
  // 提示
  const msg = currentLang === 'zh' ? '已挂单' : 'Order held';
  showToast(msg, 'success');
}

function renderHoldList() {
  const list = document.getElementById('holdList');
  if (heldOrders.length === 0) {
    list.innerHTML = `<div class="cart-empty"><span>${currentLang === 'zh' ? '暂无挂单' : 'No held orders'}</span></div>`;
    return;
  }
  list.innerHTML = heldOrders.map(h => `
    <div class="hold-item" onclick="resumeHold(${h.id})">
      <div class="hold-item-time">#${h.id} · ${h.time}</div>
      <div class="hold-item-info">${h.cart.map(c => c.name).join('、')}</div>
      <div class="hold-item-total">¥${h.total}</div>
    </div>
  `).join('');
}

function resumeHold(id) {
  const idx = heldOrders.findIndex(h => h.id === id);
  if (idx === -1) return;
  const h = heldOrders[idx];
  cart = JSON.parse(JSON.stringify(h.cart));
  selectedMember = h.member;
  if (selectedMember) {
    document.getElementById('memberName').textContent = selectedMember.name;
    document.getElementById('memberDetail').textContent = `${selectedMember.level} · 余额¥${selectedMember.balance}`;
  }
  updateCart();
  heldOrders.splice(idx, 1);
  renderHoldList();
  closeHoldPanel();
}

function openHoldPanel() {
  document.getElementById('holdPanel').classList.add('open');
  document.getElementById('holdOverlay').classList.add('open');
}

function closeHoldPanel() {
  document.getElementById('holdPanel').classList.remove('open');
  document.getElementById('holdOverlay').classList.remove('open');
}

// ========== Member Select ==========
function openMemberSelect() {
  document.getElementById('memberModal').classList.add('open');
  document.getElementById('memberOverlay').classList.add('open');
  renderMemberList();
}

function closeMemberSelect() {
  document.getElementById('memberModal').classList.remove('open');
  document.getElementById('memberOverlay').classList.remove('open');
}

function renderMemberList(filter = '') {
  const list = document.getElementById('memberList');
  const filtered = filter
    ? members.filter(m => m.name.includes(filter) || m.phone.includes(filter))
    : members;

  list.innerHTML = filtered.map(m => `
    <div class="member-select-item" onclick="selectMember('${m.id}')">
      <div class="m-avatar">👤</div>
      <div class="m-info">
        <div class="m-name">${m.name}</div>
        <div class="m-phone">${m.phone}</div>
      </div>
      <div class="m-points">${m.level}</div>
    </div>
  `).join('');

  if (filtered.length === 0) {
    list.innerHTML = `<div class="cart-empty"><span>${currentLang === 'zh' ? '未找到会员' : 'No members found'}</span></div>`;
  }
}

function filterMembers(val) {
  renderMemberList(val);
}

function selectMember(memberId) {
  const member = members.find(m => m.id === memberId);
  if (!member) return;
  selectedMember = member;
  document.getElementById('memberName').textContent = member.name;
  document.getElementById('memberDetail').textContent = `${member.level} · ${currentLang === 'zh' ? '余额' : 'Balance'}¥${member.balance}`;
  closeMemberSelect();
  updateCart();
}

// ========== Payment (真接口)==========
const ORDER_API = 'http://47.236.39.12:8999/api/orders';

function getPaymentName(method) {
  const names = {
    wechat: '微信', alipay: '支付宝', cash: '现金',
    card: '银行卡', balance: '储值卡',
  };
  return names[method] || method;
}

function getCustomerInfo() {
  if (selectedMember) {
    return { customer: selectedMember.name, phone: selectedMember.phone };
  }
  return { customer: '散客', phone: '' };
}

async function quickPay(amount) {
  if (cart.length === 0) return;
  // quickPay is just a shortcut — we still submit real items
  await submitOrder('cash');
}

async function pay(method) {
  if (cart.length === 0) return;
  await submitOrder(method);
}

async function submitOrder(method) {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = selectedMember && selectedMember.levelDiscount < 1
    ? subtotal * (1 - selectedMember.levelDiscount)
    : 0;
  const finalTotal = subtotal - discount;
  const { customer, phone } = getCustomerInfo();

  const items = cart.map(c => ({
    name: c.name,
    qty: c.qty,
    price: c.price,
  }));

  const body = {
    customer,
    phone,
    total: Math.round(finalTotal),
    payment: getPaymentName(method),
    items,
  };

  try {
    const r = await fetch(ORDER_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    if (data.code === 0) {
      showToast(`${currentLang === 'zh' ? '🎉 下单成功' : '🎉 Order Success'}!\n${getPaymentName(method)} ¥${finalTotal.toFixed(0)}\n单号: ${data.data.order_no}`, 'success');
      clearCart();
    } else {
      showToast(`${currentLang === 'zh' ? '下单失败' : 'Order Failed'}: ${data.msg}`, 'error');
    }
  } catch (e) {
    showToast(`${currentLang === 'zh' ? '网络错误，请重试' : 'Network error, please retry'}`, 'error');
  }
}

// ========== Scan Simulation ==========
function simulateScan() {
  // Randomly add an item when scan button clicked
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  addToCart(randomProduct.id);
}

// ========== Toast ==========
function showToast(msg, type = 'info') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
    background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-danger)' : 'var(--color-primary)'};
    color: #fff; padding: 12px 24px; border-radius: 8px;
    font-size: 14px; font-weight: 500; z-index: 9999;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    animation: fadeInDown 0.3s ease; white-space: pre-line;
    text-align: center;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ========== i18n ==========
function renderI18n(lang) {
  currentLang = lang;
  const dict = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) el.placeholder = dict[key];
  });
  const langBtn = document.querySelector('.lang-switch');
  if (langBtn) langBtn.textContent = lang === 'zh' ? 'EN / 中文' : '中文 / EN';
  // Re-render dynamic content
  renderTabs();
  renderProducts();
  updateCart();
  renderHoldList();
  renderMemberList();
}

function toggleLang() {
  renderI18n(currentLang === 'zh' ? 'en' : 'zh');
}

// ========== Theme ==========
function setTheme(theme) {
  currentTheme = theme;
  document.getElementById('app').dataset.theme = theme;
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.theme === theme);
  });
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

// ========== Navigation ==========
function navigate(el) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
}

// ========== Init on load ==========
document.addEventListener('DOMContentLoaded', initCheckout);
