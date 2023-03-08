export interface MenuItem {
  type: number,
  name?: string | number,
  action?: string | number,
  children?: any
}

export interface MenuOffsetStyle {
  marginLeft?: string
  marginRight?: string,
  marginTop?: string,
  marginBottom?: string
}

export interface BarItem {
  name: string,
  items?: MenuItem
}

export const AppleMenuItems: Array<MenuItem> = [
  {type: 0, name: '关于本机', action: '114'},
  {type: 1},
  {type: 0, name: '系统偏好设置', action: '514'},
  {type: 0, name: 'App Store...', action: ''},
  {type: 1},
  {type: 2, name: '最近使用的项目', children: []},
  {type: 1},
  {type: 0, name: '睡眠', action: ''},
  {type: 0, name: '重新启动...', action: ''},
  {type: 0, name: '关机...', action: ''},
  {type: 1},
  {type: 0, name: '锁定屏幕', action: ''},
  {type: 0, name: '退出登录"田所浩二"...', action: ''},
]
