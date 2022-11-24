import EventEmitter from 'events'
import SampleListener from '../listeners/SampleListener'
import SampleEvent from '../events/SampleEvent'
import { IEvent } from '../types/local'
import Logger from '../utils/Logger'

class Event extends EventEmitter {
  private events: IEvent[] = [
    {
      event: SampleEvent,
      listeners: [SampleListener],
    },
  ]

  private registerListeners(name: string, listener: any): void {
    if (listener) {
      const _listener = new listener()
      if (typeof _listener.handle === 'function') {
        this.on(name, (data) => {
          _listener.handle(data)
        })
      }
    }
  }

  public registerEvents(): void {
    try {
      if (this.events) {
        this.events.forEach((event) => {
          if (event.event && event.listeners) {
            const _event = event.event
            const _eventConstName = _event.name
            event.listeners.forEach((listener) =>
              this.registerListeners(_eventConstName, listener)
            )
          }
        })
      }
    } catch (error) {
      Logger.error(error)
    }
  }

  public dispatch(event: unknown) {
    if (event) {
      this.emit(event.constructor.name, event)
    }
  }
}

export default new Event()
