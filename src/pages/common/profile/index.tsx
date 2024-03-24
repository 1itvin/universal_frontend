import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { signOut } from "../../../features/auth/authSlice";
import { ButtonDefault } from "../../../shared/globalStyles";
import { Container, InfoText, InfoTitle, Title, Wrapper } from "./styled";

export default function Profile() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(user);

  function handleSignOut() {
    dispatch(signOut());
    navigate("/signin");
  }

  return (
    <Wrapper>
      <Title>Данные аккаунта</Title>
      <Container>
        <InfoTitle>Email пользователя</InfoTitle>
        <InfoText>{user?.email}</InfoText>
      </Container>
      <Container>
        <InfoTitle>Роли пользователя</InfoTitle>
        <InfoText>
          {user!.roles!.length > 0
            ? user?.roles.map((role) => role.description).join(", ")
            : "Нет ролей"}
        </InfoText>
      </Container>
      <ButtonDefault onClick={handleSignOut} $marginTop="0">
        Выйти из аккаунта
      </ButtonDefault>
    </Wrapper>
  );
}
