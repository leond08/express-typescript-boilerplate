import Logger from '../utils/Logger'

class HandleException {
  public process() {
    process.on('uncaughtException', (exception) => {
      Logger.error(exception)
    })

    process.on('unhandledRejection', (exception) => {
      Logger.error(exception)
    })
  }
}

export default new HandleException()
