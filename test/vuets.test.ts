import Vue from '../src/vuets'

/**
 * Vue test
 */
describe('Vue test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Vue is instantiable', () => {
    expect(new Vue()).toBeInstanceOf(Vue)
  })
})
