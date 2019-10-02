var isDevelopment = process.env.NODE_ENV === 'development'

var logError = function (error) {
  if (isDevelopment) {
    console.group('safe')
    console.error(error)
    console.groupEnd('safe')
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

          return output
        } catch (error) {
          logError(error)

          return
        }
      }

      if (hasError) {
        index -= 1

        continue
      }

      try {
        output = fn(output)
      } catch (error) {
        logError(error)

        hasError = true
      }

      index -= 1
    }

    return output
  }
}

module.exports = safeCompose
