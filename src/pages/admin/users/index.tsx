import { useState } from "react";
import UsersForm from "../../../widgets/admin/usersForm";
import UsersList from "../../../widgets/admin/usersList";
import { Wrapper } from "./styled";

export default function Users() {
  const [isFormVisible, setFormVisibility] = useState<boolean>(false);
  const [isButtonsVisible, setButtonsVisibility] = useState<boolean>(false);

  function changeFormVisibility(prop: boolean) {
    setFormVisibility(prop);
  }

  function changeButtonsVisibility(prop: boolean) {
    setButtonsVisibility(prop);
  }
  return (
    <Wrapper>
      <UsersList
        changeFormVisibility={changeFormVisibility}
        changeButtonsVisibility={changeButtonsVisibility}
      />
      <UsersForm
        isFormVisible={isFormVisible}
        isButtonsVisible={isButtonsVisible}
        changeFormVisibility={changeFormVisibility}
      />
    </Wrapper>
  );
}
