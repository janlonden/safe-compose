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

    while (index > -1) {
      var fn = fns[index]

      if (index === 0) {
        if (hasError) {
          if (typeof fn === 'function') {
            try {
              return fn(undefined)
            } catch (error) {
              logError(error)

              return
            }
          }

          return fn
        }

        try {
          if (typeof fn === 'function') {
            return fn(output)
          }

          if (fns.length === 1) {
            return fn
          }

          return output
        } catch (error) {
          logError(error)

          return
        }
      }

      try {
        output = fn(output)
      } catch (error) {
        logError(error)

        hasError = true
        index = 0

        continue
      }

      index -= 1
    }

    return output
  }
}

module.exports = safeCompose
