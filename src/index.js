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

    var output = data
    var index = args.length - 1

    while (index >= 0) {
      var arg = args[index]

      if (index === 0) {
        if (typeof arg === 'function') {
          try {
            return arg(output)
          } catch (error) {
            logError(error)

            return
          }
        }

        return output === undefined || args.length === 1 ? arg : output
      }

      try {
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
