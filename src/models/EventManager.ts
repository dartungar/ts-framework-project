export type Callback = () => void;

export class EventManager {
  public events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const events = this.events[eventName];
    if (events) {
      events.forEach((callback: Callback): void => {
        callback();
      });
    }
  };
}
