import styled from "styled-components";
import { Palette } from "../../../shared/globalStyles";

export const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  width: 300px;
  min-width: 300px;
  height: 100vh;
  background-color: ${Palette.primaryColor};
`;

export const Container = styled.div`
  display: flex;
  gap: 10px;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  color: ${Palette.fontColor};
  font-size: 24px;
  font-weight: 600;
  user-select: none;
  margin: 100px 0;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;

  .link {
    color: ${Palette.fontColor};
    text-decoration: none;
    user-select: none;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 200px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
