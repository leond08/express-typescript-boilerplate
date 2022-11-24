import Logger from '../utils/Logger'

class SampleListener {
  handle(data: unknown): void {
    Logger.info(`Sample Listener ${data}`)
  }
}

export default SampleListener
