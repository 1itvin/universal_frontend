import { useAppSelector } from "../../../app/store/hooks";
import { Outlet, useNavigate } from "react-router";
import { Container, ErrorText, Title } from "./styled";
import { ButtonDefault } from "../../../shared/globalStyles";

interface IProps {
  authRoutes?: boolean;
  onlyAdminRoutes?: boolean;
  commonRoutes?: boolean;
}

export default function ProtectedRoute({
  authRoutes,
  onlyAdminRoutes,
  commonRoutes,
}: IProps) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  function buttonHandlerSignIn() {
    navigate("/signin");
  }

  function buttonHandler() {
    user?.roles.find((role) => role.value === "ADMIN")
      ? navigate("/users")
      : navigate("/profile");
  }

  if (authRoutes) {
    return user ? (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>Вы уже авторизованы</ErrorText>
        <ButtonDefault onClick={buttonHandler}>
          Вернуться на главную
        </ButtonDefault>
      </Container>
    ) : (
      <Outlet />
    );
  }
  if (onlyAdminRoutes) {
    return user?.roles.find((role) => role.value === "ADMIN") ? (
      <Outlet />
    ) : user ? (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>
          У вас недостаточно прав для посещения данной страницы
        </ErrorText>
        <ButtonDefault onClick={buttonHandler}>На главную</ButtonDefault>
      </Container>
    ) : (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>Вы не вошли в аккаунт</ErrorText>
        <ButtonDefault onClick={buttonHandlerSignIn}>
          Войти в аккаунт
        </ButtonDefault>
      </Container>
    );
  }
  if (commonRoutes) {
    return user ? (
      <Outlet />
    ) : (
      <Container>
        <Title>Ошибка!</Title>
        <ErrorText>Вы не вошли в аккаунт</ErrorText>
        <ButtonDefault onClick={buttonHandlerSignIn}>
          Войти в аккаунт
        </ButtonDefault>
      </Container>
    );
  }
}
