import { Link } from "react-router-dom";
import { Container, LinkContainer, Nav, Title, Wrapper } from "./styled";
import { useAppSelector } from "../../../app/store/hooks";

export default function Header() {
  const user = useAppSelector((state) => state.auth.user);

  return user?.roles.find((role) => role.value === "ADMIN") ? (
    <Wrapper>
      <Container>
        <Title>Админ</Title>
      </Container>
      <Nav>
        <LinkContainer>
          <Link className="link" to={"/users"}>
            Пользователи
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"/roles"}>
            Роли
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link className="link" to={"/profile"}>
            Профиль
          </Link>
        </LinkContainer>
      </Nav>
    </Wrapper>
  ) : user ? (
    <Wrapper>
      <Container>
        <Title>Пользователь</Title>
      </Container>
      <Nav>
        <LinkContainer>
          <Link className="link" to={"/profile"}>
            Профиль
          </Link>
        </LinkContainer>
      </Nav>
    </Wrapper>
  ) : (
    <></>
  );
}
