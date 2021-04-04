import { Model } from "../models/Model";
import { IUserProps, User } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, IUserProps> {
  eventsMap(): { [keys: string]: () => void } {
    return {
      "click:.set-name": this.onClickSetNameBtn,
      "click:.set-age": this.onClickSetAgeBtn,
      "click:.save": this.onClickSaveBtn,
    };
  }
  onClickSetNameBtn = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      this.model.set({ name: input.value });
    }
  };

  onClickSetAgeBtn = (): void => {
    this.model.setRandomAge();
  };

  onClickSaveBtn = (): void => {
    this.model.save();
  };

  template(): string {
    return `
        <div>
            <input id="name-input" placeholder="${this.model.get(
              "name"
            )}"></input>
            <button class="set-name">set name</button>
            <button class="save">save</button>
            <button class="set-age">set random age</button>
        </div>
        `;
  }
}
