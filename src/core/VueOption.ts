import Vue from '../Vue'

/**
 * Vue配置项
 * https://cn.vuejs.org/v2/api
 */
export class VueOption {
  //#region 数据

  /**
   * Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化。
   * 对象必须是纯粹的对象 (含有零个或多个的 key/value 对)：浏览器 API 创建的原生对象，原型上的属性会被忽略。
   * 大概来说，data 应该只能是数据 - 不推荐观察拥有状态行为的对象。
   *
   * 一旦观察过，不需要再次在数据对象上添加响应式属性。因此推荐在创建实例之前，就声明所有的根级响应式属性。
   *
   * 实例创建之后，可以通过 vm.$data 访问原始数据对象。
   * Vue 实例也代理了 data 对象上所有的属性，因此访问 vm.a 等价于访问 vm.$data.a。
   *
   * 以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。
   * 你可以使用例如 vm.$data._property 的方式访问这些属性。
   *
   * 当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。
   * 如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，
   * 每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。
   *
   * 如果需要，可以通过将 vm.$data 传入 JSON.parse(JSON.stringify(...)) 得到深拷贝的原始数据对象。
   */
  public data?: { [key: string]: any }

  /**
   * props 可以是数组或对象，用于接收来自父组件的数据。
   * props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。
   */
  public props?: string[] | object

  /**
   * 创建实例时传递 props。主要作用是方便测试。
   */
  public propsData?: { [key: string]: object }

  /**
   * 计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
   */
  public computed?: { [key: string]: Function }

  /**
   * methods 将被混入到 Vue 实例中。
   * 可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。
   * 方法中的 this 自动绑定为 Vue 实例。
   */
  public methods?: { [key: string]: Function }

  /**
   * 一个对象，键是需要观察的表达式，值是对应回调函数。
   * 值也可以是方法名，或者包含选项的对象。
   * Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。
   */
  public watch?: { [key: string]: string | Function | object | object[] }

  //#endregion 数据

  //#region DOM

  /**
   * 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。
   *
   * 在实例挂载之后，元素可以用 vm.$el 访问。
   *
   * 如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。
   */
  public el!: string | HTMLElement

  /**
   * 一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。
   *
   * 如果值以 # 开始，则它将被用作选择符，并使用匹配元素的 innerHTML 作为模板。
   * 常用的技巧是用 <script type="x-template"> 包含模板。
   */
  public template?: string

  /**
   * 字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。
   * 该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。
   *
   * 如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。
   */
  // public render?: (createElement: () => Vnode) => Vnode;

  //#endregion DOM

  //#region 资源

  /**
   * 包含 Vue 实例可用指令的哈希表。
   */
  public directives?: object

  /**
   * 包含 Vue 实例可用组件的哈希表。
   */
  public components?: object

  /**
   * 包含 Vue 实例可用过滤器的哈希表。
   */
  public filters?: object

  //#endregion 资源

  //#region 组合

  /**
   * 指定已创建的实例之父实例，在两者之间建立父子关系。
   * 子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中。
   */
  public parent?: Vue

  //#endregion 组合

  //#region 其它

  /**
   * 允许组件模板递归地调用自身。注意，组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。
   *
   * 指定 name 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。
   * 另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。
   * 通过提供 name 选项，可以获得更有语义信息的组件树。
   */
  public name?: string

  //#endregion 其它

  //#region 生命周期钩子

  /**
   * 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
   */
  public beforeCreate?(): void

  /**
   * 在实例创建完成后被立即调用。
   * 在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
   * 然而，挂载阶段还没开始，el 属性目前不可见。
   */
  public created?(): void

  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  public beforeMount?(): void

  /**
   * el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
   *
   * 注意 mounted 不会承诺所有的子组件也都一起被挂载。
   * 如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted：
   */
  public mounted?(): void

  /**
   * 数据更新时调用，发生在虚拟 DOM 打补丁之前。
   * 这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
   */
  public beforeUpdate?(): void

  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   *
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   * 然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
   *
   * 注意 updated 不会承诺所有的子组件也都一起被重绘。
   * 如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated：
   */
  public updated?(): void

  /**
   * keep-alive 组件激活时调用。
   */
  public activated?(): void

  /**
   * keep-alive 组件停用时调用。
   */
  public deactivated?(): void

  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  public beforeDestroy?(): void

  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  public destroyed?(): void

  //#endregion 生命周期钩子
}
