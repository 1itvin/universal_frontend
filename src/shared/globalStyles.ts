import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', Arial, sans-serif;
    transition: 0.12s linear;
  }
  body {
    position: relative;
  }
`;

export const Palette = {
  primaryColor: "#3C4F76",
  bgColor: "#F6F7F9",
  borderColor: "#BBBBBB",
  white: "#fff",
  fontSize: "16px",
  fontColor: "#DDDBF1",
  lightGrey: "#EAEAEA",
  redColor: "#C70000",
  greenColor: "#4DE42B",
};

export const InputDefault = styled.input<{
  $redBorder?: boolean;
}>`
  font-size: ${Palette.fontSize};
  padding: 11px 20px;
  border-radius: 20px;
  border: ${(props) =>
    props.$redBorder
      ? `1px solid ${Palette.redColor}`
      : `1px solid ${Palette.primaryColor}`};
  width: 52%;
`;

export const ButtonDefault = styled.button<{
  $reverse?: boolean;
  $marginTop?: string;
  $marginBottom?: string;
  $width?: string;
  $red?: boolean;
  $green?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 10px 24px;
  font-size: ${Palette.fontSize};
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    props.$reverse
      ? Palette.white
      : props.$red
      ? Palette.redColor
      : props.$green
      ? Palette.greenColor
      : Palette.primaryColor};
  color: ${(props) =>
    props.$reverse
      ? "#000"
      : props.$red || props.$green
      ? "#fff"
      : Palette.fontColor};
  margin-top: ${(props) => (props.$marginTop ? props.$marginTop : "auto")};
  margin-bottom: ${(props) =>
    props.$marginBottom ? props.$marginBottom : "auto"};
  width: ${(props) => (props.$width ? props.$width : "auto")};
  user-select: none;

  &:hover {
    color: ${(props) =>
      props.$reverse ? Palette.primaryColor : Palette.white};
  }
`;

export const TableDefault = styled.table<{
  $width?: string;
  $maxHeight?: string;
}>`
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  word-break: break-word;
  width: ${(props) => (props.$width ? props.$width : "auto")};
  max-height: ${(props) => (props.$maxHeight ? props.$maxHeight : "auto")};
  overflow-y: auto;
`;

export const TheadDefault = styled.thead`
  display: flex;
  & > tr {
    background-color: ${Palette.primaryColor};
    font-weight: 700;
    color: ${Palette.fontColor};
  }
`;

export const TbodyDefault = styled.tbody`
  display: flex;
  flex-direction: column;
`;

export const TrDefault = styled.tr`
  display: flex;
  min-height: 40px;
  width: 100%;
  &:hover {
    background-color: ${Palette.primaryColor};
    color: ${Palette.fontColor};
  }
`;

export const TdDefault = styled.td<{ $maxWidth?: string }>`
  padding: 11.5px 10px;
  max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : "auto")};
  width: 100%;
  font-size: 14px;
  user-select: none;
`;

export const PlusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.primaryColor};
  background-repeat: no-repeat;
  background-position: center;
  color: ${Palette.fontColor};
  font-size: 16px;
  font-weight: 100;
  border-radius: 100px;
  border: none;
  width: fit-content;
  padding: 0 20px;
  height: 40px;
  cursor: pointer;

  &:hover {
    color: ${Palette.white};
  }
`;

export default GlobalStyle;
