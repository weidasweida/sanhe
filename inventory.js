/* ========== Inventory Page - All Data & Logic ========== */

// ====== Mock Data ======
const INV_warehouses = [
  { id: 'wh1', code: 'WH-001', name: '主仓库', type: '实体', contact: '张三', phone: '13800138001', status: 'enabled' },
  { id: 'wh2', code: 'WH-002', name: '副仓库', type: '实体', contact: '李四', phone: '13800138002', status: 'enabled' },
  { id: 'wh3', code: 'WH-003', name: '门店库存', type: '门店', contact: '王五', phone: '13800138003', status: 'enabled' },
  { id: 'wh4', code: 'WH-004', name: '退货仓', type: '虚拟', contact: '', phone: '', status: 'enabled' },
];

const INV_stock = [
  { sku: 'SKU-001', name: '可乐 330ml', category: '饮料', stock: 200, min: 50, max: 500, unit: '瓶', cost: 2.5, warehouse: 'wh1' },
  { sku: 'SKU-002', name: '薯片 60g', category: '零食', stock: 80, min: 30, max: 200, unit: '包', cost: 3.0, warehouse: 'wh1' },
  { sku: 'SKU-003', name: '矿泉水 550ml', category: '饮料', stock: 300, min: 100, max: 600, unit: '瓶', cost: 1.2, warehouse: 'wh1' },
  { sku: 'SKU-004', name: '方便面', category: '食品', stock: 10, min: 20, max: 100, unit: '桶', cost: 4.5, warehouse: 'wh1' },
  { sku: 'SKU-005', name: '面包 原味', category: '食品', stock: 15, min: 20, max: 80, unit: '个', cost: 5.0, warehouse: 'wh1' },
  { sku: 'SKU-006', name: '电池 5号', category: '日用品', stock: 5, min: 10, max: 50, unit: '对', cost: 3.5, warehouse: 'wh1' },
  { sku: 'SKU-007', name: '纸巾 抽装', category: '日用品', stock: 45, min: 20, max: 100, unit: '包', cost: 6.0, warehouse: 'wh1' },
  { sku: 'SKU-008', name: '精油-薰衣草', category: '零售', stock: 15, min: 10, max: 50, unit: '瓶', cost: 60.0, warehouse: 'wh1' },
  { sku: 'SKU-009', name: '艾条', category: '零售', stock: 200, min: 50, max: 400, unit: '根', cost: 8.0, warehouse: 'wh1' },
  { sku: 'SKU-010', name: '拔罐套装', category: '零售', stock: 30, min: 10, max: 50, unit: '套', cost: 35.0, warehouse: 'wh1' },
  { sku: 'SKU-011', name: '艾条 纯金', category: '零售', stock: 3, min: 10, max: 30, unit: '根', cost: 25.0, warehouse: 'wh1' },
  { sku: 'SKU-012', name: '按摩油 500ml', category: '零售', stock: 25, min: 10, max: 60, unit: '瓶', cost: 45.0, warehouse: 'wh1' },
];

let INV_inboundOrders = [
  { id: 'IN-20250401', type: 'purchase', date: '2025-04-01', supplier: '华康药业', items: '艾条 ×200, 精油 ×50', totalCost: 4600, status: 'done', operator: '张三' },
  { id: 'IN-20250402', type: 'return', date: '2025-04-03', supplier: '客户退货', items: '拔罐套装 ×5', totalCost: 175, status: 'done', operator: '张三' },
  { id: 'IN-20250403', type: 'purchase', date: '2025-04-05', supplier: '百利食品', items: '可乐 ×200, 薯片 ×100', totalCost: 800, status: 'done', operator: '李四' },
  { id: 'IN-20250404', type: 'other', date: '2025-04-08', supplier: '', items: '矿泉水 ×300', totalCost: 360, status: 'done', operator: '李四' },
  { id: 'IN-20250405', type: 'purchase', date: '2025-04-10', supplier: '华康药业', items: '按摩油 ×30, 艾条纯金 ×20', totalCost: 1850, status: 'pending', operator: '张三' },
];

let INV_outboundOrders = [
  { id: 'OUT-20250401', type: 'sale', date: '2025-04-01', department: '', items: '可乐 ×10, 薯片 ×5', totalCost: 40, status: 'done', operator: '王五' },
  { id: 'OUT-20250402', type: 'use', date: '2025-04-02', department: '理疗部', items: '按摩油 ×2', totalCost: 90, status: 'done', operator: '李四' },
  { id: 'OUT-20250403', type: 'sale', date: '2025-04-03', department: '', items: '矿泉水 ×50', totalCost: 60, status: 'done', operator: '王五' },
  { id: 'OUT-20250404', type: 'use', date: '2025-04-06', department: '艾灸室', items: '艾条 ×30', totalCost: 240, status: 'done', operator: '李四' },
  { id: 'OUT-20250405', type: 'other', date: '2025-04-09', department: '报废', items: '电池 ×2(过期)', totalCost: 0, status: 'done', operator: '张三' },
  { id: 'OUT-20250406', type: 'sale', date: '2025-04-10', department: '', items: '拔罐套装 ×2', totalCost: 136, status: 'pending', operator: '王五' },
];

let INV_transferOrders = [
  { id: 'TR-20250401', from: '主仓库', to: '副仓库', items: '精油 ×10', qty: 10, date: '2025-04-02', status: 'done', operator: '张三' },
  { id: 'TR-20250402', from: '主仓库', to: '门店库存', items: '可乐 ×30, 薯片 ×20', qty: 50, date: '2025-04-04', status: 'done', operator: '李四' },
  { id: 'TR-20250403', from: '副仓库', to: '主仓库', items: '矿泉水 ×100', qty: 100, date: '2025-04-07', status: 'pending', operator: '张三' },
  { id: 'TR-20250404', from: '退货仓', to: '主仓库', items: '拔罐套装 ×3', qty: 3, date: '2025-04-09', status: 'draft', operator: '王五' },
];

let INV_checkOrders = [
  { id: 'CK-20250401', warehouse: '主仓库', type: '月度盘点', total: 8, diff: 0, date: '2025-04-01', status: 'done', operator: '张三' },
  { id: 'CK-20250402', warehouse: '主仓库', type: '临时盘点', total: 3, diff: 1, date: '2025-04-05', status: 'done', operator: '李四' },
  { id: 'CK-20250403', warehouse: '副仓库', type: '季度盘点', total: 6, diff: 2, date: '2025-04-08', status: 'done', operator: '张三' },
  { id: 'CK-20250404', warehouse: '门店库存', type: '月度盘点', total: 5, diff: 0, date: '2025-04-10', status: 'pending', operator: '王五' },
];

const INV_recentActivity = [
  { type: 'in', name: '艾条 ×200 入库', qty: '+200', time: '今天 10:30' },
  { type: 'out', name: '可乐 ×10 出库销售', qty: '-10', time: '今天 10:25' },
  { type: 'in', name: '按摩油 ×30 采购入库', qty: '+30', time: '昨天 16:00' },
  { type: 'out', name: '拔罐套装 ×2 出库销售', qty: '-2', time: '昨天 15:30' },
  { type: 'transfer', name: '精油调拨至副仓库', qty: '-10', time: '昨天 14:00' },
  { type: 'loss', name: '电池 ×2 报损', qty: '-2', time: '2025-04-09' },
];

// ====== Tab Switching ======
function switchInventoryTab(tabId, el) {
  // Update sidebar active
  if (el) {
    document.querySelectorAll('.i-sub-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
  } else {
    const target = document.querySelector(`.i-sub-item[onclick*='${tabId}']`);
    if (target) {
      document.querySelectorAll('.i-sub-item').forEach(item => item.classList.remove('active'));
      target.classList.add('active');
    }
  }
  // Show tab content
  document.querySelectorAll('.i-tab-content').forEach(t => t.classList.remove('active'));
  const tab = document.getElementById('tab-' + tabId);
  if (tab) tab.classList.add('active');

  // Refresh tab data
  if (tabId === 'overview') renderRecentActivity();
  if (tabId === 'inbound') renderInbound();
  if (tabId === 'outbound') renderOutbound();
  if (tabId === 'transfer') renderTransfer();
  if (tabId === 'check') renderCheck();
  if (tabId === 'alert') renderAlert();
  if (tabId === 'warehouse') renderWarehouse();
}

// ====== Overview: Recent Activity ======
function renderRecentActivity() {
  const list = document.getElementById('recentActivityList');
  if (!list) return;
  list.innerHTML = INV_recentActivity.map(a => `
    <div class="i-recent-item">
      <span class="i-recent-type ${a.type}">${a.type === 'in' ? '入库' : a.type === 'out' ? '出库' : a.type === 'transfer' ? '调拨' : '报损'}</span>
      <span class="i-recent-name">${a.name}</span>
      <span class="i-recent-qty">${a.qty}</span>
      <span class="i-recent-time">${a.time}</span>
    </div>
  `).join('');
}

// ====== Inbound ======
function renderInbound() {
  const body = document.getElementById('inboundTableBody');
  if (!body) return;
  body.innerHTML = INV_inboundOrders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.type === 'purchase' ? '采购入库' : o.type === 'return' ? '退货入库' : '其他入库'}</td>
      <td>${o.date}</td>
      <td>${o.supplier || '-'}</td>
      <td>${o.items}</td>
      <td>¥${o.totalCost.toFixed(2)}</td>
      <td><span class="i-tag ${o.status === 'done' ? 'enabled' : 'warning'}">${o.status === 'done' ? '已完成' : '待审核'}</span></td>
      <td>${o.operator}</td>
      <td>
        <span class="i-action-link" onclick="alert('查看入库单 ${o.id}')">查看</span>
        ${o.status === 'pending' ? '<span class="i-action-link" onclick="alert(\'审核通过\')">审核</span>' : ''}
      </td>
    </tr>
  `).join('');
  renderPagination('inboundPagination', INV_inboundOrders.length);
}

function filterInbound() {
  renderInbound();
}

// ====== Inbound Modal ======
let inboundItems = [];
function openInboundModal() {
  document.getElementById('inboundModalOverlay').classList.add('open');
  document.getElementById('inboundModal').style.display = 'block';
  inboundItems = [];
  renderInboundItems();
  // Populate product select
  const sel = document.getElementById('inboundItemSelect');
  sel.innerHTML = '<option value="">选择商品...</option>' +
    INV_stock.map(s => `<option value="${s.sku}">${s.name}</option>`).join('');
  document.getElementById('inboundFormSupplier').value = '';
}
function closeInboundModal() {
  document.getElementById('inboundModalOverlay').classList.remove('open');
  document.getElementById('inboundModal').style.display = 'none';
}
function addInboundItem() {
  const sel = document.getElementById('inboundItemSelect');
  const qty = parseInt(document.getElementById('inboundItemQty').value) || 0;
  const price = parseFloat(document.getElementById('inboundItemPrice').value) || 0;
  if (!sel.value || qty <= 0) { alert('请选择商品并填写数量'); return; }
  const product = INV_stock.find(s => s.sku === sel.value);
  inboundItems.push({ sku: sel.value, name: product.name, qty, price });
  renderInboundItems();
  sel.value = '';
  document.getElementById('inboundItemQty').value = '';
  document.getElementById('inboundItemPrice').value = '';
}
function renderInboundItems() {
  const list = document.getElementById('inboundItemList');
  if (!list) return;
  list.innerHTML = inboundItems.length === 0
    ? '<div style="font-size:12px;color:var(--text-tertiary);padding:8px;">暂无商品</div>'
    : inboundItems.map((item, i) => `
      <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border-color);font-size:12px;">
        <span style="flex:2;">${item.name}</span>
        <span style="flex:1;text-align:center;">x${item.qty}</span>
        <span style="flex:1;text-align:right;">¥${(item.price * item.qty).toFixed(2)}</span>
        <button style="border:none;background:none;color:var(--color-danger);cursor:pointer;" onclick="removeInboundItem(${i})">✕</button>
      </div>
    `).join('');
}
function removeInboundItem(idx) {
  inboundItems.splice(idx, 1);
  renderInboundItems();
}
function submitInbound() {
  if (inboundItems.length === 0) { alert('请添加至少一个商品'); return; }
  const type = document.getElementById('inboundFormType').value;
  const supplier = document.getElementById('inboundFormSupplier').value;
  const total = inboundItems.reduce((s, i) => s + i.price * i.qty, 0);
  INV_inboundOrders.unshift({
    id: 'IN-' + Date.now().toString().slice(-6),
    type, date: new Date().toISOString().slice(0,10),
    supplier: supplier || '-',
    items: inboundItems.map(i => `${i.name} x${i.qty}`).join(', '),
    totalCost: total, status: 'done', operator: '管理员'
  });
  // Update stock
  inboundItems.forEach(i => {
    const stock = INV_stock.find(s => s.sku === i.sku);
    if (stock) { stock.stock += i.qty; stock.cost = i.price; }
  });
  INV_recentActivity.unshift({ type: 'in', name: `入库 ${inboundItems.length} 种商品`, qty: `+${inboundItems.reduce((s,i) => s + i.qty, 0)}`, time: '刚刚' });
  closeInboundModal();
  renderInbound();
  renderRecentActivity();
}

// ====== Outbound ======
function renderOutbound() {
  const body = document.getElementById('outboundTableBody');
  if (!body) return;
  body.innerHTML = INV_outboundOrders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.type === 'sale' ? '销售出库' : o.type === 'use' ? '领用出库' : '其他出库'}</td>
      <td>${o.date}</td>
      <td>${o.department || '-'}</td>
      <td>${o.items}</td>
      <td>¥${o.totalCost.toFixed(2)}</td>
      <td><span class="i-tag ${o.status === 'done' ? 'enabled' : 'warning'}">${o.status === 'done' ? '已完成' : '待审核'}</span></td>
      <td>${o.operator}</td>
      <td>
        <span class="i-action-link" onclick="alert('查看出库单 ${o.id}')">查看</span>
        ${o.status === 'pending' ? '<span class="i-action-link" onclick="alert(\'审核通过\')">审核</span>' : ''}
      </td>
    </tr>
  `).join('');
  renderPagination('outboundPagination', INV_outboundOrders.length);
}
function filterOutbound() { renderOutbound(); }

// ====== Outbound Modal ======
let outboundItems = [];
function openOutboundModal() {
  document.getElementById('inboundModalOverlay').classList.add('open');
  document.getElementById('inboundModal').querySelector('.i-modal-header span').textContent = '新增出库';
  document.getElementById('inboundModal').style.display = 'block';
  outboundItems = [];
  renderOutboundItems();
  const sel = document.getElementById('inboundItemSelect');
  sel.innerHTML = '<option value="">选择商品...</option>' +
    INV_stock.filter(s => s.stock > 0).map(s => `<option value="${s.sku}">${s.name} (库存:${s.stock})</option>`).join('');
  document.getElementById('inboundFormSupplier').parentElement.style.display = 'none';
  document.getElementById('inboundFormType').innerHTML = `
    <option value="sale">销售出库</option>
    <option value="use">领用出库</option>
    <option value="other">其他出库</option>
  `;
}
function renderOutboundItems() {
  const list = document.getElementById('inboundItemList');
  if (!list) return;
  list.innerHTML = outboundItems.length === 0
    ? '<div style="font-size:12px;color:var(--text-tertiary);padding:8px;">暂无商品</div>'
    : outboundItems.map((item, i) => `
      <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border-color);font-size:12px;">
        <span style="flex:2;">${item.name}</span>
        <span style="flex:1;text-align:center;">x${item.qty}</span>
        <span style="flex:1;text-align:right;">¥${(item.price * item.qty).toFixed(2)}</span>
        <button style="border:none;background:none;color:var(--color-danger);cursor:pointer;" onclick="removeOutboundItem(${i})">✕</button>
      </div>
    `).join('');
}
function removeOutboundItem(idx) { outboundItems.splice(idx, 1); renderOutboundItems(); }
function addOutboundItem() {
  const sel = document.getElementById('inboundItemSelect');
  const qty = parseInt(document.getElementById('inboundItemQty').value) || 0;
  if (!sel.value || qty <= 0) { alert('请选择商品并填写数量'); return; }
  const product = INV_stock.find(s => s.sku === sel.value);
  outboundItems.push({ sku: sel.value, name: product.name, qty, price: product.cost });
  renderOutboundItems();
  sel.value = ''; document.getElementById('inboundItemQty').value = ''; document.getElementById('inboundItemPrice').value = '';
}
function submitOutbound() {
  if (outboundItems.length === 0) { alert('请添加至少一个商品'); return; }
  const type = document.getElementById('inboundFormType').value;
  const total = outboundItems.reduce((s, i) => s + i.price * i.qty, 0);
  INV_outboundOrders.unshift({
    id: 'OUT-' + Date.now().toString().slice(-6),
    type, date: new Date().toISOString().slice(0,10),
    department: type === 'use' ? '领用' : '', items: outboundItems.map(i => `${i.name} x${i.qty}`).join(', '),
    totalCost: total, status: 'done', operator: '管理员'
  });
  outboundItems.forEach(i => {
    const stock = INV_stock.find(s => s.sku === i.sku);
    if (stock) stock.stock = Math.max(0, stock.stock - i.qty);
  });
  INV_recentActivity.unshift({ type: 'out', name: `出库 ${outboundItems.length} 种商品`, qty: `-${outboundItems.reduce((s,i) => s + i.qty, 0)}`, time: '刚刚' });
  closeInboundModal();
  renderOutbound();
  renderRecentActivity();
}
// Patch: override submitInbound check to support outbound
const _origSubmit = submitInbound;

// ====== Transfer ======
function renderTransfer() {
  const body = document.getElementById('transferTableBody');
  if (!body) return;
  body.innerHTML = INV_transferOrders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.from}</td>
      <td>${o.to}</td>
      <td>${o.items}</td>
      <td>${o.qty}</td>
      <td>${o.date}</td>
      <td><span class="i-tag ${o.status === 'done' ? 'enabled' : o.status === 'pending' ? 'warning' : o.status === 'draft' ? 'normal' : 'disabled'}">${
        o.status === 'done' ? '已完成' : o.status === 'pending' ? '待审核' : o.status === 'draft' ? '草稿' : '已取消'
      }</span></td>
      <td>${o.operator}</td>
      <td>
        <span class="i-action-link" onclick="alert('查看调拨单 ${o.id}')">查看</span>
        ${o.status === 'pending' ? '<span class="i-action-link" onclick="alert(\'审核通过\')">审核</span>' : ''}
      </td>
    </tr>
  `).join('');
  renderPagination('transferPagination', INV_transferOrders.length);
}
function filterTransfer() { renderTransfer(); }

function openTransferModal() {
  alert('新建调拨功能开发中...');
}

// ====== Cycle Count ======
function renderCheck() {
  const body = document.getElementById('checkTableBody');
  if (!body) return;
  body.innerHTML = INV_checkOrders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.warehouse}</td>
      <td>${o.type}</td>
      <td>${o.total}</td>
      <td><span style="color:${o.diff > 0 ? 'var(--color-warning)' : 'var(--color-success)'};">${o.diff}</span></td>
      <td>${o.date}</td>
      <td><span class="i-tag ${o.status === 'done' ? 'enabled' : 'warning'}">${o.status === 'done' ? '已完成' : '待盘点'}</span></td>
      <td>${o.operator}</td>
      <td>
        <span class="i-action-link" onclick="alert('查看盘点单 ${o.id}')">查看</span>
        ${o.status === 'pending' ? '<span class="i-action-link" onclick="alert(\'开始盘点\')">盘点</span>' : ''}
      </td>
    </tr>
  `).join('');
  renderPagination('checkPagination', INV_checkOrders.length);
}
function filterCheck() { renderCheck(); }
function openCheckModal() { alert('新建盘点功能开发中...'); }

// ====== Alerts ======
function renderAlert() {
  const body = document.getElementById('alertTableBody');
  if (!body) return;
  const alertItems = INV_stock.filter(s => s.stock < s.min || s.stock > s.max);
  body.innerHTML = alertItems.map(s => {
    const type = s.stock < s.min ? 'low' : 'over';
    return `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.category}</td>
        <td style="font-weight:600;color:${s.stock < s.min ? 'var(--color-danger)' : 'var(--color-warning)'};">${s.stock}</td>
        <td>${s.min}</td>
        <td>${s.max}</td>
        <td><span class="i-tag ${type === 'low' ? 'disabled' : 'warning'}">${type === 'low' ? '库存不足' : '库存过多'}</span></td>
        <td>
          <span class="i-action-link" onclick="alert('补货 ${s.name}')">补货</span>
        </td>
      </tr>
    `;
  }).join('');
}
function filterAlert() { renderAlert(); }
function openAlertSettingsModal() { alert('预警设置功能开发中...'); }

// ====== Reports ======
function switchReport() { /* placeholder */ }
function exportReport() { alert('报表导出功能开发中...'); }

// ====== Warehouse ======
function renderWarehouse() {
  const body = document.getElementById('warehouseTableBody');
  if (!body) return;
  body.innerHTML = INV_warehouses.map(w => `
    <tr>
      <td>${w.code}</td>
      <td><strong>${w.name}</strong></td>
      <td>${w.type}</td>
      <td>${w.contact || '-'}</td>
      <td>${w.phone || '-'}</td>
      <td><span class="i-tag ${w.status === 'enabled' ? 'enabled' : 'disabled'}">${w.status === 'enabled' ? '启用' : '停用'}</span></td>
      <td>
        <span class="i-action-link" onclick="alert('编辑仓库 ${w.name}')">编辑</span>
        <span class="i-action-link danger" onclick="alert('删除仓库 ${w.name}')">删除</span>
      </td>
    </tr>
  `).join('');
}
function filterWarehouse() { renderWarehouse(); }
function openWarehouseModal() { alert('新增仓库功能开发中...'); }

// ====== Pagination ======
function renderPagination(id, total) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<span data-i18n="total">共</span> <strong>${total}</strong> <span data-i18n="items">条</span>`;
}

// ====== Modal Override: outbound submit ======
// Patch the inbound modal to work for both inbound and outbound
const _origCloseInbound = closeInboundModal;
// Override submit based on which modal is shown
const _origAddItem = addInboundItem;
// We'll just patch the onclick on the save button dynamically
document.addEventListener('DOMContentLoaded', () => {
  renderRecentActivity();
  // Fix: the inbound modal save button should work for outbound too
  // We set up a flag
  window._inboundMode = true;
  const origSubmit = submitInbound;
  // Replace submit to detect mode
  submitInbound = function() {
    if (document.getElementById('inboundFormType').querySelector('option[value="sale"]')) {
      // Outbound mode
      submitOutbound();
    } else {
      origSubmit();
    }
  };
  addInboundItem = function() {
    if (document.getElementById('inboundFormType').querySelector('option[value="sale"]')) {
      addOutboundItem();
    } else {
      _origAddItem();
    }
  };
  closeInboundModal = function() {
    // Restore supplier field visibility
    document.getElementById('inboundFormSupplier').parentElement.style.display = '';
    _origCloseInbound();
  };
});
