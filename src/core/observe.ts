import { Dep } from './Dep';

/**
 * 监听器
 */

/**
 * 递归遍历所有子属性设置监听器
 * @param data 数据
 */
export function observe(data: any) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach((key: string) => {
    defineReactive(data, key);
  });
}

function defineReactive(data: any, key: string) {
  let value = data[key];
  observe(value);
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      if (Dep.target) {
        // 判断是否需要添加订阅者
        dep.addSub(Dep.target); // 在这里添加一个订阅者
      }

      return value;
    },
    set: (newValue: any) => {
      if (value === newValue) {
        return;
      }
      value = newValue;
      console.log(`属性${key}已经被监听了，现在值为：“${newValue.toString()}”`);
      dep.notify(); // 如果数据变化，通知所有订阅者
    }
  });
}
