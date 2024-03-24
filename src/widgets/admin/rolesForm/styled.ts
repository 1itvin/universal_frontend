import styled from "styled-components";
import { Palette } from "../../../shared/globalStyles";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  min-width: 500px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

export const InputTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  user-select: none;
`;

export const InputContainer = styled.div<{ $height?: string }>`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.$height ? props.$height : "66px")};
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
`;

export const ErrorText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${Palette.redColor};
  user-select: none;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: 0.5;
  width: 55%;
  height: 100%;
  top: 0;
`;
