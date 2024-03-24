import { useState } from "react";
import { Wrapper } from "./styled";
import RolesForm from "../../../widgets/admin/rolesForm";
import RolesList from "../../../widgets/admin/rolesList";

export default function Roles() {
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
      <RolesList
        changeFormVisibility={changeFormVisibility}
        changeButtonsVisibility={changeButtonsVisibility}
      />
      <RolesForm
        isFormVisible={isFormVisible}
        isButtonsVisible={isButtonsVisible}
        changeFormVisibility={changeFormVisibility}
      />
    </Wrapper>
  );
}
