import { Collection } from "../models/Collection";
import { IUserProps, User } from "../models/User";
import { CollectionView } from "./CollectionView";
import { UserEdit } from "./UserEdit";

export class UserList extends CollectionView<User, IUserProps> {
  renderItem(model: User, itemParent: Element) {
    const item = new UserEdit(itemParent, model);
    item.render();
  }
}
