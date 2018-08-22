/// <reference path="helpers/testSetup.d.ts" />
import { observe } from '../src/core/observe'

describe('测试observe功能', () => {
  it('observe方法测试', () => {
    var library = {
      book1: {
        name: ''
      },
      book2: ''
    }
    observe(library)

    console.log['calls'].reset()
    library.book1.name = 'vue权威指南'
    expect('属性name已经被监听了，现在值为：“vue权威指南”').toHaveBeenLogged()

    console.log['calls'].reset()
    library.book1.name = 'vue权威指南'
    expect('属性name已经被监听了，现在值为：“vue权威指南”').not.toHaveBeenLogged()

    console.log['calls'].reset()
    library.book2 = '没有此书籍'
    expect('属性book2已经被监听了，现在值为：“没有此书籍”').toHaveBeenLogged()
  })
})
