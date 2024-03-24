import { ButtonDefault } from "../../globalStyles";
import { Box, ButtonContainer, Main, Title, Wrapper } from "./styled";

interface IProps {
  title?: string;
  text: string;
  setVisibility: (prop: boolean) => void;
  submitFunction?: () => void;
  changeFormVisibility?: (prop: boolean) => void;
}

export default function PopUp({
  title = "Внимание!",
  text,
  setVisibility,
  submitFunction = () => {},
  changeFormVisibility = () => {},
}: IProps) {
  async function handleSubmit() {
    try {
      await submitFunction();
      changeFormVisibility(false);
    } catch (error) {
      console.log("popup error", error);
    } finally {
      setVisibility(false);
    }
  }

  return (
    <Wrapper onClick={() => setVisibility(false)}>
      <Box>
        <Title>{title}</Title>
        <Main>
          {text}
          <ButtonContainer>
            <ButtonDefault onClick={() => handleSubmit()}>
              Подтвердить
            </ButtonDefault>
            <ButtonDefault $red onClick={() => setVisibility(false)}>
              Отмена
            </ButtonDefault>
          </ButtonContainer>
        </Main>
      </Box>
    </Wrapper>
  );
}
