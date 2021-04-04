import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";

//const usr = User.buildUser({ name: "Ragnar Lothbrok", age: 35 });
const usrCollection = User.buildCollection();
usrCollection.fetch();

const rootElement = document.getElementById("root");
setTimeout(() => {
  if (rootElement) {
    const userList = new UserList(rootElement, usrCollection);
    userList.render();
    console.log(userList);
  } else throw new Error("Root element not found");
}, 3000);
