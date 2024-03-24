import styled from "styled-components";
import { InputDefault, Palette } from "../../../shared/globalStyles";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 340px;
  height: 100vh;
  padding: 250px;
  color: ${Palette.white};
  background-color: ${Palette.primaryColor};
`;

export const Title = styled.h1`
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 30px;
  user-select: none;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  height: 72px;
`;

export const InputField = styled(InputDefault)<{ $borderRed?: boolean }>`
  width: 300px;
`;

export const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;
