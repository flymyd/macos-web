export interface DockItem {
  name: string,
  appName: string,
  icon: string,
  action: string | Function,
  isOpen?: boolean,
  showDot?: boolean
}