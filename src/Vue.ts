import { Compile } from './core/Compile';
import { observe } from './core/observe';
import { VueOption } from './core/VueOption';

/**
 * Vue
 */
// tslint:disable-next-line:no-default-export
export default class Vue {
  /**
   * 属性
   */
  public data!: { [key: string]: any };

  /**
   * 方法
   */
  public methods?: any;

  public $el: HTMLElement | null;

  private el!: string | HTMLElement;

  constructor(options: VueOption) {
    this.data = options.data || {};
    this.el = options.el;
    this.methods = options.methods;

    Object.keys(this.data).forEach((key: string) => {
      this.proxyKeys(key); // 将Vue.data[key] = '' 的调用方式改成 Vue[key] = ''
    });

    observe(this.data);
    const compile = new Compile(this.el, this);
    this.$el = compile.el;
    if (options.mounted) {
      options.mounted.call(this);
    }
  }

  private proxyKeys(key: string) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: () => {
        return this.data[key];
      },
      set: (newValue: any) => {
        this.data[key] = newValue;
      }
    });
  }
}
