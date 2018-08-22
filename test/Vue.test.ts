import Vue from '../src/Vue';

/**
 * Vue test
 */
describe('Vue test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('basic usage', () => {
    const el = document.createElement('div');
    el.innerHTML = '<span>{{message}}</span>';
    const vm = new Vue({
      el: el,
      data: { message: 'hello world' }
    });
    expect(vm.$el.tagName).toBe('DIV');
    expect(vm.$el.textContent).toBe(vm['message']);
    vm['message'] = 'hi';
    expect(vm.$el.textContent).toBe('hi');
  });

  it('warn cannot find element', () => {
    new Vue({ el: '#non-existent' });
    expect('DOM元素不存在!').toHaveBeenWarned();
  });

  it('advance usage', () => {
    const el = document.createElement('div');
    el.id = 'app';
    el.innerHTML = `
    <h2>{{title}}</h2>
    <input id="txtName" v-model="name">
    <h1>{{name}}</h1>
    <button id="btnClick" v-on:click="clickMe">click me!</button>
`;
    const vm = new Vue({
      el: el,
      data: {
        title: 'hello world',
        name: 'canfoo'
      },
      methods: {
        clickMe: function() {
          this.title = 'hello world';
        }
      }
    });
    const button = vm.$el.querySelector('#btnClick');
    button['click']();
    expect(vm.$el.innerHTML).toContain('hello world');
    vm['title'] = 'hello world';
    expect(vm.$el.innerHTML).toContain('hello world');
    const input = vm.$el.querySelector('#txtName');
    input['value'] = 'haha';
    input.dispatchEvent(
      new Event('input', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(vm.$el.innerHTML).toContain('haha');
    input['value'] = 'haha';
    input.dispatchEvent(
      new Event('input', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(vm.$el.innerHTML).toContain('haha');
  });
});
