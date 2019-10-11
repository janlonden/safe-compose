var isDevelopment = process.env.NODE_ENV === 'development'

var logError = function (error) {
  if (isDevelopment) {
    console.group('safeCompose')
    console.error(error)
    console.groupEnd('safeCompose')
  }
}

var safeCompose = function () {
  var args = arguments

  return function (data) {
    if (!args.length) {
      logError('At least one function is required')

      return
    }

    return (function recur (output, index) {
      var arg = args[index]

      try {
        if (index > 0) return recur(arg(output), index - 1)
        if (typeof arg === 'function') return arg(output)

        return output === undefined || args.length === 1 ? arg : output
      } catch (error) {
        logError(error)

        return recur(undefined, index - 1)
      }
    })(data, args.length - 1)
  }
}

module.exports = safeCompose
