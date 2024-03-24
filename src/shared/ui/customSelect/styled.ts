import styled from "styled-components";
import { Palette } from "../../globalStyles";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SelectContainer = styled.div<{ $isContainerVisible: boolean }>`
  position: absolute;
  display: ${(props) => (props.$isContainerVisible ? "flex" : "none")};
  flex-direction: column;
  background-color: #fff;
  border: 1px solid ${Palette.primaryColor};
  padding: 20px 0;
  border-radius: 20px;
  top: 43px;
  width: 52%;
  cursor: pointer;
  z-index: 1;
`;

export const SelectItem = styled.div`
  display: flex;
  width: 100%;
  padding: 11px 20px;
  color: #000;
  cursor: pointer;

  &:hover {
    background: ${Palette.primaryColor};
    color: ${Palette.fontColor};
  }
`;
