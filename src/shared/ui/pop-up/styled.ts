import styled from "styled-components";
import { Palette } from "../../globalStyles";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 80%;
  margin: 0 auto;
  /* background-color: rgba(255, 255, 255, 0.5); */
`;

export const Box = styled.div`
  border-radius: 20px;
  border: 1px solid ${Palette.borderColor};
  background-color: ${Palette.bgColor};
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 20px 20px 0px 0px;
  background-color: ${Palette.primaryColor};
  padding: 10px;
  color: #fff;
  user-select: none;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 20px 20px;
  gap: 10px;
  padding: 10px;
  user-select: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0 10px;
`;
