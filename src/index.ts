type EventType = string | symbol;
type EventHandler<TEvent> = (event: TEvent) => void;
type Events<TEvent> = Map<EventType, Array<EventHandler<TEvent>>>;

export const EventEmitter = <TEvent = unknown>(events?: Events<TEvent>) => {
  const all: Events<TEvent> = events ?? new Map();

  return {
    all,
    on: (type: EventType, handler: EventHandler<TEvent>) => {
      const handlers = all.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler]);
      }
    },
    off: (type: EventType, handler?: EventHandler<TEvent>) => {
      const handlers = all.get(type);
      if (!handlers) return;
      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      } else {
        all.set(type, []);
      }
    },
    emit: (type: EventType, event: TEvent) => {
      all.get(type)?.forEach((handler) => handler(event));
    },
  };
};

const ee = EventEmitter<string>();

ee.on("start", (message) => {
  console.log(message);
});

ee.emit("start", "helloworld!");
