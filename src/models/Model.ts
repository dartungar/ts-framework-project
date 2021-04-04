import { AxiosPromise, AxiosResponse } from "axios";
import { Callback } from "./EventManager";

export interface IModelProps<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(newProps: T): void;
}

export interface IEventManager {
  events: { [key: string]: Callback[] };
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export interface ISync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface IHasId {
  id?: number;
}

// General model
export class Model<T extends IHasId> {
  constructor(
    private events: IEventManager,
    private sync: ISync<T>,
    private attributes: IModelProps<T>
  ) {}

  get get() {
    return this.attributes.get;
  }

  getAll(): T {
    return this.attributes.getAll();
  }

  set(data: T): void {
    this.attributes.set(data);
    this.events.trigger("change");
  }

  get on() {
    return this.events.on;
  }

  trigger(eventName: string): void {
    this.events.trigger(eventName);
  }

  save(): void {
    const data = this.attributes.getAll();
    this.sync
      .save(data)
      .then((resp: AxiosResponse): void => {
        this.trigger("save");
        console.log("saved info");
      })
      .catch((reason): void => {
        this.trigger("error");
      });
  }

  fetch(): void {
    const id = this.get("id");
    // костыль
    if (typeof id === "number") {
      this.sync
        .fetch(id)
        .then((resp: AxiosResponse): void => {
          this.set(resp.data);
          console.log("fetched info");
        })
        .catch((reason): void => console.log("error saving info"));
    } else {
      throw new Error("Must provide valid numeric ID");
    }
  }
}
