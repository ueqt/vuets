import Vue from '../Vue'
import { Watcher } from './Watcher'

/**
 * 指令解析器
 */
export class Compile {
  /**
   * DOM元素
   */
  public el: HTMLElement | null
  /**
   * ViewModel
   */
  private vm: Vue

  private fragment!: DocumentFragment

  constructor(el: string | HTMLElement, vm: Vue) {
    this.vm = vm
    if (el instanceof HTMLElement) {
      this.el = el
    } else {
      this.el = document.querySelector(el)
    }
    this.init()
  }

  private init() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el)
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    } else {
      console.error('DOM元素不存在!')
    }
  }

  /**
   * 将DOM元素写入fragment中
   * @param el DOM元素
   */
  private nodeToFragment(el: HTMLElement): DocumentFragment {
    const fragment = document.createDocumentFragment()
    let child = el.firstChild
    while (child) {
      // 将DOM元素移入fragment中
      fragment.appendChild(child)
      child = el.firstChild
    }

    return fragment
  }

  private compileElement(el: Node) {
    const childNodes = el.childNodes
    ;[].slice.call(childNodes).forEach((node: Node) => {
      const reg = /\{\{(.*)\}\}/
      const text = node.textContent || ''

      if (this.isElementNode(node)) {
        this.compile(<HTMLElement>node)
      } else if (this.isTextNode(node) && reg.test(text)) {
        // 判断是否符合{{}}
        this.compileText(node, (<RegExpExecArray>reg.exec(text))[1])
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node) // 继续递归遍历子节点
      }
    })
  }

  private compile(node: HTMLElement) {
    const nodeAttrs = node.attributes
    Array.prototype.forEach.call(nodeAttrs, (attr: Attr) => {
      const attrName = attr.name
      if (this.isDirective(attrName)) {
        const exp = attr.value
        const dir = attrName.substring(2)
        if (this.isEventDirective(dir)) {
          // 事件指令
          this.compileEvent(node, this.vm, exp, dir)
        } else {
          // v-model 指令
          this.compileModel(node, this.vm, exp, dir)
        }
        node.removeAttribute(attrName)
      }
    })
  }

  private compileText(node: Node, exp: string) {
    const initText = this.vm.data[exp]
    this.updateText(node, initText) // 将初始化的数据初始化到视图中
    const watcher = new Watcher(this.vm, exp, (value: any) => {
      this.updateText(node, value)
    })
  }

  private compileEvent(node: Node, vm: Vue, exp: string, dir: string) {
    const eventType = dir.split(':')[1]
    const cb = vm.methods && vm.methods[exp]

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false)
    }
  }

  private compileModel(node: Node, vm: Vue, exp: string, dir: string) {
    let val = this.vm.data[exp]
    this.modelUpdater(node, val)
    const watcher = new Watcher(this.vm, exp, (value: any) => {
      this.modelUpdater(node, value)
    })

    node.addEventListener('input', (e: any) => {
      const newValue = e.target.value
      if (val === newValue) {
        return
      }
      this.vm.data[exp] = newValue
      val = newValue
    })
  }

  private updateText(node: Node, value?: string) {
    node.textContent = value || ''
  }

  private modelUpdater(node: any, value: any) {
    node.value = value || ''
  }

  private isDirective(attr: string) {
    return attr.indexOf('v-') === 0
  }

  private isEventDirective(dir: string) {
    return dir.indexOf('on:') === 0
  }

  private isElementNode(node: Node) {
    return node.nodeType === 1
  }

  private isTextNode(node: Node) {
    return node.nodeType === 3
  }
}
