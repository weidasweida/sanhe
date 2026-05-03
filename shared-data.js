/* ========== Shared Data: Categories, Products, Projects ========== */
/* This file provides a single source of truth for all data management.
   Changes here affect checkout.html, products.html, and all other pages. */

// ====== Categories (used in checkout tab + products management) ======
// Each category: { id, name, icon, visible (show/hide in checkout), sort }
const SHARED_categories = [
  { id: 'all',      name: { zh: '全部项目', en: 'All Items' },          icon: '📋', visible: true, sort: 0 },
  { id: 'acupuncture', name: { zh: '针灸', en: 'Acupuncture' },         icon: '📌', visible: true, sort: 1 },
  { id: 'tuina',    name: { zh: '推拿', en: 'Tuina' },                  icon: '✋', visible: true, sort: 2 },
  { id: 'osteopathy', name: { zh: '正骨', en: 'Osteopathy' },           icon: '🦴', visible: true, sort: 3 },
  { id: 'cupping',  name: { zh: '拔罐', en: 'Cupping' },                icon: '🫙', visible: true, sort: 4 },
  { id: 'moxibustion', name: { zh: '艾灸', en: 'Moxibustion' },         icon: '🔥', visible: true, sort: 5 },
  { id: 'physio',   name: { zh: '理疗', en: 'Physiotherapy' },          icon: '💡', visible: true, sort: 6 },
  { id: 'retail',   name: { zh: '零售产品', en: 'Retail' },             icon: '📦', visible: true, sort: 7 },
];

// ====== Products / Items (used in checkout grid) ======
// Each product: { id, name, category, price, stock, icon, type: 'service'|'product', duration?: minutes }
const SHARED_products = [
  // --- 针灸 ---
  { id: 'p1',  name: { zh: '电针治疗', en: 'Electroacupuncture' },   category: 'acupuncture', price: 180, stock: 99, icon: '⚡', type: 'service', duration: 30 },
  { id: 'p2',  name: { zh: '温针灸', en: 'Warm Acupuncture' },        category: 'acupuncture', price: 200, stock: 99, icon: '🔥', type: 'service', duration: 40 },
  { id: 'p3',  name: { zh: '头皮针', en: 'Scalp Acupuncture' },       category: 'acupuncture', price: 160, stock: 99, icon: '💉', type: 'service', duration: 30 },
  { id: 'p4',  name: { zh: '耳针', en: 'Ear Acupuncture' },           category: 'acupuncture', price: 120, stock: 30, icon: '👂', type: 'service', duration: 25 },
  // --- 推拿 ---
  { id: 'p5',  name: { zh: '经络推拿', en: 'Meridian Massage' },      category: 'tuina', price: 168, stock: 99, icon: '💆', type: 'service', duration: 60 },
  { id: 'p6',  name: { zh: '小儿推拿', en: 'Pediatric Massage' },     category: 'tuina', price: 128, stock: 50, icon: '👶', type: 'service', duration: 30 },
  { id: 'p7',  name: { zh: '全身按摩推拿', en: 'Full Body Massage' }, category: 'tuina', price: 238, stock: 40, icon: '🧘', type: 'service', duration: 90 },
  // --- 正骨 ---
  { id: 'p8',  name: { zh: '骨盆定位', en: 'Pelvic Positioning' },    category: 'osteopathy', price: 320, stock: 99, icon: '🦴', type: 'service', duration: 45 },
  { id: 'p9',  name: { zh: '郑氏针灸', en: 'Zheng Acupuncture' },     category: 'osteopathy', price: 250, stock: 20, icon: '🧑‍⚕️', type: 'service', duration: 40 },
  // --- 拔罐 ---
  { id: 'p10', name: { zh: '留罐', en: 'Cupping' },                   category: 'cupping', price: 80, stock: 99, icon: '🫙', type: 'service', duration: 20 },
  { id: 'p11', name: { zh: '刮痧', en: 'Gua Sha' },                   category: 'cupping', price: 120, stock: 60, icon: '🪮', type: 'service', duration: 30 },
  // --- 艾灸 ---
  { id: 'p12', name: { zh: '火龙灸', en: 'Fire Dragon Moxibustion' }, category: 'moxibustion', price: 150, stock: 99, icon: '🐉', type: 'service', duration: 60 },
  { id: 'p13', name: { zh: '艾条熏灸', en: 'Moxa Stick Moxibustion' },category: 'moxibustion', price: 120, stock: 80, icon: '🌿', type: 'service', duration: 30 },
  // --- 理疗 ---
  { id: 'p14', name: { zh: '中频理疗', en: 'Medium Frequency' },      category: 'physio', price: 98, stock: 99, icon: '⚡', type: 'service', duration: 20 },
  { id: 'p15', name: { zh: '红外线理疗', en: 'Infrared Therapy' },    category: 'physio', price: 88, stock: 99, icon: '🔴', type: 'service', duration: 25 },
  // --- 零售产品 ---
  { id: 'p16', name: { zh: '精油-薰衣草', en: 'Lavender Oil' },       category: 'retail', price: 128, stock: 15, icon: '🌸', type: 'product' },
  { id: 'p17', name: { zh: '艾条', en: 'Moxa Stick' },                category: 'retail', price: 25, stock: 200, icon: '🌿', type: 'product' },
  { id: 'p18', name: { zh: '拔罐套装', en: 'Cupping Set' },           category: 'retail', price: 68, stock: 30, icon: '🫙', type: 'product' },
];

// ====== Utility functions ======
function getVisibleCategories(lang) {
  return SHARED_categories
    .filter(c => c.visible)
    .sort((a, b) => a.sort - b.sort);
}

function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return SHARED_products;
  return SHARED_products.filter(p => p.category === categoryId);
}

function getCategoryName(categoryId, lang) {
  const cat = SHARED_categories.find(c => c.id === categoryId);
  return cat ? (cat.name[lang] || cat.name.zh) : categoryId;
}

// ====== Category Settings Modal ======
let _catSettingsLang = 'zh';
function openCategorySettings() {
  _catSettingsLang = currentLang || 'zh';
  renderCategorySettingsList();
  document.getElementById('catSettingsModal').classList.add('open');
  document.getElementById('catSettingsOverlay').classList.add('open');
}

function closeCategorySettings() {
  document.getElementById('catSettingsModal').classList.remove('open');
  document.getElementById('catSettingsOverlay').classList.remove('open');
}

function renderCategorySettingsList() {
  const list = document.getElementById('catSettingsList');
  if (!list) return;
  const lang = _catSettingsLang;
  list.innerHTML = SHARED_categories
    .sort((a, b) => a.sort - b.sort)
    .map(c => `
      <div class="cat-settings-item" data-id="${c.id}">
        <span class="cat-settings-drag">⠿</span>
        <span class="cat-settings-icon">${c.icon}</span>
        <span class="cat-settings-name">${c.name[lang] || c.name.zh}</span>
        <label class="cat-settings-toggle">
          <input type="checkbox" ${c.visible ? 'checked' : ''} onchange="toggleCategoryVisibility('${c.id}')" />
          <span class="toggle-slider"></span>
        </label>
      </div>
    `).join('');
}

function toggleCategoryVisibility(id) {
  const cat = SHARED_categories.find(c => c.id === id);
  if (cat) cat.visible = !cat.visible;
}

function saveCategorySettings() {
  closeCategorySettings();
  // Re-render checkout tabs if available
  if (typeof renderCategories === 'function') renderCategories();
  if (typeof filterProducts === 'function') filterProducts();
  // Notify user
  if (typeof showToast === 'function') {
    showToast('分类设置已保存', 'success');
  }
}
