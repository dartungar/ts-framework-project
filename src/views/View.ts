import { Model } from "../models/Model";

export abstract class View<T extends Model<M>, M> {
  abstract template(): string;
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, protected model: T) {
    this.bindModel();
  }

  eventsMap(): { [keys: string]: () => void } {
    return {};
  }

  regionsMap(): { [keys: string]: string } {
    return {};
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [event, selector] = eventKey.split(":");
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(event, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) this.regions[key] = element;
    }
  }

  onRender(): void {}

  render(): void {
    const newElement = document.createElement("template");
    newElement.innerHTML = this.template();
    this.bindEvents(newElement.content);
    this.mapRegions(newElement.content);
    this.parent.innerHTML = "";
    this.onRender();
    this.parent.append(newElement.content);
  }
}
