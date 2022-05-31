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
  size?: WindowFrameworkInit
}

/**
 * App框架初始化描述
 * @param w 初始化宽度
 * @param h 初始化高度
 * @param isFullViewPort 是否占满全屏(不隐藏StatusBar)
 * @param isClosable 是否可关闭
 * @param isMinimizable 是否可最小化
 * @param isMaximizable 是否可最大化
 */
export interface WindowFrameworkInit {
  w: number,
  h: number,
  // isFullViewPort: boolean,
  // isClosable: boolean,
  // isMinimizable: boolean,
  // isMaximizable: boolean
}

/**
 * app实例
 */
export interface appInstance extends appDescriber {
  componentInstance: any
}
