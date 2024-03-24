import { SelectContainer, SelectItem, Wrapper } from "./styled";
import { InputDefault } from "../../globalStyles";
import { useEffect, useRef, useState } from "react";

interface IProps {
  items?: string[];
  registerProps?: object;
  placeholder?: string;
  name: string;
  isError?: boolean;
  handleSelect?: (object: object) => void;
}

export default function CustomSelect({
  items,
  registerProps,
  placeholder,
  name,
  isError,
  handleSelect = () => {},
}: IProps) {
  const [isContainerVisible, setContainerVisibility] = useState<boolean>(false);
  const refSelectContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isContainerVisible) {
      refSelectContainer.current!.focus();
    }
  }, [isContainerVisible]);

  function inputOnFocus() {
    setContainerVisibility(true);
  }

  function selectOnFocus() {
    setContainerVisibility(true);
  }

  function selectOnBlur() {
    setContainerVisibility(false);
  }

  function selectItem(prop: string) {
    handleSelect({ [name]: prop });
  }

  let key = 1;

  return (
    <Wrapper>
      <InputDefault
        tabIndex={1}
        readOnly
        onFocus={inputOnFocus}
        style={{ cursor: "pointer" }}
        {...registerProps}
        placeholder={placeholder}
        $redBorder={isError}
      />
      <SelectContainer
        key={"selectContainer"}
        tabIndex={2}
        $isContainerVisible={isContainerVisible}
        ref={refSelectContainer}
        onFocus={selectOnFocus}
        onBlur={selectOnBlur}
      >
        {items?.map((item) => (
          <SelectItem
            className="custom-option"
            key={`selectItem${key++}`}
            onClick={() => {
              selectItem(item);
              setContainerVisibility(false);
            }}
          >
            {item}
          </SelectItem>
        ))}
      </SelectContainer>
    </Wrapper>
  );
}
