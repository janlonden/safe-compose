var isDevelopment = process.env.NODE_ENV === 'development'

var logError = function (error) {
  if (isDevelopment) {
    console.groupCollapsed('%c safeCompose', 'color: #eb4034')
    console.error(error)
    console.groupEnd('safeCompose')
  }
}

module.exports = logError
