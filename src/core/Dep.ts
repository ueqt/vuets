import { Watcher } from './Watcher';

/**
 * 消息订阅器
 */
export class Dep {
  /**
   * 目标
   */
  public static target: Watcher | null = null;

  /**
   * 子项
   */
  private subs: Watcher[] = [];

  /**
   * 添加子项
   * @param sub 子项
   */
  public addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  /**
   * 通知
   */
  public notify() {
    this.subs.forEach((sub: Watcher) => {
      sub.update(); // 通知更新方法
    });
  }
}
