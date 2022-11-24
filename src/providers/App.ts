import Event from './Event'
import Express from './Express'
import Server from './Server'

class App {
  public boostrap() {
    Event.registerEvents()
    Server.start(Express.init())
  }
}

export default new App()
