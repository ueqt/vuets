let asserted

function createCompareFn(spy) {
  const hasWarned = msg => {
    var count = spy.calls.count()
    var args
    while (count--) {
      args = spy.calls.argsFor(count)
      if (args.some(containsMsg)) {
        return true
      }
    }
    return false

    function containsMsg(arg) {
      return arg.toString().indexOf(msg) > -1
    }
  }

  return {
    compare: msg => {
      asserted = asserted.concat(msg)
      var warned = Array.isArray(msg)
        ? msg.some(hasWarned)
        : hasWarned(msg)
      return {
        pass: warned,
        message: warned
          ? 'Expected message "' + msg + '" not to have been warned'
          : 'Expected message "' + msg + '" to have been warned'
      }
    }
  }
}

global.beforeEach(() => {
  asserted = []
  spyOn(console, 'log')
  spyOn(console, 'warn')
  spyOn(console, 'error')
  jasmine.addMatchers({
    toHaveBeenLogged: () => createCompareFn(console.log),
    toHaveBeenWarned: () => createCompareFn(console.error),
    toHaveBeenTipped: () => createCompareFn(console.warn)
  })
});