/// <reference path="helpers/testSetup.d.ts" />

import Vue from '../src/Vue'

describe('测试lifecycle功能', () => {
  describe('mounted', () => {
    it('should have mounted', () => {
      const el = document.createElement('div')
      const vm = new Vue({
        el: el,
        mounted: function() {
          expect(this.$el.tagName).toBe('DIV')
        }
      })
    })
  })
})
