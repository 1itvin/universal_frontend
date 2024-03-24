import styled from "styled-components";
import { Palette } from "../../../shared/globalStyles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  gap: 30px;
`;

export const Title = styled.h1`
  font-size: 24px;
  user-select: none;
  margin-top: 80px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 10px;
`;

export const InfoTitle = styled.p`
  font-size: ${Palette.fontSize};
  font-weight: bold;
  user-select: none;
`;

export const InfoText = styled.div`
  font-size: ${Palette.fontSize};
  padding: 11px 20px;
  border-radius: 20px;
  border: 1px solid ${Palette.primaryColor};
  width: 100%;
`;
