type Handler = (payload: any) => void

export class EventBus {
  private handlers: Record<string, Handler[]> = {}

  subscribe(event: string, handler: Handler) {
    if (!this.handlers[event]) {
      this.handlers[event] = []
    }

    this.handlers[event].push(handler)
  }

  publish(event: string, payload: any) {
    this.handlers[event]?.forEach(h => h(payload))
  }
}