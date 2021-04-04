import axios, { AxiosResponse } from "axios";
import { EventManager } from "./EventManager";

export class Collection<T, K> {
  models: T[] = [];
  events: EventManager = new EventManager();

  constructor(public url: string, public deserializer: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.url).then((resp: AxiosResponse): void => {
      const data: K[] = resp.data;
      const newModels = [];
      for (let d of data) {
        newModels.push(this.deserializer(d));
      }
      this.models = newModels;
      this.trigger("change");
      console.log("fetched users collection");
    });
  }
}
