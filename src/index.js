var logError = require('./log-error')

var safeCompose = function () {
  var args = arguments

  return function (data) {
    if (!args.length) {
      logError('At least one function is required')

      return
    }

    var output = data
    var index = args.length - 1

    while (index >= 0) {
      var arg = args[index]

      try {
        if (index === 0) {
          if (typeof arg === 'function') return arg(output)

          return output === undefined || args.length === 1 ? arg : output
        }

        output = arg(output)
      } catch (error) {
        output = undefined

        logError(error)
      }

      index -= 1
    }
  }
}

module.exports = safeCompose
