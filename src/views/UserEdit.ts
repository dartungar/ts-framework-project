import { IUserProps, User } from "../models/User";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { View } from "./View";

export class UserEdit extends View<User, IUserProps> {
  template(): string {
    return `
        <div>
            <div class="user-show"></div>
            <div class="user-form"></div>
        </div>
        `;
  }

  regionsMap(): { [key: string]: string } {
    return {
      UserShow: ".user-show",
      UserForm: ".user-form",
    };
  }

  onRender(): void {
    const userShow = new UserShow(this.regions["UserShow"], this.model);
    const userForm = new UserForm(this.regions["UserForm"], this.model);
    userShow.render();
    userForm.render();
  }
}
