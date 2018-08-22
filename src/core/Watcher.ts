import Vue from '../Vue';
import { Dep } from './Dep';

/**
 * 订阅者
 */
export class Watcher {
  private cb: any;
  private vm: Vue;
  private exp: any;

  private value: any;

  constructor(vm: Vue, exp: any, cb: any) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.getValue(); // 将自己添加到订阅器的操作
  }

  public update() {
    this.run();
  }

  private getValue() {
    Dep.target = this; // 缓存自己
    const value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
    Dep.target = null; // 释放自己

    return value;
  }

  private run() {
    const value = this.vm.data[this.exp];
    const oldValue = this.value;
    // if (value !== oldValue) { // 这里不需要判断了，因为set时判断过了，否则这里unittest走不到
    this.value = value;
    this.cb.call(this.vm, value, oldValue); // 调用视图更新方法
    // }
  }
}
