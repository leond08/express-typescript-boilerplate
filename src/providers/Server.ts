import { Application } from 'express'
import http from 'http'
import Config from './Config'

class Server {
  private server: http.Server = http.createServer()
  private port: number = Config.config().port

  private onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(this.port + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(this.port + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }

  start(express: Application) {
    this.server = http.createServer(express)
    this.server.listen(this.port)
    this.server.on('error', this.onError)
    this.server.on('listening', () =>
      console.log('Listening on port ' + this.port)
    )
  }
}

export default new Server()
