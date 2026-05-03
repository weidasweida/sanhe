/* ========== i18n ========== */
// Merge booking-specific translations into app.js's i18n (prevents const/let redeclaration errors)
(function() {
  const bookingZh = {
    brand: "收银通", admin: "管理员", storeName: "旗舰店",
    "nav.overview": "总览", "nav.checkout": "快速开单",
    "nav.booking": "预约管理", "nav.orders": "订单管理",
    "nav.members": "会员管理", "nav.reports": "营业报表",
    "nav.promotion": "优惠营销", "nav.settings": "系统设置",
    "booking.currentStore": "三合堂001店",
    "booking.todayBookings": "今日预约",
    "booking.completed": "已完成",
    "booking.pending": "待消费",
    "booking.records": "预约记录",
    "booking.board": "预约看板",
    "booking.data": "预约数据",
    "booking.staff": "可约员工",
    "booking.params": "预约参数",
    "booking.all": "全部",
    "booking.pendingConfirm": "待确认",
    "booking.confirmed": "已确认",
    "booking.cancelled": "已取消",
    "booking.expired": "已过期",
    "booking.dateRange": "日期范围",
    "booking.query": "查询",
    "booking.export": "导出",
    "booking.print": "打印",
    "booking.addBooking": "新增预约",
    "booking.bookingTime": "预约时间",
    "booking.bookingItem": "预约项目",
    "booking.room": "房间",
    "booking.customer": "预约顾客",
    "booking.method": "预约方式",
    "booking.paymentStatus": "线上支付状态",
    "booking.createdAt": "创建日期",
    "booking.remarks": "备注",
    "booking.action": "操作",
    "booking.show": "显示",
    "booking.perPage": "条/页",
    "booking.pageInfo": "共 {total} 条，第 {page}/{pages} 页",
    "booking.cancel": "取消",
    "booking.edit": "修改",
    "booking.service": "服务",
    "booking.searchPlaceholder": "顾客姓名 / 手机号",
    "booking.staffSearchPlaceholder": "搜索员工姓名",
    "booking.expandAll": "展开所有子项",
    "booking.specialPromo": "特推单",
    "booking.rejected": "已拒绝",
    "booking.closed": "已关闭",
    "booking.unassigned": "未分配",
    "booking.staff1": "传达",
    "booking.staff2": "主餐师",
    "booking.staff3": "店员",
    "booking.staff4": "前台",
    "booking.staff5": "厨房操作",
    "booking.byProject": "按项目",
    "booking.byStaff": "按员工",
    "booking.totalBookings": "预约总数",
    "booking.overdue": "超时预约",
    "booking.conversion": "转化率",
    "booking.project": "项目",
    "booking.sort": "排序",
    "booking.staffName": "员工姓名",
    "booking.keyProject": "关键顾客项目",
    "booking.store": "所属门店",
    "booking.addStaff": "添加员工",
    "booking.globalParams": "全局参数",
    "booking.storeParams": "门店参数",
    "booking.basicParams": "基础参数设置",
    "booking.interval": "预约时间间隔",
    "booking.reminder": "预约提醒",
    "booking.remindBefore": "提前",
    "booking.hours": "小时",
    "booking.minutes": "分钟",
    "booking.editContent": "编辑提醒内容",
    "booking.remindFirstBefore": "第一次：提前",
    "booking.remindSecondBefore": "第二次：提前",
    "booking.days": "天",
    "booking.reminderHint": "支持变量：{customer} 顾客姓名、{time} 预约时间、{items} 预约项目",
    "booking.recordLimit": "预约记录",
    "booking.limitPerDay": "每人每天最多",
    "booking.records": "条预约记录",
    "booking.allowOvertime": "允许预约超过营业时间",
    "booking.allowMultiItem": "允许选择多个项目",
    "booking.businessHours": "营业时间",
    "booking.weekday": "工作日",
    "booking.weekend": "周末",
    "booking.onlineParams": "线上预约参数设置",
    "booking.enableOnline": "开启门店线上预约",
    "booking.switchStore": "预约可切换店铺",
    "booking.switchStoreDesc": "开启则客户小程序预约可自主切换店铺(含访客及会员)",
    "booking.modeService": "约服务",
    "booking.modeServiceDesc": "可基于服务项目安排预约（先选服务再选时间）",
    "booking.modeTime": "约时间",
    "booking.modeTimeDesc": "可基于自己空闲时间安排预约（先选时间再选服务）",
    "booking.modeStaff": "约员工",
    "booking.modeStaffDesc": "可基于自己熟悉的员工安排预约（先选员工再选服务时间）",
    "booking.onlineInterface": "线上预约界面",
    "booking.showServices": "显示服务项目",
    "booking.showTime": "显示预约时段",
    "booking.showStaff": "显示可约员工",
    "booking.modifyTime": "修改预约时间",
    "booking.bookingMode": "预约模式",
    "booking.simpleMode": "简约模式",
    "booking.simpleModeDesc": "无需排班",
    "booking.availableDays": "可约天数",
    "booking.mon": "周一", "booking.tue": "周二", "booking.wed": "周三", "booking.thu": "周四",
    "booking.fri": "周五", "booking.sat": "周六", "booking.sun": "周日",
    "booking.occDurationRule": "客户占用时长规则",
    "booking.occDurationRuleDesc": "设置客户在店内的固定占用时长，作为预约时间槽的分配依据",
    "booking.multiItemDuration": "多项目同时预约时长",
    "booking.multiAccumulate": "累加",
    "booking.multiParallel": "并行",
    "booking.multiItemDurationDesc": "选择多个项目时，预约时长为各项目时长累加或按最长项目计算",
    "booking.arrivalAllocationDesc": "同时到店人数上限，避免同一时段预约过多顾客",
    "booking.selectStaff": "选择",
    "booking.staffLimitDesc": "设置每位员工每个时段最多可接预约数，超出后该时段不可约",
    "booking.notification": "消息通知",
    "booking.smsNotify": "📱 短信通知",
    "booking.wechatNotify": "💬 微信通知",
    "booking.durationRule": "约单时长规则",
    "booking.durationExample": "（如：30分钟为一个约单时长）",
    "booking.serviceDuration": "服务时长计算",
    "booking.totalServiceTime": "所选项目的总服务时长为每个约单时长",
    "booking.maxSelectedTime": "选中的最大时长为每个约单时长",
    "booking.arrivalAllocation": "到店分配人数",
    "booking.perSlot": "每个时段可分配",
    "booking.people": "人",
    "booking.staffLimit": "员工接单上限",
    "booking.maxPerStaff": "每位员工最多可接",
    "booking.orders": "单",
    "booking.staffReminder": "员工提醒",
    "booking.sendReminder": "发送提醒",
  };
  const bookingEn = {
    brand: "Cashier System", admin: "Admin", storeName: "Flagship Store",
    "nav.overview": "Overview", "nav.checkout": "Checkout",
    "nav.booking": "Booking", "nav.orders": "Orders",
    "nav.members": "Members", "nav.reports": "Reports",
    "nav.promotion": "Promotions", "nav.settings": "Settings",
    "booking.currentStore": "Sanhe Hall Store 001",
    "booking.todayBookings": "Today",
    "booking.completed": "Completed",
    "booking.pending": "Pending",
    "booking.records": "Records",
    "booking.board": "Board",
    "booking.data": "Data",
    "booking.staff": "Staff",
    "booking.params": "Params",
    "booking.all": "All",
    "booking.pendingConfirm": "Pending",
    "booking.confirmed": "Confirmed",
    "booking.cancelled": "Cancelled",
    "booking.expired": "Expired",
    "booking.dateRange": "Date Range",
    "booking.query": "Search",
    "booking.export": "Export",
    "booking.print": "Print",
    "booking.addBooking": "New Booking",
    "booking.bookingTime": "Time",
    "booking.bookingItem": "Service",
    "booking.room": "Room",
    "booking.customer": "Customer",
    "booking.method": "Method",
    "booking.paymentStatus": "Payment",
    "booking.createdAt": "Created",
    "booking.remarks": "Notes",
    "booking.action": "Action",
    "booking.show": "Show",
    "booking.perPage": "/page",
    "booking.pageInfo": "{total} items, Page {page}/{pages}",
    "booking.cancel": "Cancel",
    "booking.edit": "Edit",
    "booking.service": "Serve",
    "booking.searchPlaceholder": "Customer name / phone",
    "booking.staffSearchPlaceholder": "Search staff name",
    "booking.expandAll": "Expand all items",
    "booking.specialPromo": "Promo",
    "booking.rejected": "Rejected",
    "booking.closed": "Closed",
    "booking.unassigned": "Unassigned",
    "booking.staff1": "Messenger",
    "booking.staff2": "Chef",
    "booking.staff3": "Clerk",
    "booking.staff4": "Front Desk",
    "booking.staff5": "Kitchen",
    "booking.byProject": "By Service",
    "booking.byStaff": "By Staff",
    "booking.totalBookings": "Total",
    "booking.overdue": "Overdue",
    "booking.conversion": "Conversion",
    "booking.project": "Service",
    "booking.sort": "Sort",
    "booking.staffName": "Staff Name",
    "booking.keyProject": "Key Project",
    "booking.store": "Store",
    "booking.addStaff": "Add Staff",
    "booking.globalParams": "Global",
    "booking.storeParams": "Store",
    "booking.basicParams": "Basic Settings",
    "booking.interval": "Booking Interval",
    "booking.reminder": "Reminder",
    "booking.remindBefore": "Remind",
    "booking.hours": "hour(s)",
    "booking.minutes": "min(s)",
    "booking.editContent": "Edit Content",
    "booking.remindFirstBefore": "1st: Remind",
    "booking.remindSecondBefore": "2nd: Remind",
    "booking.days": "day(s)",
    "booking.reminderHint": "Variables: {customer}, {time}, {items}",
    "booking.recordLimit": "Record Limit",
    "booking.limitPerDay": "Max per customer per day",
    "booking.records": "records",
    "booking.allowOvertime": "Allow overtime booking",
    "booking.allowMultiItem": "Allow multiple services",
    "booking.businessHours": "Business Hours",
    "booking.weekday": "Weekdays",
    "booking.weekend": "Weekends",
    "booking.onlineParams": "Online Booking",
    "booking.enableOnline": "Enable online booking",
    "booking.switchStore": "Allow store switching",
    "booking.switchStoreDesc": "Customer can switch stores in mini-app (visitors & members)",
    "booking.modeService": "By Service",
    "booking.modeServiceDesc": "Pick a service first, then choose time slot",
    "booking.modeTime": "By Time",
    "booking.modeTimeDesc": "Pick a free time slot first, then choose service",
    "booking.modeStaff": "By Staff",
    "booking.modeStaffDesc": "Pick a preferred staff member first, then choose service & time",
    "booking.onlineInterface": "Online Booking UI",
    "booking.showServices": "Show services",
    "booking.showTime": "Show time slots",
    "booking.showStaff": "Show staff",
    "booking.modifyTime": "Modify Time",
    "booking.bookingMode": "Booking Mode",
    "booking.simpleMode": "Simple Mode",
    "booking.simpleModeDesc": "No scheduling required",
    "booking.availableDays": "Available Days",
    "booking.mon": "Mon", "booking.tue": "Tue", "booking.wed": "Wed", "booking.thu": "Thu",
    "booking.fri": "Fri", "booking.sat": "Sat", "booking.sun": "Sun",
    "booking.occDurationRule": "Occupancy Duration",
    "booking.occDurationRuleDesc": "Set fixed occupancy duration per customer as time slot basis",
    "booking.multiItemDuration": "Multi-Service Duration",
    "booking.multiAccumulate": "Accumulate",
    "booking.multiParallel": "Parallel",
    "booking.multiItemDurationDesc": "When booking multiple services, duration is sum or max of service durations",
    "booking.arrivalAllocationDesc": "Max concurrent arrivals per time slot",
    "booking.selectStaff": "Select",
    "booking.staffLimitDesc": "Max bookings per staff per slot; slot disabled when exceeded",
    "booking.notification": "Notifications",
    "booking.smsNotify": "📱 SMS",
    "booking.wechatNotify": "💬 WeChat",
    "booking.durationRule": "Duration Rule",
    "booking.durationExample": "(e.g. 30min per slot)",
    "booking.serviceDuration": "Duration Calculation",
    "booking.totalServiceTime": "Total service time per slot",
    "booking.maxSelectedTime": "Max selected time per slot",
    "booking.arrivalAllocation": "Arrival Allocation",
    "booking.perSlot": "Per slot",
    "booking.people": "people",
    "booking.staffLimit": "Staff Limit",
    "booking.maxPerStaff": "Max per staff",
    "booking.orders": "order(s)",
    "booking.staffReminder": "Staff Reminder",
    "booking.sendReminder": "Send Reminder",
    "theme.title": "Switch Theme",
    "theme.auroraBlue": "Aurora Blue", "theme.twilightPurple": "Twilight Purple",
    "theme.tealGreen": "Teal Green", "theme.lavaOrange": "Lava Orange",
    "theme.deepBlue": "Deep Blue", "theme.royalPurple": "Royal Purple",
    "theme.forestGreen": "Forest Green", "theme.sunsetOrange": "Sunset Orange",
    "theme.golden": "Golden", "theme.festiveRed": "Festive Red",
    "theme.marble": "Marble", "theme.inkWash": "Ink Wash",
  };
  // Merge into global i18n
  Object.assign(i18n.zh, bookingZh);
  Object.assign(i18n.en, bookingEn);
})();

/* ========== State ========== */
// currentLang, currentTheme defined in app.js — no duplicate let here

/* ========== Mock Data ========== */
const bookingRecords = [
  { id: 'b1', time: '10:00', items: '大三通', room: '101房', staff: '传达', customer: 'Dave', phone: '10188956888', method: '线下', payment: '—', createdAt: '2026-04-26 01:22', remark: '', status: 'pending' },
  { id: 'b2', time: '10:30', items: '宫廷理筋', room: '102房', staff: '李医生', customer: '张三', phone: '91234567', method: '线上', payment: '已支付', createdAt: '2026-04-25 15:30', remark: '第一次来', status: 'confirmed' },
  { id: 'b3', time: '11:00', items: '针灸 + 拔罐', room: '103房', staff: '王医生', customer: '李四', phone: '98765432', method: '线下', payment: '—', createdAt: '2026-04-25 18:00', remark: '', status: 'confirmed' },
  { id: 'b4', time: '11:30', items: '脊柱正骨', room: '105房', staff: '张医生', customer: '王五', phone: '90001111', method: '线下', payment: '—', createdAt: '2026-04-25 20:00', remark: '腰部不适', status: 'pending' },
  { id: 'b5', time: '14:00', items: '艾条悬灸', room: '102房', staff: '自助', customer: '赵六', phone: '87654321', method: '线上', payment: '未支付', createdAt: '2026-04-26 08:00', remark: '', status: 'pending' },
  { id: 'b6', time: '15:00', items: '经络推拿', room: '101房', staff: '刘医生', customer: '陈七', phone: '85556666', method: '线下', payment: '—', createdAt: '2026-04-24 10:00', remark: '肩颈酸痛', status: 'completed' },
  { id: 'b7', time: '16:00', items: '拔罐', room: '105房', staff: '自助', customer: '周八', phone: '83334444', method: '线上', payment: '已支付', createdAt: '2026-04-23 12:00', remark: '', status: 'completed' },
  { id: 'b8', time: '17:00', items: '中频理疗', room: '103房', staff: '自助', customer: '吴九', phone: '81112222', method: '线下', payment: '—', createdAt: '2026-04-22 09:00', remark: '', status: 'cancelled' },
  { id: 'b9', time: '09:30', items: '电针治疗', room: '102房', staff: '王医生', customer: '郑十', phone: '89990000', method: '线上', payment: '已支付', createdAt: '2026-04-26 06:00', remark: '复诊', status: 'confirmed' },
  { id: 'b10', time: '13:00', items: '火龙罐', room: '101房', staff: '李医生', customer: 'Dave', phone: '10188956888', method: '线下', payment: '—', createdAt: '2026-04-25 22:00', remark: '', status: 'pending' },
  { id: 'b11', time: '14:30', items: '全身放松推拿', room: '103房', staff: '张医生', customer: '张三', phone: '91234567', method: '线上', payment: '未支付', createdAt: '2026-04-26 07:30', remark: '2人', status: 'pending' },
  { id: 'b12', time: '18:00', items: '隔姜灸', room: '102房', staff: '自助', customer: '李四', phone: '98765432', method: '线下', payment: '—', createdAt: '2026-04-26 09:00', remark: '', status: 'confirmed' },
  { id: 'b13', time: '19:00', items: '头皮针', room: '105房', staff: '李医生', customer: '王五', phone: '90001111', method: '线上', payment: '已支付', createdAt: '2026-04-25 14:00', remark: '', status: 'confirmed' },
  { id: 'b14', time: '20:00', items: '走罐', room: '101房', staff: '自助', customer: '赵六', phone: '87654321', method: '线下', payment: '—', createdAt: '2026-04-26 10:00', remark: '', status: 'expired' },
  { id: 'b15', time: '20:30', items: '督脉灸', room: '103房', staff: '李医生', customer: '陈七', phone: '85556666', method: '线上', payment: '未支付', createdAt: '2026-04-26 11:00', remark: '', status: 'expired' },
];

const staffList = [
  { id: 's1', sort: 1, name: '店工', keyProject: '—', store: '三合堂001店' },
  { id: 's2', sort: 2, name: '王小虎', keyProject: '宫廷理筋', store: '三合堂001店' },
  { id: 's3', sort: 3, name: '周杰', keyProject: '脊柱正骨', store: '三合堂001店' },
  { id: 's4', sort: 4, name: '雨后', keyProject: '—', store: '三合堂001店' },
  { id: 's5', sort: 5, name: '温馨树', keyProject: '经络推拿', store: '三合堂001店' },
  { id: 's6', sort: 6, name: '小熊', keyProject: '—', store: '三合堂001店' },
  { id: 's7', sort: 7, name: '打扫组', keyProject: '—', store: '三合堂001店' },
  { id: 's8', sort: 8, name: '小六', keyProject: '拔罐', store: '三合堂001店' },
];

const bookingDataByProject = [
  { name: '大三通', total: 1, completed: 0, overdue: 1, cancelled: 0, conversion: '0%' },
  { name: '宫廷理筋', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '针灸', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '拔罐', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '脊柱正骨', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '艾条悬灸', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '经络推拿', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '电针治疗', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
];

const bookingDataByStaff = [
  { name: '店工', total: 41, completed: 1, overdue: 40, cancelled: 0, conversion: '2%' },
  { name: '王小虎', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '周杰', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '雨后', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '温馨树', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '小熊', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '打扫组', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
  { name: '小六', total: 0, completed: 0, overdue: 0, cancelled: 0, conversion: '0%' },
];

// ====== 房间/床位数据 ======
const boardRooms = [
  { id: 'room-101', name: '101房', beds: [{ id: 'bed-101-1', name: '1床' }] },
  { id: 'room-102', name: '102房', beds: [{ id: 'bed-102-1', name: '1床' }] },
  { id: 'room-103', name: '103房', beds: [{ id: 'bed-103-1', name: '1床' }, { id: 'bed-103-2', name: '2床' }] },
  { id: 'room-lobby', name: '大堂', beds: [{ id: 'bed-lobby-1', name: '散座' }] },
];

// ====== 员工列 ======
const boardStaff = ['未分配', '传达', '主餐师', '店员', '前台', '厨房操作', '小龟', '许聪聪', '小六'];

// ====== 看板卡片数据 ======
let boardCards = [
  { time: '10:00', staff: '传达', customer: 'Dave', phone: '10188956888', location: '101房', duration: 60, items: '大三通' },
  { time: '10:30', staff: '主餐师', customer: '张三', phone: '91234567', location: '102房', duration: 90, items: '宫廷理筋' },
  { time: '11:00', staff: '前台', customer: '李四', phone: '98765432', location: '103房', duration: 60, items: '针灸 + 拔罐' },
  { time: '13:00', staff: '店员', customer: '王五', phone: '90001111', location: '大堂', duration: 30, items: '拔罐' },
  { time: '14:00', staff: '传达', customer: '赵六', phone: '87654321', location: '101房', duration: 60, items: '脊柱正骨' },
  { time: '15:00', staff: '小龟', customer: '陈七', phone: '85556666', location: '105房', duration: 90, items: '经络推拿' },
];

// ====== 看板列定义（房间列 + 员工列） ======
// Build columns: [room1_bed1, room1_bed2, room2_bed1, ..., staff1, staff2, ...]
function buildBoardColumns() {
  const cols = [];
  boardRooms.forEach(room => {
    room.beds.forEach(bed => {
      cols.push({ type: 'room', roomId: room.id, bedId: bed.id, label: `${room.name} ${bed.name}`, roomName: room.name });
    });
  });
  boardStaff.forEach(staff => {
    cols.push({ type: 'staff', staffId: staff, label: staff });
  });
  return cols;
}
// Board columns will be rebuilt after room/staff data is loaded

// Interval from booking params (default 30 minutes)
let bookingInterval = 30; // minutes. In real app would read from params UI

// Generate time slots based on interval
function generateTimeSlots(interval) {
  const slots = [];
  for (let h = 10; h <= 16; h++) {
    for (let m = 0; m < 60; m += interval) {
      if (h === 16 && m > 0) break;
      const t = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
      slots.push(t);
    }
  }
  return slots;
}
let timeSlots = generateTimeSlots(bookingInterval);

function getEndTime(startTime, durationMinutes) {
  const [h, m] = startTime.split(':').map(Number);
  const totalMin = h * 60 + m + durationMinutes;
  return `${String(Math.floor(totalMin / 60)).padStart(2,'0')}:${String(totalMin % 60).padStart(2,'0')}`;
}

// ====== 看板预约数据（新模型） ======
// Each appointment can have multiple staff and a single room (with bed)
// {
//   id, customer, phone, startTime, duration, items,
//   staffs: ['传达', '主餐师'],
//   roomId: 'room-101', bedId: 'bed-101-1',
//   status: 'pending'
// }
let boardAppointments = [
  { id: 'ap1', customer: 'Dave', phone: '10189906888', startTime: '10:00', duration: 60, items: '全身按摩推拿', staffs: ['传达'], roomId: 'room-101', bedId: 'bed-101-1', status: 'pending' },
];

// ====== 新增预约 Modal State ======
let tempBookingTime = '';
let bookingIdCounter = 16;
let _boardCardFormDirty = false;

// ====== 新增预约表单验证 & 提交 ======
function openNewBookingDialog(timeSlot) {
  tempBookingTime = timeSlot || '';
  document.getElementById('bookingModal').classList.add('open');
  document.getElementById('bookingModalOverlay').classList.add('open');
  // Pre-fill time if coming from board
  if (timeSlot) {
    document.getElementById('modalBookingTime').value = timeSlot;
  } else {
    // Default to next available slot
    const now = new Date();
    const nextHour = `${now.getHours().toString().padStart(2,'0')}:${Math.floor(now.getMinutes() / 30) * 30}`;
    document.getElementById('modalBookingTime').value = nextHour;
  }
}

function closeNewBookingDialog() {
  document.getElementById('bookingModal').classList.remove('open');
  document.getElementById('bookingModalOverlay').classList.remove('open');
  tempBookingTime = '';
}

function submitNewBooking() {
  const time = document.getElementById('modalBookingTime').value;
  const customer = document.getElementById('modalCustomer').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();
  const items = document.getElementById('modalItems').value.trim();
  const room = document.getElementById('modalRoom').value.trim();
  const staff = document.getElementById('modalStaff').value;
  const method = document.getElementById('modalMethod').value;
  const remark = document.getElementById('modalRemark').value.trim();
  const duration = parseInt(document.getElementById('modalDuration').value) || 30;

  // Validation
  if (!time) { alert('请选择预约时间'); return; }
  if (!customer) { alert('请输入顾客姓名'); return; }
  if (!phone) { alert('请输入手机号'); return; }

  // Create new booking record
  const now = new Date();
  const dateStr = now.toISOString().slice(0,10);
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
  const newRecord = {
    id: `b${bookingIdCounter++}`,
    time: time,
    items: items || '—',
    room: room || '—',
    staff: staff || '未分配',
    customer: customer,
    phone: phone,
    method: method || '线下',
    payment: '—',
    createdAt: `${dateStr} ${timeStr}`,
    remark: remark || '',
    status: 'pending',
    duration: duration
  };

  // Add to booking records
  bookingRecords.unshift(newRecord);

  // Add to board cards
  boardCards.push({
    time: time,
    staff: staff || '未分配',
    customer: customer,
    phone: phone,
    location: room || '',
    duration: duration,
    items: items
  });

  // Re-render current view
  const activeTab = document.querySelector('.sub-nav-item.active');
  if (activeTab) {
    const tabName = activeTab.dataset.tab;
    if (tabName === 'records') {
      renderBookingRecords('all');
      updateGlobalStats();
    } else if (tabName === 'board') {
      renderBoard();
    }
  }

  // Update global stats
  updateGlobalStats();

  closeNewBookingDialog();
  // Refresh records if on records tab
  renderBookingRecords('all');
}

function updateGlobalStats() {
  const total = bookingRecords.length;
  const completed = bookingRecords.filter(r => r.status === 'completed').length;
  const pending = bookingRecords.filter(r => r.status === 'pending' || r.status === 'confirmed').length;
  document.querySelector('.global-bar-right').innerHTML = `
    <span class="global-stat">📅 <span data-i18n="booking.todayBookings">今日预约</span>: <strong>${total}</strong></span>
    <span class="global-stat">✅ <span data-i18n="booking.completed">已完成</span>: <strong>${completed}</strong></span>
    <span class="global-stat">⏳ <span data-i18n="booking.pending">待消费</span>: <strong>${pending}</strong></span>
  `;
}

// ====== 看板详情弹窗 ======
function showBoardApptDetail(apptId) {
  const appt = boardAppointments.find(a => a.id === apptId);
  if (!appt) return;

  document.getElementById('detailCustomer').textContent = appt.customer;
  document.getElementById('detailPhone').textContent = appt.phone;
  const endTime = getEndTime(appt.startTime, appt.duration);
  document.getElementById('detailTime').textContent = `${appt.startTime} - ${endTime} (${appt.duration}分钟)`;
  document.getElementById('detailStaff').textContent = appt.staffs.join(', ');
  document.getElementById('detailItems').textContent = appt.items || '—';

  const room = boardRooms.find(r => r.id === appt.roomId);
  const roomName = room ? room.name : (appt.roomId || '—');
  const bed = room ? (room.beds.find(b => b.id === appt.bedId)?.name || '') : '';
  document.getElementById('detailLocation').textContent = appt.roomId ? `${roomName} ${bed}` : '—';

  document.getElementById('detailModal').dataset.apptId = apptId;
  document.getElementById('detailModal').classList.add('open');
  document.getElementById('detailOverlay').classList.add('open');
}

function closeBoardApptDetail() {
  document.getElementById('detailModal').classList.remove('open');
  document.getElementById('detailOverlay').classList.remove('open');
}

function openBoardApptEdit(apptId) {
  const appt = boardAppointments.find(a => a.id === apptId);
  if (!appt) return;

  document.getElementById('editCustomer').value = appt.customer;
  document.getElementById('editPhone').value = appt.phone;
  document.getElementById('editTime').value = appt.startTime;
  document.getElementById('editDuration').value = appt.duration;
  document.getElementById('editItems').value = appt.items || '';

  // Staff multi-select
  const staffSel = document.getElementById('editStaff');
  if (staffSel) {
    Array.from(staffSel.options).forEach(opt => { opt.selected = appt.staffs.includes(opt.value); });
  }
  // Room select
  const roomSel = document.getElementById('editRoom');
  if (roomSel) roomSel.value = appt.roomId || '';
  const bedSel = document.getElementById('editBed');
  if (bedSel) bedSel.value = appt.bedId || '';

  _boardCardFormDirty = false;
  document.querySelectorAll('#editModal .form-input, #editModal select.form-input').forEach(el => {
    el.removeEventListener('change', () => { _boardCardFormDirty = true; });
    el.removeEventListener('input', () => { _boardCardFormDirty = true; });
    el.addEventListener('change', () => { _boardCardFormDirty = true; });
    el.addEventListener('input', () => { _boardCardFormDirty = true; });
  });

  closeBoardApptDetail();
  document.getElementById('editModal').classList.add('open');
  document.getElementById('editOverlay').classList.add('open');
}

function _cleanupEditListeners() {
  document.querySelectorAll('#editModal .form-input, #editModal select.form-input').forEach(el => {
    el.removeEventListener('change', () => { _boardCardFormDirty = true; });
    el.removeEventListener('input', () => { _boardCardFormDirty = true; });
  });
}

function closeBoardCardEdit(force) {
  if (!force && _boardCardFormDirty) {
    if (!confirm('未保存的更改将丢失，确定关闭吗？')) return;
  }
  _cleanupEditListeners();
  document.getElementById('editModal').classList.remove('open');
  document.getElementById('editOverlay').classList.remove('open');
  _boardCardFormDirty = false;
}

function submitBoardCardEdit() {
  const customer = document.getElementById('editCustomer').value.trim();
  const phone = document.getElementById('editPhone').value.trim();
  const startTime = document.getElementById('editTime').value;
  const duration = parseInt(document.getElementById('editDuration').value) || 30;
  const items = document.getElementById('editItems').value.trim() || '—';

  if (!customer) { alert('顾客姓名不能为空'); return; }
  if (!phone) { alert('手机号不能为空'); return; }

  const staffSel = document.getElementById('editStaff');
  const staffs = staffSel ? Array.from(staffSel.selectedOptions).map(o => o.value) : [];
  const roomId = document.getElementById('editRoom')?.value || '';
  const bedId = document.getElementById('editBed')?.value || '';

  // Find which appointment was being edited
  const apptId = document.getElementById('detailModal').dataset.apptId;
  const idx = boardAppointments.findIndex(a => a.id === apptId);
  if (idx >= 0) {
    boardAppointments[idx] = { ...boardAppointments[idx], customer, phone, startTime, duration, items, staffs, roomId, bedId };
  }

  _cleanupEditListeners();
  document.getElementById('editModal').classList.remove('open');
  document.getElementById('editOverlay').classList.remove('open');
  _boardCardFormDirty = false;
  renderBoard();
  renderBookingRecords('all');
  updateGlobalStats();
  showToast('预约已更新', 'success');
}

// ====== Render Board ======
function renderBoard() {
  const body = document.getElementById('boardTimelineBody');
  if (!body) return;

  const columns = buildBoardColumns();

  // Render header
  const header = document.querySelector('.board-timeline-header');
  if (header) {
    header.innerHTML = `<div class="time-col-header"></div>
      ${columns.map(c => `<div class="staff-col-header" title="${c.type === 'room' ? '房间' : '员工'}">${c.label}</div>`).join('')}`;
  }

  body.innerHTML = timeSlots.map((time, ti) => {
    const cells = columns.map(col => {
      const appts = boardAppointments.filter(a => {
        if (col.type === 'room') {
          return a.roomId === col.roomId && a.bedId === col.bedId && isTimeInRange(a, time);
        } else {
          return a.staffs.includes(col.staffId) && isTimeInRange(a, time);
        }
      });

      if (appts.length === 0) {
        return `<div class="time-slot" onclick="openNewBookingDialog('${time}')"></div>`;
      }

      const a = appts[0];
      const isFirstSlot = a.startTime === time;
      if (!isFirstSlot) return '';

      const endTime = getEndTime(a.startTime, a.duration);
      const slotCount = Math.max(1, Math.round(a.duration / bookingInterval));
      const style = slotCount > 1 ? ` style="grid-row: span ${slotCount};"` : '';

      return `<div class="time-slot"${style}>
        <div class="booking-card"
             onclick="showBoardApptDetail('${a.id}')"
             ondblclick="openBoardApptEdit('${a.id}')"
             title="单击查看详情，双击编辑">
          <div class="card-time-range">${a.startTime}-${endTime}</div>
          <div class="customer-name">${a.customer}</div>
          <div class="customer-phone">${a.phone}</div>
          ${a.items && a.items !== '—' ? `<div class="card-items">${a.items}</div>` : ''}
        </div>
      </div>`;
    }).filter(h => h !== '').join('');

    if (!cells) return '';
    return `<div class="time-row">
      <div class="time-label">${time}</div>
      ${cells}
    </div>`;
  }).filter(r => r !== '').join('');
}

function isTimeInRange(appt, slotTime) {
  const startIdx = timeSlots.indexOf(appt.startTime);
  if (startIdx === -1) return false;
  const slotCount = Math.max(1, Math.round(appt.duration / bookingInterval));
  const slotIdx = timeSlots.indexOf(slotTime);
  return slotIdx >= startIdx && slotIdx < startIdx + slotCount;
}

/* ========== Init ========== */
function initBooking() {
  renderI18n('zh');
  setTheme('aurora-blue');
  switchBookingTab('records');
}

/* ========== Tab Switching ========== */
function switchBookingTab(tabName) {
  document.querySelectorAll('.sub-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabName);
  });
  document.querySelectorAll('.booking-tab-content').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabName);
  });

  // Render content based on tab
  switch(tabName) {
    case 'records': renderBookingRecords('all'); break;
    case 'board': renderBoard(); break;
    case 'data': renderDataTable('project'); break;
    case 'staff': renderStaffTable(); break;
    case 'params': break; // Static HTML
  }
}

function switchSubTab(parentTab, subTab) {
  // For records tab (status filter)
  if (parentTab === 'records') {
    document.querySelectorAll('.booking-tab-content[data-tab="records"] .tab-btn').forEach(el => {
      el.classList.remove('active');
    });
    const clickedBtn = event.target;
    clickedBtn.classList.add('active');
    renderBookingRecords(subTab);
  }

  // For params tab (global/store)
  if (parentTab === 'params') {
    document.querySelectorAll('.booking-tab-content[data-tab="params"] .tab-btn').forEach(el => {
      el.classList.remove('active');
    });
    const clickedBtn = event.target;
    clickedBtn.classList.add('active');

    document.querySelectorAll('.params-content').forEach(el => {
      el.classList.toggle('active', el.dataset.subtab === subTab);
    });
  }
}

function switchDataView(view) {
  document.querySelectorAll('.booking-tab-content[data-tab="data"] .tab-btn').forEach(el => {
    el.classList.remove('active');
  });
  const clickedBtn = event.target;
  clickedBtn.classList.add('active');
  renderDataTable(view);
}

/* ========== Render Booking Records (Tab 1) ========== */
function renderBookingRecords(statusFilter) {
  const tbody = document.getElementById('bookingTableBody');
  const filtered = statusFilter === 'all'
    ? bookingRecords
    : bookingRecords.filter(r => r.status === statusFilter);

  const statusLabels = {
    pending: '待确认', confirmed: '已确认',
    completed: '已完成', cancelled: '已取消', expired: '已过期'
  };

  const statusLabelsEn = {
    pending: 'Pending', confirmed: 'Confirmed',
    completed: 'Completed', cancelled: 'Cancelled', expired: 'Expired'
  };

  tbody.innerHTML = filtered.map(r => {
    const label = currentLang === 'zh' ? statusLabels[r.status] : statusLabelsEn[r.status];
    return `
      <tr>
        <td>${r.time}</td>
        <td>${r.items}</td>
        <td>${r.room}</td>
        <td>${r.staff}</td>
        <td>${r.customer}<br/><span style="font-size:11px;color:var(--text-tertiary)">${r.phone}</span></td>
        <td>${r.method}</td>
        <td>${r.payment}</td>
        <td>${r.createdAt}</td>
        <td>${r.remark || '—'}</td>
        <td>
          <span class="status-tag ${r.status}">${label}</span>
          <div style="margin-top:4px">
            <span class="action-link" onclick="editBooking('${r.id}')">${currentLang === 'zh' ? '修改' : 'Edit'}</span>
            <span class="action-link danger" onclick="cancelBooking('${r.id}')">${currentLang === 'zh' ? '取消' : 'Cancel'}</span>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--text-tertiary)">
      ${currentLang === 'zh' ? '暂无预约记录' : 'No booking records'}
    </td></tr>`;
  }

  // Update page info
  const pageInfo = document.querySelector('.page-info');
  if (pageInfo) {
    const text = currentLang === 'zh'
      ? `共 ${filtered.length} 条，第 1/1 页`
      : `${filtered.length} items, Page 1/1`;
    pageInfo.textContent = text;
  }
}

/* ========== Render Board (Tab 2) ========== */
function renderBoard() {
  const body = document.getElementById('boardTimelineBody');
  // Build a map of which time slots are occupied by multi-slot bookings
  const occupiedSlots = {}; // 'time:staff' -> { card, startCol }
  const multiSlotCards = {}; // cardId -> { time: '10:00', staff: '传达', colspan: 3 }

  boardCards.forEach(c => {
    const slots = Math.max(1, Math.round((c.duration || 30) / bookingInterval));
  });

  body.innerHTML = timeSlots.map((time, ti) => {
    const cols = boardStaff.map((staff, si) => {
      // Find cards at this exact time+staff
      const cards = boardCards.filter(c => {
        // Check if this card's time range covers this slot
        const startIdx = timeSlots.indexOf(c.time);
        if (startIdx === -1) return false;
        const slotCount = Math.max(1, Math.round((c.duration || 30) / bookingInterval));
        const endIdx = startIdx + slotCount - 1;
        return (ti >= startIdx && ti <= endIdx && c.staff === staff);
      });

      // Only render in the first slot of multi-slot cards, skip occupied later slots
      const isOccupied = boardCards.some(c => {
        const startIdx = timeSlots.indexOf(c.time);
        if (startIdx === -1) return false;
        const slotCount = Math.max(1, Math.round((c.duration || 30) / bookingInterval));
        return (ti > startIdx && ti < startIdx + slotCount && c.staff === staff);
      });

      if (isOccupied) return ''; // Skip this cell, will be covered by rowspan-like approach

      if (cards.length === 0) {
        return `<div class="time-slot" onclick="openNewBookingDialog('${time}')"></div>`;
      }

      // Get the card that starts here
      const card = cards[0];
      const slotCount = Math.max(1, Math.round((card.duration || 30) / bookingInterval));
      const cardId = `${card.time}:${card.staff}:${card.customer}`;
      const endTime = getEndTime(card.time, card.duration || 30);
      const style = slotCount > 1 ? ` style="grid-row: span ${slotCount};"` : '';

      return `<div class="time-slot"${style}>
        <div class="booking-card"
             onclick="showBoardCardDetail('${cardId}','${card.time}','${card.staff}')"
             ondblclick="openBoardCardEdit('${card.time}','${card.staff}')"
             title="单击查看详情，双击编辑">
          <div class="card-time-range">${card.time}-${endTime}</div>
          <div class="customer-name">${card.customer}</div>
          <div class="customer-phone">${card.phone}</div>
          ${card.items && card.items !== '—' ? `<div class="card-items">${card.items}</div>` : ''}
        </div>
      </div>`;
    }).filter(h => h !== '').join('');

    if (!cols) return ''; // Skip row if fully occupied
    return `<div class="time-row">
      <div class="time-label">${time}</div>
      ${cols}
    </div>`;
  }).filter(r => r !== '').join('');
}

/* ========== Render Data Table (Tab 3) ========== */
function renderDataTable(view) {
  const tbody = document.getElementById('dataTableBody');
  const data = view === 'project' ? bookingDataByProject : bookingDataByStaff;

  tbody.innerHTML = data.map(d => `
    <tr>
      <td>${d.name}</td>
      <td>${d.total}</td>
      <td>${d.completed}</td>
      <td>${d.overdue}</td>
      <td>${d.cancelled}</td>
      <td>${d.conversion}</td>
    </tr>
  `).join('');
}

/* ========== Render Staff Table (Tab 4) ========== */
function renderStaffTable() {
  const tbody = document.getElementById('staffTableBody');
  tbody.innerHTML = staffList.map(s => `
    <tr>
      <td>${s.sort}</td>
      <td>${s.name}</td>
      <td>${s.keyProject}</td>
      <td>${s.store}</td>
      <td>
        <span class="action-link" onclick="editStaff('${s.id}')">${currentLang === 'zh' ? '修改' : 'Edit'}</span>
        <span class="action-link danger" onclick="removeStaff('${s.id}')">${currentLang === 'zh' ? '删除' : 'Delete'}</span>
      </td>
    </tr>
  `).join('');
}

/* ========== Actions ========== */
function searchRecords() {
  showToast(currentLang === 'zh' ? '正在查询...' : 'Searching...', 'info');
}

function exportRecords() {
  showToast(currentLang === 'zh' ? '正在导出...' : 'Exporting...', 'info');
}

function printRecords() {
  showToast(currentLang === 'zh' ? '正在打印...' : 'Printing...', 'info');
}

function addBooking() {
  openNewBookingDialog('');
}

function editBooking(id) {
  showToast(`${currentLang === 'zh' ? '修改预约' : 'Edit Booking'} #${id}`, 'info');
}

function cancelBooking(id) {
  showToast(`${currentLang === 'zh' ? '已取消预约' : 'Booking Cancelled'} #${id}`, 'info');
}

function searchStaff() {
  showToast(currentLang === 'zh' ? '正在搜索...' : 'Searching...', 'info');
}

function addStaff() {
  showToast(currentLang === 'zh' ? '打开添加员工弹窗' : 'Add Staff Dialog', 'success');
}

function editStaff(id) {
  showToast(`${currentLang === 'zh' ? '修改员工' : 'Edit Staff'} #${id}`, 'info');
}

function removeStaff(id) {
  showToast(`${currentLang === 'zh' ? '已删除员工' : 'Staff Removed'} #${id}`, 'info');
}

function editReminderContent() {
  // 读取当前选择的提醒时间，更新弹窗标题
  const days = document.querySelector('.reminder-days')?.value || '2';
  const hours = document.querySelector('.reminder-hours')?.value || '5';
  const firstTitle = document.querySelector('.reminder-content-section:first-child .reminder-section-title');
  const secondTitle = document.querySelector('.reminder-content-section:last-child .reminder-section-title');
  if (firstTitle) firstTitle.innerHTML = `📬 ${currentLang === 'zh' ? `第一次提醒（提前${days}天）` : `1st Reminder (${days} day(s) before)`}`;
  if (secondTitle) secondTitle.innerHTML = `📩 ${currentLang === 'zh' ? `第二次提醒（提前${hours}小时）` : `2nd Reminder (${hours} hour(s) before)`}`;

  document.getElementById('reminderContentModal').classList.add('open');
  document.getElementById('reminderContentOverlay').classList.add('open');
}

function closeReminderContentDialog() {
  document.getElementById('reminderContentModal').classList.remove('open');
  document.getElementById('reminderContentOverlay').classList.remove('open');
}

/* ========== 参数读取 ========== */
/**
 * getBookingParams() - 读取预约参数页面上所有参数项的当前值
 * 返回一个对象，供预约看板、新增预约等模块调用
 *
 * 用法示例：
 *   const params = getBookingParams();
 *   console.log(params.interval);    // 15
 *   console.log(params.enableOnline); // true/false
 *   console.log(params.bizHours.weekdayStart); // "09:00"
 */
function getBookingParams() {
  const params = {};

  // 基础参数
  const intervalEl = document.getElementById('paramInterval');
  if (intervalEl) params.interval = parseInt(intervalEl.value) || 15;

  const recordLimitEl = document.getElementById('paramRecordLimit');
  if (recordLimitEl) params.recordLimit = parseInt(recordLimitEl.value) || 2;

  const allowMultiItemEl = document.getElementById('paramAllowMultiItem');
  if (allowMultiItemEl) params.allowMultiItem = allowMultiItemEl.checked;

  const allowOvertimeEl = document.getElementById('paramAllowOvertime');
  if (allowOvertimeEl) params.allowOvertime = allowOvertimeEl.checked;

  // 线上预约参数
  const enableOnlineEl = document.getElementById('paramEnableOnline');
  if (enableOnlineEl) params.enableOnline = enableOnlineEl.checked;

  const switchStoreEl = document.getElementById('paramSwitchStore');
  if (switchStoreEl) params.switchStore = switchStoreEl.checked;

  // 线上预约模式（radio）
  const modeEl = document.querySelector('input[name="onlineMode"]:checked');
  if (modeEl) params.onlineMode = modeEl.value; // 'service' | 'time' | 'staff'

  // 预约提醒
  const reminderDaysEl = document.querySelector('.reminder-days');
  if (reminderDaysEl) params.reminderDays = parseInt(reminderDaysEl.value) || 2;

  const reminderHoursEl = document.querySelector('.reminder-hours');
  if (reminderHoursEl) params.reminderHours = parseInt(reminderHoursEl.value) || 5;

  // 已保存的提醒内容
  if (window._reminderContents) {
    params.reminderContents = window._reminderContents;
  }

  // 营业时间
  const weekdayStartEl = document.getElementById('bizWeekdayStart');
  const weekdayEndEl = document.getElementById('bizWeekdayEnd');
  const weekendStartEl = document.getElementById('bizWeekendStart');
  const weekendEndEl = document.getElementById('bizWeekendEnd');

  params.bizHours = {};
  if (weekdayStartEl) params.bizHours.weekdayStart = weekdayStartEl.value;
  if (weekdayEndEl) params.bizHours.weekdayEnd = weekdayEndEl.value;
  if (weekendStartEl) params.bizHours.weekendStart = weekendStartEl.value;
  if (weekendEndEl) params.bizHours.weekendEnd = weekendEndEl.value;

  return params;
}

/* ========== 参数联动：间隔变化后重新生成看板时间槽 ========== */
document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'paramInterval') {
    const interval = parseInt(e.target.value) || 15;
    bookingInterval = interval;
    timeSlots = generateTimeSlots(interval);
    const activeTab = document.querySelector('.sub-nav-item.active');
    if (activeTab && activeTab.dataset.tab === 'board') {
      renderBoard();
    }
  }
});

function saveReminderContent() {
  const firstCN = document.getElementById('reminderContentFirstCN').value.trim();
  const firstEN = document.getElementById('reminderContentFirstEN').value.trim();
  const secondCN = document.getElementById('reminderContentSecondCN').value.trim();
  const secondEN = document.getElementById('reminderContentSecondEN').value.trim();
  // 保存到全局变量，供后续发送提醒使用
  window._reminderContents = {
    first: { zh: firstCN, en: firstEN },
    second: { zh: secondCN, en: secondEN }
  };
  closeReminderContentDialog();
  showToast(currentLang === 'zh' ? '提醒内容已保存' : 'Reminder content saved', 'success');
}

function modifyBookingTime() {
  showToast(currentLang === 'zh' ? '修改预约时间设置' : 'Modify Booking Time', 'info');
}

function sendStaffReminder() {
  showToast(currentLang === 'zh' ? '已发送提醒' : 'Reminder Sent', 'success');
}

/* ========== Toast ========== */
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.booking-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'booking-toast';
  toast.style.cssText = `
    position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
    background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-danger)' : 'var(--color-primary)'};
    color: #fff; padding: 10px 20px; border-radius: 8px;
    font-size: 14px; font-weight: 500; z-index: 9999;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    animation: fadeInDown 0.3s ease;
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
  // Re-render dynamic content
  const activeTab = document.querySelector('.sub-nav-item.active');
  if (activeTab) switchBookingTab(activeTab.dataset.tab);
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
function navigate(el) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
}

/* ========== Init ========== */
document.addEventListener('DOMContentLoaded', initBooking);
