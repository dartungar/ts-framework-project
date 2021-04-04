import { IUserProps, User } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, IUserProps> {
  template(): string {
    return `
        <div>
            <h1>User</h1>
            <p>Name: ${this.model.get("name")}</p>
            <p>Age: ${this.model.get("age")}</p>
        </div>
        `;
  }
}
