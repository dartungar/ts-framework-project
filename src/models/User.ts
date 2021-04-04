import { EventManager } from "./EventManager";
import { Model } from "./Model";
import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";

export interface IUserProps {
  id?: number;
  name?: string;
  age?: number;
}

export const BASE_URL = "http://localhost:3000/users";

// User model
export class User extends Model<IUserProps> {
  static buildUser(attrs: IUserProps): User {
    return new User(
      new EventManager(),
      new ApiSync<IUserProps>(BASE_URL),
      new Attributes<IUserProps>(attrs)
    );
  }

  static buildCollection(): Collection<User, IUserProps> {
    return new Collection<User, IUserProps>(BASE_URL, (json: IUserProps) =>
      User.buildUser(json)
    );
  }

  setRandomAge = (): void => {
    const age = Math.floor(Math.random() * 100);
    this.set({ age });
  };
}
