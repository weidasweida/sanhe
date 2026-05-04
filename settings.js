/* ========== 系统设置逻辑 ========== */

// 当前状态
let currentSettingsPage = '';

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  // 设置当前页面主题色
  const app = document.getElementById('app');
  if (app) app.dataset.theme = currentTheme || 'aurora-blue';
});

// 导航到具体设置子页面
function navigateTo(page) {
  currentSettingsPage = page;
  const pageNames = {
    'store-manage': '门店管理',
    'store-notice': '店内通知',
    'store-brand': '所属品牌',
    'operation-log': '操作日志',
    'account-permission': '账号权限',
    'commission': '提成设置',
    'scheduling': '排班设置',
    'attendance': '考勤汇总',
    'staff-goal': '员工目标',
    'consumption': '消费参数',
    'message-push': '消息推送设置',
    'custom-pay': '自定义支付',
    'asset-transfer': '资产转换',
    'receipt': '票据设置',
    'distribution': '分销设置',
  };
  const name = pageNames[page] || page;
  alert('即将打开: ' + name);
  // TODO: 后续实现各子页面内容
}

// 退出登录
function logout() {
  if (confirm('确认退出登录？')) {
    // TODO: 实现退出逻辑
    alert('已退出');
  }
}

console.log('✅ 系统设置页面已加载');
