/**
 * app初始化描述器
 * @param name Dock及默认标题栏的显示名
 * @param appName app名，应为唯一
 * @param titleName 标题栏显示名 可选
 */
export interface appDescriber {
  name: string,
  appName: string,
  titleName?: string,
}

/**
 * app实例
 */
export interface appInstance extends appDescriber {
  componentInstance: any
}
