/* ========== i18n ========== */
const i18n = {
  zh: {
    brand: "收银通", admin: "管理员", storeName: "旗舰店",
    "nav.overview": "总览", "nav.checkout": "快速开单",
    "nav.booking": "预约管理", "nav.products": "商品管理",
    "nav.orders": "订单管理", "nav.members": "会员管理",
    "nav.reports": "营业报表", "nav.promotion": "优惠营销",
    "nav.settings": "系统设置",
    "products.home": "商品主页",
    "products.product": "产品",
    "products.project": "项目",
    "products.package": "套餐",
    "products.gift": "积分礼品",
    "products.card": "储值卡",
    "products.infoSection": "商品信息",
    "products.configSection": "基础配置",
    "products.type": "产品类型",
    "products.brand": "产品品牌",
    "products.scope": "适用范围",
    "products.spec": "产品规格",
    "products.tag": "产品/项目标签",
    "products.projectCategory": "项目类别",
    "products.salesUnit": "销售单位",
    "products.roomBed": "房间床位",
    "products.handCard": "手牌管理",
    "products.productName": "产品名称",
    "products.category": "所属类别",
    "products.status": "状态",
    "products.benchmark": "是否标杆",
    "products.position": "适用职位",
    "products.addProduct": "新增产品",
    "products.projectName": "项目名称",
    "products.availableTimes": "可用次数",
    "products.salesPrice": "销售价",
    "products.costPrice": "成本价",
    "products.salesCount": "销量",
    "products.addProject": "新增项目",
    "products.packageName": "套餐名称",
    "products.packageDesc": "套餐说明",
    "products.packageStatus": "套餐状态",
    "products.packageType": "套餐类型",
    "products.validity": "有效期",
    "products.shelfStatus": "上下架",
    "products.addPackage": "新增套餐",
    "products.goodsName": "商品名称",
    "products.cardStatus": "兑换卡状态",
    "products.addCard": "新增兑换卡",
    "products.giftName": "礼品名称",
    "products.requiredPoints": "所需积分",
    "products.giftStock": "库存",
    "products.addGift": "新增礼品",
    "products.allCategories": "全部分类",
    "products.allStatus": "全部状态",
    "products.allScope": "全部适用范围",
    "products.allType": "全部类型",
    "products.allShelf": "全部上下架",
    "common.reset": "重置",
  },
  en: {
    brand: "CashierPay", admin: "Admin", storeName: "Flagship Store",
    "nav.overview": "Overview", "nav.checkout": "Checkout",
    "nav.booking": "Booking", "nav.products": "Products",
    "nav.orders": "Orders", "nav.members": "Members",
    "nav.reports": "Reports", "nav.promotion": "Promotion",
    "nav.settings": "Settings",
    "products.home": "Home",
    "products.product": "Product",
    "products.project": "Project",
    "products.package": "Package",
    "products.gift": "Gift",
    "products.card": "Card",
    "products.infoSection": "Product Info",
    "products.configSection": "Basic Config",
    "products.type": "Product Type",
    "products.brand": "Brand",
    "products.scope": "Scope",
    "products.spec": "Spec",
    "products.tag": "Tags",
    "products.projectCategory": "Project Category",
    "products.salesUnit": "Sales Unit",
    "products.roomBed": "Room & Bed",
    "products.handCard": "Hand Card",
    "products.productName": "Product Name",
    "products.category": "Category",
    "products.status": "Status",
    "products.benchmark": "Benchmark",
    "products.position": "Position",
    "products.addProduct": "Add Product",
    "products.projectName": "Project Name",
    "products.availableTimes": "Times",
    "products.salesPrice": "Price",
    "products.costPrice": "Cost",
    "products.salesCount": "Sales",
    "products.addProject": "Add Project",
    "products.packageName": "Package Name",
    "products.packageDesc": "Description",
    "products.packageStatus": "Status",
    "products.packageType": "Type",
    "products.validity": "Validity",
    "products.shelfStatus": "Shelf",
    "products.addPackage": "Add Package",
    "products.goodsName": "Goods Name",
    "products.cardStatus": "Card Status",
    "products.addCard": "Add Card",
    "products.giftName": "Gift Name",
    "products.requiredPoints": "Points",
    "products.giftStock": "Stock",
    "products.addGift": "Add Gift",
    "products.allCategories": "All Categories",
    "products.allStatus": "All Status",
    "products.allScope": "All Scope",
    "products.allType": "All Types",
    "products.allShelf": "All Shelf",
    "common.reset": "Reset",
  }
};

/* ========== State ========== */
let currentLang = 'zh';
let currentTheme = 'aurora-blue';
const API_BASE = '/api';

/* ========== API 工具 ========== */
async function apiGet(path) {
  const res = await fetch(API_BASE + path);
  return res.json();
}
async function apiPost(path, body) {
  const res = await fetch(API_BASE + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return res.json();
}
async function apiPut(path, body) {
  const res = await fetch(API_BASE + path, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return res.json();
}
async function apiDelete(path) {
  const res = await fetch(API_BASE + path, { method: 'DELETE' });
  return res.json();
}

/* ========== Mock Data ========== */
let productList = [];
let productEditId = -1;

const projectList = [
  { name: '大三通', category: '经典项目', times: '不限次', status: '启用', price: '398', cost: '50', sales: '1280' },
  { name: '宫廷理筋', category: '经典项目', times: '1次', status: '启用', price: '298', cost: '30', sales: '856' },
  { name: '脊柱正骨', category: '特色项目', times: '1次', status: '启用', price: '498', cost: '60', sales: '623' },
  { name: '经络推拿', category: '经典项目', times: '1次', status: '启用', price: '268', cost: '25', sales: '432' },
  { name: '火龙罐', category: '特色项目', times: '1次', status: '启用', price: '398', cost: '40', sales: '389' },
  { name: '艾条悬灸', category: '艾灸系列', times: '1次', status: '启用', price: '128', cost: '15', sales: '756' },
  { name: '电针治疗', category: '理疗项目', times: '1次', status: '启用', price: '198', cost: '20', sales: '234' },
  { name: '拔罐', category: '经典项目', times: '1次', status: '启用', price: '68', cost: '8', sales: '1567' },
  { name: '走罐', category: '经典项目', times: '1次', status: '启用', price: '88', cost: '10', sales: '432' },
  { name: '隔姜灸', category: '艾灸系列', times: '1次', status: '停用', price: '168', cost: '25', sales: '198' },
];

const packageList = [
  { name: '经典养生套餐A', desc: '大三通+宫廷理筋+艾灸', price: '698', cost: '200', status: '启用', validity: '6个月', type: '限次套餐' },
  { name: '全身放松套餐B', desc: '经络推拿+拔罐+刮痧', price: '398', cost: '120', status: '启用', validity: '3个月', type: '限次套餐' },
  { name: 'VIP至尊年卡', desc: '全年不限次经典项目', price: '8888', cost: '2000', status: '启用', validity: '12个月', type: '不限次套餐' },
  { name: '季度养生卡', desc: '季度内所有项目8折', price: '2680', cost: '800', status: '启用', validity: '3个月', type: '储值套餐' },
  { name: '肩颈舒缓包', desc: '颈部推拿5次+肩部艾灸3次', price: '598', cost: '180', status: '停用', validity: '6个月', type: '限次套餐' },
  { name: '新客体验套餐', desc: '首次到店体验3项', price: '198', cost: '80', status: '启用', validity: '1个月', type: '限次套餐' },
];

const cardList = [
  { name: '万元兑换卡', validity: '1年', category: '不限制', status: '启用', shelf: '已上架' },
  { name: '5000兑换卡', validity: '1年', category: '不限制', status: '启用', shelf: '已上架' },
  { name: '51000兑换卡', validity: '1年', category: '不限制', status: '启用', shelf: '已上架' },
  { name: '体验卡', validity: '3个月', category: '限制', status: '启用', shelf: '已上架' },
  { name: 'VIP黑金卡', validity: '2年', category: '不限制', status: '停用', shelf: '未上架' },
];

const giftList = [
  { name: '迷你艾灸罐', points: '500', stock: '50', status: '启用' },
  { name: '中药香囊', points: '200', stock: '100', status: '启用' },
  { name: '养生茶包', points: '100', stock: '200', status: '启用' },
  { name: '沐浴球套装', points: '800', stock: '30', status: '启用' },
  { name: '穴位按摩笔', points: '300', stock: '80', status: '停用' },
  { name: '测试商品', points: '1960', stock: '10', status: '启用' },
];

/* ========== Product Type CRUD (SQLite via API) ========== */
let typeList = [];
let typeEditIndex = -1;
let typeFilterText = '';

async function loadTypeList() {
  try {
    const json = await apiGet('/types');
    if (json.code === 0 && json.data) {
      typeList = json.data;
      renderTypeTable();
    }
  } catch(e) {
    console.error('类型加载失败:', e);
    showToast('类型加载失败，请确认后端服务已启动', 'error');
  }
}

function renderTypeTable() {
  const filtered = typeFilterText
    ? typeList.filter(t => t.name.includes(typeFilterText))
    : typeList;
  document.getElementById('typeTableBody').innerHTML = filtered.map(t => `
    <tr>
      <td><input type="checkbox" data-id="${t.id}" onchange="updateTypeSelectAll()" /></td>
      <td>${t.name}</td>
      <td>${t.sort}</td>
      <td>
        <span class="p-action-link" onclick="openTypeModal(${t.id})">修改</span>
        <span class="p-action-link danger" onclick="deleteType(${t.id})">删除</span>
      </td>
    </tr>
  `).join('');
  document.getElementById('typeTotalInfo').textContent = `共 ${filtered.length} 条数据`;
}

function filterTypeTable() {
  typeFilterText = document.getElementById('typeSearchInput').value.trim();
  renderTypeTable();
}

function resetTypeFilter() {
  typeFilterText = '';
  document.getElementById('typeSearchInput').value = '';
  renderTypeTable();
}

function openTypeModal(id) {
  typeEditIndex = typeof id === 'number' ? id : -1;
  const overlay = document.getElementById('typeModalOverlay');
  document.getElementById('typeModalTitle').textContent = typeEditIndex > 0 ? '修改分类' : '新增分类';
  document.getElementById('typeModalSaveBtn').textContent = '确认';
  if (typeEditIndex > 0) {
    const item = typeList.find(t => t.id === typeEditIndex);
    if (item) {
      document.getElementById('typeInputName').value = item.name;
      document.getElementById('typeInputSort').value = item.sort;
    }
  } else {
    document.getElementById('typeInputName').value = '';
    document.getElementById('typeInputSort').value = typeList.length > 0 ? Math.max(...typeList.map(t => t.sort)) + 1 : 1;
  }
  overlay.classList.add('open');
  document.getElementById('typeInputName').focus();
}

function closeTypeModal() {
  document.getElementById('typeModalOverlay').classList.remove('open');
}

async function saveType() {
  const name = document.getElementById('typeInputName').value.trim();
  const sort = parseInt(document.getElementById('typeInputSort').value) || 1;
  if (!name) {
    showToast('请输入系列名称', 'error');
    document.getElementById('typeInputName').focus();
    return;
  }
  try {
    if (typeEditIndex > 0) {
      const json = await apiPut(`/types/${typeEditIndex}`, { name, sort });
      if (json.code === 0) {
        showToast('修改成功');
      } else {
        showToast(json.msg || '修改失败', 'error');
        return;
      }
    } else {
      const json = await apiPost('/types', { name, sort });
      if (json.code === 0) {
        showToast('新增成功');
      } else {
        showToast(json.msg || '新增失败', 'error');
        return;
      }
    }
    closeTypeModal();
    await loadTypeList();
  } catch(e) {
    console.error('类型保存失败:', e);
    showToast('保存失败，请确认后端服务已启动', 'error');
  }
}

async function deleteType(id) {
  const item = typeList.find(t => t.id === id);
  if (!item) return;
  if (!confirm(`确定要删除系列「${item.name}」吗？`)) return;
  try {
    const json = await apiDelete(`/types/${id}`);
    if (json.code === 0) {
      showToast('删除成功');
      await loadTypeList();
    } else {
      showToast(json.msg || '删除失败', 'error');
    }
  } catch(e) {
    console.error('类型删除失败:', e);
    showToast('删除失败，请确认后端服务已启动', 'error');
  }
}

function toggleTypeAll(el) {
  document.querySelectorAll('#typeTableBody input[type="checkbox"]').forEach(cb => cb.checked = el.checked);
}

function updateTypeSelectAll() {
  const all = document.querySelectorAll('#typeTableBody input[type="checkbox"]');
  const checked = document.querySelectorAll('#typeTableBody input[type="checkbox"]:checked');
  const headerCb = document.querySelector('#typeTableBody').closest('table').querySelector('thead input[type="checkbox"]');
  if (headerCb) headerCb.checked = all.length > 0 && all.length === checked.length;
}

/* ========== Product Brand CRUD (SQLite via API) ========== */
let brandList = [];
let brandEditIndex = -1;
let brandLoaded = false;

async function loadBrandList() {
  try {
    const json = await apiGet('/brands');
    if (json.code === 0 && json.data) {
      brandList = json.data;
      brandLoaded = true;
      renderBrandTable();
    }
  } catch(e) {
    console.error('品牌加载失败:', e);
    showToast('品牌加载失败，请确认后端服务已启动', 'error');
  }
}

function renderBrandTable() {
  if (!brandLoaded) return;
  const searchText = (document.getElementById('brandSearchInput')?.value || '').trim().toLowerCase();
  const filterStatus = document.getElementById('brandStatusFilter')?.value || '';
  let filtered = brandList;
  if (filterStatus) filtered = filtered.filter(b => b.status === filterStatus);
  if (searchText) filtered = filtered.filter(b => b.name.toLowerCase().includes(searchText));
  document.getElementById('brandTableBody').innerHTML = filtered.map(b => `
    <tr>
      <td>${b.name}</td>
      <td><span class="p-tag ${b.status === '启用' ? 'enabled' : 'disabled'}">${b.status}</span></td>
      <td>
        <span class="p-action-link" onclick="openBrandModal(${b.id})">修改</span>
        <span class="p-action-link danger" onclick="deleteBrand(${b.id})">删除</span>
      </td>
    </tr>
  `).join('');
  document.getElementById('brandTotalInfo').textContent = `共 ${filtered.length} 条数据`;
}

function filterBrandTable() { renderBrandTable(); }

function resetBrandFilter() {
  document.getElementById('brandStatusFilter').value = '';
  document.getElementById('brandSearchInput').value = '';
  renderBrandTable();
}

function openBrandModal(id) {
  brandEditIndex = typeof id === 'number' ? id : -1;
  const overlay = document.getElementById('brandModalOverlay');
  document.getElementById('brandModalTitle').textContent = brandEditIndex > 0 ? '修改品牌' : '新增品牌';
  if (brandEditIndex > 0) {
    const item = brandList.find(b => b.id === brandEditIndex);
    if (item) {
      document.getElementById('brandInputName').value = item.name;
      document.getElementById('brandInputStatus').value = item.status;
    }
  } else {
    document.getElementById('brandInputName').value = '';
    document.getElementById('brandInputStatus').value = '启用';
  }
  overlay.classList.add('open');
  document.getElementById('brandInputName').focus();
}

function closeBrandModal() {
  document.getElementById('brandModalOverlay').classList.remove('open');
}

async function saveBrand() {
  const name = document.getElementById('brandInputName').value.trim();
  const status = document.getElementById('brandInputStatus').value;
  if (!name) {
    showToast('请输入品牌名称', 'error');
    document.getElementById('brandInputName').focus();
    return;
  }
  try {
    if (brandEditIndex > 0) {
      const json = await apiPut(`/brands/${brandEditIndex}`, { name, status });
      if (json.code === 0) {
        showToast('修改成功');
      } else {
        showToast(json.msg || '修改失败', 'error');
        return;
      }
    } else {
      const json = await apiPost('/brands', { name });
      if (json.code === 0) {
        showToast('新增成功');
      } else {
        showToast(json.msg || '新增失败', 'error');
        return;
      }
    }
    closeBrandModal();
    await loadBrandList();
  } catch(e) {
    console.error('品牌保存失败:', e);
    showToast('保存失败，请确认后端服务已启动', 'error');
  }
}

async function deleteBrand(id) {
  const item = brandList.find(b => b.id === id);
  if (!item) return;
  if (!confirm(`确定要删除品牌「${item.name}」吗？`)) return;
  try {
    const json = await apiDelete(`/brands/${id}`);
    if (json.code === 0) {
      showToast('删除成功');
      await loadBrandList();
    } else {
      showToast(json.msg || '删除失败', 'error');
    }
  } catch(e) {
    console.error('品牌删除失败:', e);
    showToast('删除失败，请确认后端服务已启动', 'error');
  }
}

const scopeList = [
  { name: '头部', status: '启用' },
  { name: '颈部', status: '启用' },
  { name: '肩部', status: '启用' },
  { name: '背部', status: '启用' },
  { name: '腰部', status: '启用' },
  { name: '腹部', status: '启用' },
  { name: '上肢', status: '启用' },
  { name: '下肢', status: '启用' },
  { name: '全身', status: '启用' },
  { name: '足部', status: '启用' },
  { name: '面部', status: '启用' },
  { name: '眼部', status: '启用' },
  { name: '耳部', status: '启用' },
];

/* ========== 单位 & 规格 (SQLite via API) ========== */
let specUnits = [];
let selectedSpecUnitId = '瓶';

async function loadSpecUnits() {
  try {
    const json = await apiGet('/spec-units');
    if (json.code === 0 && json.data) {
      specUnits = json.data;
      if (specUnits.length > 0 && !specUnits.some(u => u.id === selectedSpecUnitId)) {
        selectedSpecUnitId = specUnits[0].id;
      }
      renderSpecUnits();
    }
  } catch(e) {
    console.error('规格加载失败:', e);
    showToast('规格加载失败，请确认后端服务已启动', 'error');
  }
}

function getUnit(specUnits, id) {
  return specUnits.find(u => u.id === id);
}

let tagList = [];
let tagEditIndex = -1;

let projectCategoryList = [];
let categoryEditIndex = -1;

const roomBedList = [
  { room: '101房', old: '否', group: 'A组', store: '三合堂001店' },
  { room: '102房', old: '是', group: 'A组', store: '三合堂001店' },
  { room: '103房', old: '否', group: 'B组', store: '三合堂001店' },
];

let handCardList = [];
let handCardEditIndex = -1;

/* ========== Init ========== */
function initProducts() {
  renderI18n('zh');
  setTheme('aurora-blue');
  const savedTab = localStorage.getItem('productsActiveTab') || 'home';
  switchProductTab(savedTab);
  // 从 SQLite 异步加载所有数据
  loadBrandList();
  loadTypeList();
  loadSpecUnits();
  loadProjectCategoryList();
  loadTagList();
  loadHandCardList();
}

/* ========== Tab Switching ========== */
function switchProductTab(tabName) {
  // 保存当前 Tab 到 localStorage，刷新后恢复
  localStorage.setItem('productsActiveTab', tabName);
  // Update sidebar sub-nav-item highlight
  document.querySelectorAll('.sidebar .sub-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabName);
  });
  document.querySelectorAll('.p-tab-content').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabName);
  });

  // 移除之前添加的 tab 返回栏（如果存在）
  document.querySelectorAll('.p-tab-back-bar').forEach(el => el.remove());
  // 在非 home tab 顶部添加"← 返回商品主页"
  if (tabName !== 'home') {
    const tabContent = document.querySelector(`.p-tab-content[data-tab="${tabName}"]`);
    if (tabContent) {
      const backBar = document.createElement('div');
      backBar.className = 'p-tab-back-bar';
      backBar.innerHTML = '<span class="p-back-link" onclick="switchProductTab(\'home\')">← 返回商品主页</span>';
      backBar.style.cssText = 'padding:10px 0 0 16px;font-size:13px;';
      tabContent.insertBefore(backBar, tabContent.firstChild);
    }
  }

  switch(tabName) {
    case 'home': break;
    case 'product': if (productList.length === 0) loadProductList(); else renderProductTable(); break;
    case 'project': renderProjectTable(); break;
    case 'package': renderPackageTable(); break;
    case 'card': renderCardTable(); break;
    case 'gift': renderGiftTable(); break;
    case 'type': if (typeList.length > 0) renderTypeTable(); break;
    case 'brand': if (brandLoaded) renderBrandTable(); break;
    case 'scope': renderScopeTable(); break;
    case 'spec': if (specUnits.length > 0) renderSpecUnits(); break;
    case 'tag': if (tagList.length > 0) renderTagTable(); break;
    case 'project-category': if (projectCategoryList.length > 0) renderProjectCategoryTable(); break;
    case 'room-bed': renderRoomBedTable(); break;
    case 'hand-card': if (handCardList.length > 0) renderHandCardTable(); break;
  }
}

/* ========== Product CRUD (SQLite via API) ========== */

async function loadProductList() {
  try {
    // 同时加载依赖的配置数据
    const [prodRes, typeRes, brandRes, specRes, tagRes] = await Promise.all([
      apiGet('/products'),
      apiGet('/types'),
      apiGet('/brands'),
      apiGet('/spec-units'),
      apiGet('/tags')
    ]);
    if (prodRes.code === 0 && prodRes.data) {
      productList = prodRes.data;
      renderProductTable();
    }
    // 更新配置下拉
    if (typeRes.code === 0 && typeRes.data) {
      typeList = typeRes.data;
      updateProductTypeOptions();
    }
    if (brandRes.code === 0 && brandRes.data) {
      brandList = brandRes.data;
      updateProductBrandOptions();
    }
    if (specRes.code === 0 && specRes.data) {
      specUnits = specRes.data;
      updateProductSpecUnitOptions();
    }
    if (tagRes.code === 0 && tagRes.data) {
      tagList = tagRes.data;
      updateProductTagCheckboxes();
    }
  } catch(e) {
    console.error('产品加载失败:', e);
    showToast('产品加载失败，请确认后端服务已启动', 'error');
  }
}

function updateProductSpecUnitOptions() {
  const sel = document.getElementById('productSelectSpecUnit');
  if (!sel) return;
  sel.innerHTML = '<option value="">选择单位</option>' +
    specUnits.map(u => `<option value="${u.id}">${u.id}</option>`).join('');
}

function updateProductSpecItems() {
  const unitId = document.getElementById('productSelectSpecUnit').value;
  const itemSel = document.getElementById('productSelectSpecItem');
  if (!itemSel) return;
  if (!unitId) {
    itemSel.innerHTML = '<option value="">选择细项</option>';
    return;
  }
  const unit = specUnits.find(u => u.id === unitId);
  itemSel.innerHTML = '<option value="">选择细项</option>' +
    (unit ? unit.specs.map(s => `<option value="${s.name}">${s.name}</option>`).join('') : '');
}

function updateProductTypeOptions() {
  const sel = document.getElementById('productSelectType');
  if (!sel) return;
  sel.innerHTML = '<option value="">选择类型</option>' +
    typeList.map(t => `<option value="${t.name}">${t.name}</option>`).join('');
  // 更新分类筛选下拉
  const filterSel = document.getElementById('productFilterCategory');
  if (filterSel) {
    filterSel.innerHTML = '<option value="">全部分类</option>' +
      typeList.map(t => `<option value="${t.name}">${t.name}</option>`).join('');
  }
}

function updateProductBrandOptions() {
  const sel = document.getElementById('productSelectBrand');
  if (!sel) return;
  sel.innerHTML = '<option value="">选择品牌</option>' +
    brandList.map(b => `<option value="${b.name}">${b.name}</option>`).join('');
}

/* ========== 产品标签 ========== */

function updateProductTagCheckboxes(selectedTags) {
  const group = document.getElementById('productTagCheckboxGroup');
  if (!group) return;
  if (!selectedTags) selectedTags = [];
  if (typeof selectedTags === 'string') selectedTags = selectedTags ? selectedTags.split(',') : [];
  group.innerHTML = tagList.map(t => {
    const checked = selectedTags.includes(t.name) ? 'checked' : '';
    return `<label style="display:inline-flex;align-items:center;gap:4px;font-size:13px;cursor:pointer;padding:3px 10px;border:1px solid var(--color-border,#ddd);border-radius:6px;background:var(--color-bg-tertiary,#f5f5f5);${checked ? 'border-color:var(--color-primary,#1677FF);background:var(--color-primary-light,rgba(22,119,255,0.06))' : ''}">
      <input type="checkbox" class="product-tag-cb" value="${t.name}" ${checked} style="accent-color:var(--color-primary,#1677FF)" />
      <span>${t.name}</span>
    </label>`;
  }).join('');
}

function getSelectedProductTags() {
  const cbs = document.querySelectorAll('#productTagCheckboxGroup input[type="checkbox"]:checked');
  return Array.from(cbs).map(cb => cb.value).join(',');
}

function renderProductTags(tagStr) {
  if (!tagStr) return '—';
  return tagStr.split(',').filter(t => t.trim()).map(t =>
    `<span style="background:var(--color-tag-bg,var(--color-bg-tertiary,#e8e8e8));padding:1px 6px;border-radius:4px;font-size:11px;margin:0 2px;white-space:nowrap">${t.trim()}</span>`
  ).join('') || '—';
}

function renderProductTable() {
  const tbody = document.getElementById('productTableBody');
  if (!tbody) return;
  tbody.innerHTML = productList.map(p => `
    <tr>
      <td><input type="checkbox" data-id="${p.id}" onchange="updateProductSelectAll()" /></td>
      <td>${p.name}</td>
      <td>${p.spec ? p.spec.replace('>', ' > ') : '—'}</td>
      <td>${p.category || '—'}</td>
      <td><span class="p-tag ${p.status === '启用' ? 'enabled' : 'disabled'}">${p.status || '—'}</span></td>
      <td>${p.scope || '—'}</td>
      <td>${renderProductTags(p.benchmark)}</td>
      <td>${p.brand || '—'}</td>
      <td>${p.position || '—'}</td>
      <td>${p.gift === '是' ? '<span class="p-tag enabled">是</span>' : '—'}</td>
      <td>
        <span class="p-action-link" onclick="openProductModal(${p.id})">修改</span>
        <span class="p-action-link danger" onclick="deleteProduct(${p.id})">删除</span>
      </td>
    </tr>
  `).join('');
  document.getElementById('productTotalInfo').textContent = `共 ${productList.length} 条数据`;
}

function toggleProductAll(el) {
  document.querySelectorAll('#productTableBody input[type="checkbox"]').forEach(cb => cb.checked = el.checked);
}

function updateProductSelectAll() {
  const all = document.querySelectorAll('#productTableBody input[type="checkbox"]');
  const checked = document.querySelectorAll('#productTableBody input[type="checkbox"]:checked');
  const headerCb = document.querySelector('#productTableBody').closest('table').querySelector('thead input[type="checkbox"]');
  if (headerCb) headerCb.checked = all.length > 0 && all.length === checked.length;
}

function openProductModal(id) {
  productEditId = typeof id === 'number' ? id : -1;
  const overlay = document.getElementById('productModalOverlay');
  document.getElementById('productModalTitle').textContent = productEditId > 0 ? '修改产品' : '新增产品';
  // 重置表单
  document.getElementById('productInputName').value = '';
  document.getElementById('productSelectStatus').value = '启用';
  // 填充适用范围下拉
  updateProductScopeSelect();
  document.getElementById('productSelectScope').value = '';
  document.getElementById('productInputPosition').value = '';
  document.getElementById('productSelectGift').value = '否';
  document.getElementById('productSelectSpecUnit').value = '';
  document.getElementById('productSelectSpecItem').innerHTML = '<option value="">选择细项</option>';
  document.getElementById('productSelectType').value = '';
  document.getElementById('productSelectBrand').value = '';
  updateProductTagCheckboxes([]);
  if (productEditId > 0) {
    const item = productList.find(p => p.id === productEditId);
    if (item) {
      document.getElementById('productInputName').value = item.name;
      document.getElementById('productSelectStatus').value = item.status || '启用';
      updateProductScopeSelect();
      document.getElementById('productSelectScope').value = item.scope || '';
      document.getElementById('productInputPosition').value = item.position || '';
      document.getElementById('productSelectGift').value = item.gift === '是' ? '是' : '否';
      // 回填标签（benchmark 字段被复用作标签）
      updateProductTagCheckboxes(item.benchmark || '');
      // 回填 spec 级联
      if (item.spec && item.spec.includes('>')) {
        const [unitId, specName] = item.spec.split('>').map(s => s.trim());
        const unit = specUnits.find(u => u.id === unitId);
        if (unit) {
          document.getElementById('productSelectSpecUnit').value = unitId;
          updateProductSpecItems();
          document.getElementById('productSelectSpecItem').value = specName;
        }
      }
      // 回填 type
      document.getElementById('productSelectType').value = item.category || '';
      // 回填 brand
      document.getElementById('productSelectBrand').value = item.brand || '';
    }
  }
  overlay.classList.add('open');
  document.getElementById('productInputName').focus();
}

function closeProductModal() {
  document.getElementById('productModalOverlay').classList.remove('open');
}

async function saveProduct() {
  const name = document.getElementById('productInputName').value.trim();
  if (!name) {
    showToast('请输入产品名称', 'error');
    document.getElementById('productInputName').focus();
    return;
  }
  // 组装规格：单位>细项
  const specUnit = document.getElementById('productSelectSpecUnit').value;
  const specItem = document.getElementById('productSelectSpecItem').value;
  const spec = specUnit && specItem ? `${specUnit}>${specItem}` : '';
  const category = document.getElementById('productSelectType').value;
  const status = document.getElementById('productSelectStatus').value;
  const scope = document.getElementById('productSelectScope').value;
  const benchmark = getSelectedProductTags(); // 复用作标签
  const brand = document.getElementById('productSelectBrand').value;
  const position = document.getElementById('productInputPosition').value.trim();
  const gift = document.getElementById('productSelectGift').value;

  try {
    let json;
    if (productEditId > 0) {
      json = await apiPut(`/products/${productEditId}`, { name, spec, category, status, scope, benchmark, brand, position, gift });
    } else {
      json = await apiPost('/products', { name, spec, category, status, scope, benchmark, brand, position, gift });
    }
    if (json.code === 0) {
      showToast(json.msg || '保存成功');
      closeProductModal();
      await loadProductList();
    } else {
      showToast(json.msg || '保存失败', 'error');
    }
  } catch(e) {
    console.error('产品保存失败:', e);
    showToast('保存失败，请确认后端服务已启动', 'error');
  }
}

async function deleteProduct(id) {
  if (!confirm('确定要删除该产品吗？')) return;
  try {
    const json = await apiDelete(`/products/${id}`);
    if (json.code === 0) {
      showToast('删除成功');
      await loadProductList();
    } else {
      showToast(json.msg || '删除失败', 'error');
    }
  } catch(e) {
    console.error('产品删除失败:', e);
    showToast('删除失败，请确认后端服务已启动', 'error');
  }
}

async function batchDeleteProducts() {
  const checked = document.querySelectorAll('#productTableBody input[type="checkbox"]:checked');
  if (checked.length === 0) {
    showToast('请先勾选要删除的产品', 'error');
    return;
  }
  if (!confirm(`确定要删除选中的 ${checked.length} 个产品吗？`)) return;
  const ids = Array.from(checked).map(cb => cb.dataset.id).join(',');
  try {
    const json = await apiDelete(`/products/batch?ids=${ids}`);
    if (json.code === 0) {
      showToast(json.msg || '批量删除成功');
      await loadProductList();
    } else {
      showToast(json.msg || '批量删除失败', 'error');
    }
  } catch(e) {
    console.error('批量删除失败:', e);
    showToast('批量删除失败，请确认后端服务已启动', 'error');
  }
}

function filterProductTable() {
  const nameFilter = document.getElementById('productFilterName').value.trim().toLowerCase();
  const categoryFilter = document.getElementById('productFilterCategory').value;
  const statusFilter = document.getElementById('productFilterStatus').value;
  const scopeFilter = document.getElementById('productFilterScope').value;

  const filtered = productList.filter(p => {
    if (nameFilter && !p.name.toLowerCase().includes(nameFilter)) return false;
    if (categoryFilter && p.category !== categoryFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    if (scopeFilter && p.scope !== scopeFilter) return false;
    return true;
  });

  const tbody = document.getElementById('productTableBody');
  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td><input type="checkbox" data-id="${p.id}" onchange="updateProductSelectAll()" /></td>
      <td>${p.name}</td>
      <td>${p.spec ? p.spec.replace('>', ' > ') : '—'}</td>
      <td>${p.category || '—'}</td>
      <td><span class="p-tag ${p.status === '启用' ? 'enabled' : 'disabled'}">${p.status || '—'}</span></td>
      <td>${p.scope || '—'}</td>
      <td>${renderProductTags(p.benchmark)}</td>
      <td>${p.brand || '—'}</td>
      <td>${p.position || '—'}</td>
      <td>${p.gift === '是' ? '<span class="p-tag enabled">是</span>' : '—'}</td>
      <td>
        <span class="p-action-link" onclick="openProductModal(${p.id})">修改</span>
        <span class="p-action-link danger" onclick="deleteProduct(${p.id})">删除</span>
      </td>
    </tr>
  `).join('');
  document.getElementById('productTotalInfo').textContent = `共 ${filtered.length} 条数据`;
}

function resetProductFilter() {
  document.getElementById('productFilterName').value = '';
  document.getElementById('productFilterCategory').value = '';
  document.getElementById('productFilterStatus').value = '';
  document.getElementById('productFilterScope').value = '';
  renderProductTable();
}

/* ========== Render Project Table ========== */
function renderProjectTable() {
  const tbody = document.getElementById('projectTableBody');
  tbody.innerHTML = projectList.map(p => `
    <tr>
      <td><input type="checkbox" /></td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${p.times}</td>
      <td><span class="p-tag ${p.status === '启用' ? 'enabled' : 'disabled'}">${p.status}</span></td>
      <td>¥${p.price}</td>
      <td>¥${p.cost}</td>
      <td>${p.sales}</td>
      <td>
        <span class="p-action-link" onclick="showToast('修改项目')">修改</span>
        <span class="p-action-link danger" onclick="showToast('删除项目')">删除</span>
      </td>
    </tr>
  `).join('');
}

/* ========== Render Package Table ========== */
function renderPackageTable() {
  const tbody = document.getElementById('packageTableBody');
  tbody.innerHTML = packageList.map(p => `
    <tr>
      <td><input type="checkbox" /></td>
      <td>${p.name}</td>
      <td>${p.desc}</td>
      <td>¥${p.price}</td>
      <td>¥${p.cost}</td>
      <td><span class="p-tag ${p.status === '启用' ? 'enabled' : 'disabled'}">${p.status}</span></td>
      <td>${p.validity}</td>
      <td>${p.type}</td>
      <td><span class="p-tag ${p.status === '启用' ? 'sold' : 'unsold'}">${p.status === '启用' ? '已上架' : '未上架'}</span></td>
      <td>
        <span class="p-action-link" onclick="showToast('修改套餐')">修改</span>
        <span class="p-action-link danger" onclick="showToast('删除套餐')">删除</span>
      </td>
    </tr>
  `).join('');
}

/* ========== Render Card Table ========== */
function renderCardTable() {
  const tbody = document.getElementById('cardTableBody');
  tbody.innerHTML = cardList.map(c => `
    <tr>
      <td><input type="checkbox" /></td>
      <td>${c.name}</td>
      <td>${c.validity}</td>
      <td>${c.category}</td>
      <td><span class="p-tag ${c.status === '启用' ? 'enabled' : 'disabled'}">${c.status}</span></td>
      <td><span class="p-tag ${c.shelf === '已上架' ? 'sold' : 'unsold'}">${c.shelf}</span></td>
      <td>
        <span class="p-action-link" onclick="showToast('修改兑换卡')">修改</span>
        <span class="p-action-link danger" onclick="showToast('删除兑换卡')">删除</span>
      </td>
    </tr>
  `).join('');
}

/* ========== Render Gift Table ========== */
function renderGiftTable() {
  const tbody = document.getElementById('giftTableBody');
  tbody.innerHTML = giftList.map(g => `
    <tr>
      <td><input type="checkbox" /></td>
      <td>${g.name}</td>
      <td>${g.points}</td>
      <td>${g.stock}</td>
      <td><span class="p-tag ${g.status === '启用' ? 'enabled' : 'disabled'}">${g.status}</span></td>
      <td>
        <span class="p-action-link" onclick="showToast('修改礼品')">修改</span>
        <span class="p-action-link danger" onclick="showToast('删除礼品')">删除</span>
      </td>
    </tr>
  `).join('');
}

function updateTypeSelectAll() {
  const all = document.querySelectorAll('#typeTableBody input[type="checkbox"]');
  const checked = document.querySelectorAll('#typeTableBody input[type="checkbox"]:checked');
  const headerCb = document.querySelector('#typeTableBody').closest('table').querySelector('thead input[type="checkbox"]');
  if (headerCb) headerCb.checked = all.length > 0 && all.length === checked.length;
}

/* 更新产品弹窗中的适用范围下拉选项 */
function updateProductScopeSelect() {
  const sel = document.getElementById('productSelectScope');
  if (!sel) return;
  sel.innerHTML = '<option value="">选择适用范围</option>' +
    scopeList.filter(s => s.status === '启用').map(s => `<option value="${s.name}">${s.name}</option>`).join('');
}

function renderScopeTable() {
  document.getElementById('scopeTableBody').innerHTML = scopeList.map(s =>
    `<tr><td><input type="checkbox" /></td><td>${s.name}</td><td><span class="p-tag ${s.status === '启用' ? 'enabled' : 'disabled'}">${s.status}</span></td><td><span class="p-action-link" onclick="showToast('修改部位')">修改</span><span class="p-action-link danger" onclick="showToast('删除部位')">删除</span></td></tr>`
  ).join('');
}

/* ========== 单位 & 规格 ========== */
function getUnit(specUnits, id) {
  return specUnits.find(u => u.id === id);
}

/* ========== 单位列表渲染 ========== */
function renderSpecUnits() {
  const searchText = (document.getElementById('specUnitSearchInput')?.value || '').trim().toLowerCase();
  const filtered = searchText ? specUnits.filter(u => u.id.toLowerCase().includes(searchText)) : specUnits;
  const container = document.getElementById('specUnitList');
  container.innerHTML = filtered.map(u => {
    const specCount = u.specs.length;
    const activeClass = u.id === selectedSpecUnitId ? 'active' : '';
    return `<div class="spec-unit-item ${activeClass}" onclick="selectSpecUnit('${u.id}')" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--border-color);transition:background 0.15s;" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background=''">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-weight:500;color:var(--text-primary);font-size:14px;">${u.id}</span>
        <span style="font-size:11px;color:var(--text-secondary);background:var(--bg-muted);padding:1px 6px;border-radius:8px;">${specCount}个规格</span>
      </div>
      <div style="display:flex;gap:4px;">
        <span class="p-action-link" style="font-size:12px;" onclick="event.stopPropagation();openSpecUnitEditModal('${u.id}')">✎</span>
        <span class="p-action-link danger" style="font-size:12px;" onclick="event.stopPropagation();deleteSpecUnit('${u.id}')">✕</span>
      </div>
    </div>`;
  }).join('');
  if (filtered.length === 0) {
    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-secondary);font-size:13px;">暂无单位</div>';
  }
  // 如果当前选中的单位不在筛选结果中，自动选中第一个
  if (!filtered.some(u => u.id === selectedSpecUnitId) && filtered.length > 0) {
    selectedSpecUnitId = filtered[0].id;
  }
  // 高亮当前选中的单位
  document.querySelectorAll('.spec-unit-item').forEach(el => {
    const id = el.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    if (id && id === selectedSpecUnitId) {
      el.style.background = 'var(--color-primary-light, rgba(64,128,255,0.1))';
      el.style.borderLeft = '3px solid var(--color-primary)';
    }
  });
  renderSpecs();
}

function selectSpecUnit(id) {
  selectedSpecUnitId = id;
  renderSpecUnits();
}

function filterSpecUnits() {
  renderSpecUnits();
}

/* ========== 单位 CRUD ========== */
let specUnitEditOldName = '';

function openSpecUnitModal() {
  specUnitEditOldName = '';
  document.getElementById('specUnitModalTitle').textContent = '新增单位';
  document.getElementById('specUnitInputName').value = '';
  document.getElementById('specUnitModalOverlay').classList.add('open');
  document.getElementById('specUnitInputName').focus();
}

function openSpecUnitEditModal(id) {
  specUnitEditOldName = id;
  document.getElementById('specUnitModalTitle').textContent = '修改单位';
  document.getElementById('specUnitInputName').value = id;
  document.getElementById('specUnitModalOverlay').classList.add('open');
  document.getElementById('specUnitInputName').focus();
}

function closeSpecUnitModal() {
  document.getElementById('specUnitModalOverlay').classList.remove('open');
}

async function saveSpecUnit() {
  const name = document.getElementById('specUnitInputName').value.trim();
  if (!name) {
    showToast('请输入单位名称', 'error');
    document.getElementById('specUnitInputName').focus();
    return;
  }
  try {
    if (specUnitEditOldName) {
      // 修改单位名称
      const json = await apiPut(`/spec-units/${encodeURIComponent(specUnitEditOldName)}`, { id: name });
      if (json.code === 0) {
        if (selectedSpecUnitId === specUnitEditOldName) selectedSpecUnitId = name;
        showToast('修改成功');
      } else {
        showToast(json.msg || '修改失败', 'error');
        return;
      }
    } else {
      // 新增单位
      const json = await apiPost('/spec-units', { id: name });
      if (json.code === 0) {
        selectedSpecUnitId = name;
        showToast('新增成功');
      } else {
        showToast(json.msg || '新增失败', 'error');
        return;
      }
    }
    closeSpecUnitModal();
    await loadSpecUnits();
  } catch(e) {
    console.error('单位保存失败:', e);
    showToast('保存失败，请确认后端服务已启动', 'error');
  }
}

async function deleteSpecUnit(id) {
  if (!confirm(`确定要删除单位「${id}」及其所有规格吗？`)) return;
  try {
    const json = await apiDelete(`/spec-units?id=${encodeURIComponent(id)}`);
    if (json.code === 0) {
      if (selectedSpecUnitId === id) {
        selectedSpecUnitId = specUnits.length > 0 ? specUnits[0].id : '';
      }
      showToast('删除成功');
      await loadSpecUnits();
    } else {
      showToast(json.msg || '删除失败', 'error');
    }
  } catch(e) {
    console.error('单位删除失败:', e);
    showToast('删除失败，请确认后端服务已启动', 'error');
  }
}

/* ========== 规格 CRUD ========== */
function renderSpecs() {
  const unit = getUnit(specUnits, selectedSpecUnitId);
  const titleEl = document.getElementById('specUnitTitle');
  if (!unit) {
    titleEl.textContent = '请先选择单位';
    document.getElementById('specTableBody').innerHTML = '';
    document.getElementById('specTotalInfo').textContent = '共 0 条数据';
    return;
  }
  titleEl.textContent = `📦 ${unit.id} 的规格`;
  const specs = unit.specs;
  const searchText = (document.getElementById('specSearchInput')?.value || '').trim().toLowerCase();
  const filtered = searchText ? specs.filter(s => s.name.toLowerCase().includes(searchText)) : specs;
  document.getElementById('specTableBody').innerHTML = filtered.map((s, i) => {
    const realIndex = specs.indexOf(s);
    return `<tr>
      <td>${s.name}</td>
      <td>${s.sort}</td>
      <td>
        <span class="p-action-link" onclick="editSpec(${realIndex})">修改</span>
        <span class="p-action-link danger" onclick="deleteSpec(${realIndex})">删除</span>
      </td>
    </tr>`;
  }).join('');
  document.getElementById('specTotalInfo').textContent = `共 ${filtered.length} 条数据`;
}

function filterSpecs() {
  renderSpecs();
}

let specEditIndex = -1;

function openSpecModal() {
  const unit = getUnit(specUnits, selectedSpecUnitId);
  if (!unit) {
    showToast('请先选择一个单位', 'error');
    return;
  }
  specEditIndex = -1;
  document.getElementById('specModalTitle').textContent = '新增规格';
  document.getElementById('specInputName').value = '';
  const maxSort = unit.specs.length > 0 ? Math.max(...unit.specs.map(s => s.sort)) : 0;
  document.getElementById('specInputSort').value = maxSort + 1;
  document.getElementById('specModalOverlay').classList.add('open');
  document.getElementById('specInputName').focus();
}

function editSpec(index) {
  const unit = getUnit(specUnits, selectedSpecUnitId);
  if (!unit) return;
  specEditIndex = index;
  const item = unit.specs[index];
  document.getElementById('specModalTitle').textContent = '修改规格';
  document.getElementById('specInputName').value = item.name;
  document.getElementById('specInputSort').value = item.sort_order || item.sort;
  document.getElementById('specModalOverlay').classList.add('open');
  document.getElementById('specInputName').focus();
}

function closeSpecModal() {
  document.getElementById('specModalOverlay').classList.remove('open');
}

async function saveSpec() {
  const unit = getUnit(specUnits, selectedSpecUnitId);
  if (!unit) return;
  const name = document.getElementById('specInputName').value.trim();
  const sort = parseInt(document.getElementById('specInputSort').value) || 1;
  if (!name) {
    showToast('请输入规格名称', 'error');
    document.getElementById('specInputName').focus();
    return;
  }
  try {
    if (specEditIndex >= 0) {
      const item = unit.specs[specEditIndex];
      const json = await apiPut(`/spec-items/${item.id}`, { name, sort });
      if (json.code === 0) {
        showToast('修改成功');
      } else {
        showToast(json.msg || '修改失败', 'error');
        return;
      }
    } else {
      const json = await apiPost('/spec-items', { unit_id: selectedSpecUnitId, name, sort });
      if (json.code === 0) {
        showToast('新增成功');
      } else {
        showToast(json.msg || '新增失败', 'error');
        return;
      }
    }
    closeSpecModal();
    await loadSpecUnits();
  } catch(e) {
    console.error('规格保存失败:', e);
    showToast('保存失败，请确认后端服务已启动', 'error');
  }
}

async function deleteSpec(index) {
  const unit = getUnit(specUnits, selectedSpecUnitId);
  if (!unit) return;
  const item = unit.specs[index];
  if (!item) return;
  if (!confirm(`确定要删除规格「${item.name}」吗？`)) return;
  try {
    const json = await apiDelete(`/spec-items/${item.id}`);
    if (json.code === 0) {
      showToast('删除成功');
      await loadSpecUnits();
    } else {
      showToast(json.msg || '删除失败', 'error');
    }
  } catch(e) {
    console.error('规格删除失败:', e);
    showToast('删除失败，请确认后端服务已启动', 'error');
  }
}

function renderTagTable() {
  document.getElementById('tagTableBody').innerHTML = tagList.map(t =>
    `<tr><td><input type="checkbox" data-id="${t.id}" onchange="updateTagSelectAll()" /></td><td>${t.name}</td><td>${t.sort}</td><td>
      <span class="p-action-link" onclick="openTagModal(${t.id})">修改</span>
      <span class="p-action-link danger" onclick="deleteTag(${t.id})">删除</span>
    </td></tr>`
  ).join('');
  document.getElementById('tagTotalInfo').textContent = `共 ${tagList.length} 条数据`;
}

async function loadTagList() {
  try {
    const json = await apiGet('/tags');
    if (json.code === 0 && json.data) {
      tagList = json.data;
      renderTagTable();
    }
  } catch(e) {
    console.error('标签加载失败:', e);
    showToast('标签加载失败，请确认后端服务已启动', 'error');
  }
}

function openTagModal(id) {
  tagEditIndex = typeof id === 'number' ? id : -1;
  const overlay = document.getElementById('tagModalOverlay');
  document.getElementById('tagModalTitle').textContent = tagEditIndex > 0 ? '修改标签' : '创建标签';
  if (tagEditIndex > 0) {
    const item = tagList.find(t => t.id === tagEditIndex);
    if (item) {
      document.getElementById('tagInputName').value = item.name;
      document.getElementById('tagInputSort').value = item.sort;
    }
  } else {
    document.getElementById('tagInputName').value = '';
    document.getElementById('tagInputSort').value = tagList.length > 0 ? Math.max(...tagList.map(t => t.sort)) + 1 : 1;
  }
  overlay.classList.add('open');
  document.getElementById('tagInputName').focus();
}

function closeTagModal() {
  document.getElementById('tagModalOverlay').classList.remove('open');
}

async function saveTag() {
  const name = document.getElementById('tagInputName').value.trim();
  const sort = parseInt(document.getElementById('tagInputSort').value) || 1;
  if (!name) {
    showToast('请输入标签名称', 'error');
    document.getElementById('tagInputName').focus();
    return;
  }
  try {
    if (tagEditIndex > 0) {
      const json = await apiPut(`/tags/${tagEditIndex}`, { name, sort });
      if (json.code === 0) {
        showToast('修改成功');
      } else {
        showToast(json.msg || '修改失败', 'error');
        return;
      }
    } else {
      const json = await apiPost('/tags', { name, sort });
      if (json.code === 0) {
        showToast('新增成功');
      } else {
        showToast(json.msg || '新增失败', 'error');
        return;
      }
    }
    closeTagModal();
    await loadTagList();
  } catch(e) {
    console.error('标签保存失败:', e);
    showToast('保存失败，请确认后端服务已启动', 'error');
  }
}

async function deleteTag(id) {
  const item = tagList.find(t => t.id === id);
  if (!item) return;
  if (!confirm(`确定要删除标签「${item.name}」吗？`)) return;
  try {
    const json = await apiDelete(`/tags/${id}`);
    if (json.code === 0) {
      showToast('删除成功');
      await loadTagList();
    } else {
      showToast(json.msg || '删除失败', 'error');
    }
  } catch(e) {
    console.error('标签删除失败:', e);
    showToast('删除失败，请确认后端服务已启动', 'error');
  }
}

function toggleTagAll(el) {
  document.querySelectorAll('#tagTableBody input[type="checkbox"]').forEach(cb => cb.checked = el.checked);
}

function updateTagSelectAll() {
  const all = document.querySelectorAll('#tagTableBody input[type="checkbox"]');
  const checked = document.querySelectorAll('#tagTableBody input[type="checkbox"]:checked');
  const headerCb = document.querySelector('#tagTableBody').closest('table').querySelector('thead input[type="checkbox"]');
  if (headerCb) headerCb.checked = all.length > 0 && all.length === checked.length;
}

function renderProjectCategoryTable() {
  document.getElementById('projectCategoryTableBody').innerHTML = projectCategoryList.map(c =>
    `<tr><td><input type="checkbox" data-id="${c.id}" onchange="updateCategorySelectAll()" /></td><td>${c.name}</td><td>${c.sort}</td><td>
      <span class="p-action-link" onclick="openCategoryModal(${c.id})">修改</span>
      <span class="p-action-link danger" onclick="deleteCategory(${c.id})">删除</span>
    </td></tr>`
  ).join('');
  document.getElementById('projectCategoryTotalInfo').textContent = `共 ${projectCategoryList.length} 条数据`;
}

async function loadProjectCategoryList() {
  try {
    const json = await apiGet('/project-categories');
    if (json.code === 0 && json.data) {
      projectCategoryList = json.data;
      renderProjectCategoryTable();
    }
  } catch(e) {
    console.error('项目分类加载失败:', e);
    showToast('项目分类加载失败，请确认后端服务已启动', 'error');
  }
}

function openCategoryModal(id) {
  categoryEditIndex = typeof id === 'number' ? id : -1;
  const overlay = document.getElementById('categoryModalOverlay');
  document.getElementById('categoryModalTitle').textContent = categoryEditIndex > 0 ? '修改分类' : '新增分类';
  if (categoryEditIndex > 0) {
    const item = projectCategoryList.find(c => c.id === categoryEditIndex);
    if (item) {
      document.getElementById('categoryInputName').value = item.name;
      document.getElementById('categoryInputSort').value = item.sort;
    }
  } else {
    document.getElementById('categoryInputName').value = '';
    document.getElementById('categoryInputSort').value = projectCategoryList.length > 0 ? Math.max(...projectCategoryList.map(c => c.sort)) + 1 : 1;
  }
  overlay.classList.add('open');
  document.getElementById('categoryInputName').focus();
}

function closeCategoryModal() {
  document.getElementById('categoryModalOverlay').classList.remove('open');
}

async function saveCategory() {
  const name = document.getElementById('categoryInputName').value.trim();
  const sort = parseInt(document.getElementById('categoryInputSort').value) || 1;
  if (!name) {
    showToast('请输入分类名称', 'error');
    document.getElementById('categoryInputName').focus();
    return;
  }
  try {
    if (categoryEditIndex > 0) {
      const json = await apiPut(`/project-categories/${categoryEditIndex}`, { name, sort });
      if (json.code === 0) {
        showToast('修改成功');
      } else {
        showToast(json.msg || '修改失败', 'error');
        return;
      }
    } else {
      const json = await apiPost('/project-categories', { name, sort });
      if (json.code === 0) {
        showToast('新增成功');
      } else {
        showToast(json.msg || '新增失败', 'error');
        return;
      }
    }
    closeCategoryModal();
    await loadProjectCategoryList();
  } catch(e) {
    console.error('分类保存失败:', e);
    showToast('保存失败，请确认后端服务已启动', 'error');
  }
}

async function deleteCategory(id) {
  const item = projectCategoryList.find(c => c.id === id);
  if (!item) return;
  if (!confirm(`确定要删除分类「${item.name}」吗？`)) return;
  try {
    const json = await apiDelete(`/project-categories/${id}`);
    if (json.code === 0) {
      showToast('删除成功');
      await loadProjectCategoryList();
    } else {
      showToast(json.msg || '删除失败', 'error');
    }
  } catch(e) {
    console.error('分类删除失败:', e);
    showToast('删除失败，请确认后端服务已启动', 'error');
  }
}

function toggleCategoryAll(el) {
  document.querySelectorAll('#projectCategoryTableBody input[type="checkbox"]').forEach(cb => cb.checked = el.checked);
}

function updateCategorySelectAll() {
  const all = document.querySelectorAll('#projectCategoryTableBody input[type="checkbox"]');
  const checked = document.querySelectorAll('#projectCategoryTableBody input[type="checkbox"]:checked');
  const headerCb = document.querySelector('#projectCategoryTableBody').closest('table').querySelector('thead input[type="checkbox"]');
  if (headerCb) headerCb.checked = all.length > 0 && all.length === checked.length;
}

function renderRoomBedTable() {
  document.getElementById('roomBedTableBody').innerHTML = roomBedList.map(r =>
    `<tr><td><input type="checkbox" /></td><td>${r.room}</td><td>${r.old}</td><td>${r.group}</td><td>${r.store}</td><td><span class="p-action-link" onclick="showToast('修改房间')">修改</span><span class="p-action-link danger" onclick="showToast('删除房间')">删除</span></td></tr>`
  ).join('');
}
function renderHandCardTable() {
  document.getElementById('handCardTableBody').innerHTML = handCardList.map((c, i) =>
    `<tr><td><input type="checkbox" data-id="${c.id}" onchange="updateHandCardSelectAll()" /></td><td>${i + 1}</td><td>${c.code}</td><td>${c.store}</td><td>
      <span class="p-action-link" onclick="openHandCardModal(${c.id})">修改</span>
      <span class="p-action-link danger" onclick="deleteHandCard(${c.id})">删除</span>
    </td></tr>`
  ).join('');
  document.getElementById('handCardTotalInfo').textContent = `共 ${handCardList.length} 条数据`;
}

async function loadHandCardList() {
  try {
    const json = await apiGet('/hand-cards');
    if (json.code === 0 && json.data) {
      handCardList = json.data;
      renderHandCardTable();
    }
  } catch(e) {
    console.error('手牌加载失败:', e);
    showToast('手牌加载失败，请确认后端服务已启动', 'error');
  }
}

function openHandCardModal(id) {
  handCardEditIndex = typeof id === 'number' ? id : -1;
  const overlay = document.getElementById('handCardModalOverlay');
  document.getElementById('handCardModalTitle').textContent = handCardEditIndex > 0 ? '修改手牌' : '新增手牌';
  if (handCardEditIndex > 0) {
    const item = handCardList.find(c => c.id === handCardEditIndex);
    if (item) {
      document.getElementById('handCardInputCode').value = item.code;
      document.getElementById('handCardInputStore').value = item.store;
    }
  } else {
    document.getElementById('handCardInputCode').value = '';
    document.getElementById('handCardInputStore').value = '';
  }
  overlay.classList.add('open');
  document.getElementById('handCardInputCode').focus();
}

function closeHandCardModal() {
  document.getElementById('handCardModalOverlay').classList.remove('open');
}

async function saveHandCard() {
  const code = document.getElementById('handCardInputCode').value.trim();
  const store = document.getElementById('handCardInputStore').value.trim() || '三合900店';
  if (!code) {
    showToast('请输入手牌编码', 'error');
    document.getElementById('handCardInputCode').focus();
    return;
  }
  try {
    if (handCardEditIndex > 0) {
      const json = await apiPut(`/hand-cards/${handCardEditIndex}`, { code, store });
      if (json.code === 0) {
        showToast('修改成功');
      } else {
        showToast(json.msg || '修改失败', 'error');
        return;
      }
    } else {
      const json = await apiPost('/hand-cards', { code, store });
      if (json.code === 0) {
        showToast('新增成功');
      } else {
        showToast(json.msg || '新增失败', 'error');
        return;
      }
    }
    closeHandCardModal();
    await loadHandCardList();
  } catch(e) {
    console.error('手牌保存失败:', e);
    showToast('保存失败，请确认后端服务已启动', 'error');
  }
}

async function deleteHandCard(id) {
  const item = handCardList.find(c => c.id === id);
  if (!item) return;
  if (!confirm(`确定要删除手牌「${item.code}」吗？`)) return;
  try {
    const json = await apiDelete(`/hand-cards/${id}`);
    if (json.code === 0) {
      showToast('删除成功');
      await loadHandCardList();
    } else {
      showToast(json.msg || '删除失败', 'error');
    }
  } catch(e) {
    console.error('手牌删除失败:', e);
    showToast('删除失败，请确认后端服务已启动', 'error');
  }
}

function toggleHandCardAll(el) {
  document.querySelectorAll('#handCardTableBody input[type="checkbox"]').forEach(cb => cb.checked = el.checked);
}

function updateHandCardSelectAll() {
  const all = document.querySelectorAll('#handCardTableBody input[type="checkbox"]');
  const checked = document.querySelectorAll('#handCardTableBody input[type="checkbox"]:checked');
  const headerCb = document.querySelector('#handCardTableBody').closest('table').querySelector('thead input[type="checkbox"]');
  if (headerCb) headerCb.checked = all.length > 0 && all.length === checked.length;
}

/* ========== 手牌批量操作 ========== */

// 实时更新预览
document.addEventListener('input', function(e) {
  const ids = ['batchPrefix', 'batchStart', 'batchCount', 'batchSuffix'];
  if (ids.includes(e.target.id)) updateBatchPreview();
});

function updateBatchPreview() {
  const prefix = document.getElementById('batchPrefix').value.trim() || 'sh';
  const start = parseInt(document.getElementById('batchStart').value) || 1;
  const count = parseInt(document.getElementById('batchCount').value) || 1;
  const suffix = document.getElementById('batchSuffix').value.trim();
  const preview = document.getElementById('batchPreview');
  const codes = [];
  const showCount = Math.min(count, 10);
  for (let i = 0; i < showCount; i++) {
    codes.push(`${prefix}${start + i}${suffix}`);
  }
  let text = '预览：' + codes.join(', ');
  if (count > 10) text += ` ...等${count}个`;
  preview.textContent = text;
}

function openHandCardBatchModal() {
  document.getElementById('handCardBatchOverlay').classList.add('open');
  updateBatchPreview();
}

function closeHandCardBatchModal() {
  document.getElementById('handCardBatchOverlay').classList.remove('open');
}

async function batchAddHandCards() {
  const prefix = document.getElementById('batchPrefix').value.trim();
  const start = parseInt(document.getElementById('batchStart').value) || 1;
  const count = parseInt(document.getElementById('batchCount').value) || 1;
  const suffix = document.getElementById('batchSuffix').value.trim();
  const store = document.getElementById('batchStore').value.trim() || '三合900店';

  if (!prefix) { showToast('请输入前缀', 'error'); return; }
  if (count < 1 || count > 1000) { showToast('数量范围 1~1000', 'error'); return; }
  if (!confirm(`确定要批量添加 ${count} 个手牌（${prefix}${start}${suffix} ~ ${prefix}${start + count - 1}${suffix}）吗？`)) return;

  try {
    const json = await apiPost('/hand-cards/batch', { prefix, start, count, suffix, store });
    if (json.code === 0) {
      showToast(json.msg || '批量添加成功');
      closeHandCardBatchModal();
      await loadHandCardList();
    } else {
      showToast(json.msg || '批量添加失败', 'error');
    }
  } catch(e) {
    console.error('批量添加失败:', e);
    showToast('批量添加失败，请确认后端服务已启动', 'error');
  }
}

async function batchDeleteHandCards() {
  const checked = document.querySelectorAll('#handCardTableBody input[type="checkbox"]:checked');
  if (checked.length === 0) {
    showToast('请先勾选要删除的手牌', 'error');
    return;
  }
  if (!confirm(`确定要删除选中的 ${checked.length} 个手牌吗？`)) return;

  const ids = Array.from(checked).map(cb => cb.dataset.id).join(',');
  try {
    const json = await apiDelete(`/hand-cards/batch?ids=${ids}`);
    if (json.code === 0) {
      showToast(json.msg || '批量删除成功');
      await loadHandCardList();
    } else {
      showToast(json.msg || '批量删除失败', 'error');
    }
  } catch(e) {
    console.error('批量删除失败:', e);
    showToast('批量删除失败，请确认后端服务已启动', 'error');
  }
}

/* ========== Toast ========== */
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.p-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'p-toast';
  toast.style.cssText = `
    position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
    background: var(--color-primary); color: #fff; padding: 10px 20px;
    border-radius: 8px; font-size: 14px; font-weight: 500; z-index: 9999;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

/* ========== i18n ========== */
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
}

function toggleLang() {
  renderI18n(currentLang === 'zh' ? 'en' : 'zh');
  const active = document.querySelector('.p-sub-item.active');
  if (active) switchProductTab(active.dataset.tab);
}

/* ========== Theme ========== */
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

/* ========== Navigation ========== */
/* 底部导航"商品"按钮：如果已在商品页面则回到主页 */
function goToProductHome() {
  if (typeof switchProductTab === 'function') {
    switchProductTab('home');
  } else {
    window.location.href = 'products.html';
  }
}

function navigate(el) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
}

/* ========== Init ========== */
document.addEventListener('DOMContentLoaded', initProducts);
