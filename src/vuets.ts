import { Config } from './core/config'

/**
 * Vue
 */
export default class Vue {
  /**
   * 配置
   */
  public static config: Config

  /**
   * 当前 View Model 的uid
   */
  private _uid = 0

  /**
   * 全局uid计数
   */
  private static uid = 0

  constructor(options?: any) {
    this.init(options)
  }

  private init(options?: any) {
    const vm = this
    vm._uid = Vue.uid++
  }
}
