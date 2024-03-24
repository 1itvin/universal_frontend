import { useNavigate } from "react-router";
import { Container, ErrorText, Title } from "./styled";
import { ButtonDefault } from "../../../shared/globalStyles";
import { useAppSelector } from "../../../app/store/hooks";

export default function ErrorBlock() {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  function buttonHandler() {
    user?.roles.find((role) => role.value === "ADMIN")
      ? navigate("/users")
      : navigate("/profile");
  }

  return (
    <Container>
      <Title>Ошибка!</Title>
      <ErrorText>Что-то пошло не так...</ErrorText>
      <ButtonDefault onClick={buttonHandler}>
        Вернуться на главную
      </ButtonDefault>
    </Container>
  );
}
