var isDevelopment = process.env.NODE_ENV === 'development'

var logError = function (error) {
  if (isDevelopment) {
    console.group('safeCompose')
    console.error(error)
    console.groupEnd('safeCompose')
  }
}

var safeCompose = function () {
  var fns = arguments

  return function (data) {
    if (!fns.length) {
      logError('At least one function is required')

      return
    }

    var hasError = false
    var output = data
    var index = fns.length - 1

    while (index >= 0) {
      var fn = fns[index]

      if (index === 0) {
        if (typeof fn === 'function') {
          try {
            return fn(hasError ? undefined : output)
          } catch (error) {
            logError(error)

            return
          }
        }

        return hasError || fns.length === 1 ? fn : output
      }

      try {
        output = fn(output)
      } catch (error) {
        logError(error)

        hasError = true
      }

      index = hasError ? 0 : index - 1
    }
  }
}

module.exports = safeCompose
