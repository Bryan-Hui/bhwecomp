let systemInfo: WechatMiniprogram.SystemInfo;

// get system info
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}
