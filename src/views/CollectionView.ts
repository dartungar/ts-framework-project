import { Collection } from "../models/Collection";
import { Model } from "../models/Model";

export abstract class CollectionView<T, K> {
  abstract renderItem(model: T, itemParent: Element): void;
  constructor(
    protected parentElement: Element,
    protected collection: Collection<T, K>
  ) {}

  render(): void {
    this.parentElement.innerHTML = "";
    this.collection.models.forEach((model: T): void => {
      const elementDiv = document.createElement("div");
      this.parentElement.appendChild(elementDiv);
      this.renderItem(model, elementDiv);
    });
  }
}
