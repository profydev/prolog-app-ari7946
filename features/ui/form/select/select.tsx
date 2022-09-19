import React, { useState, ReactNode } from "react";
import styled, { css } from "styled-components";
import { SelectContext } from "./selectContext";

type SelectProps = {
  children: ReactNode | ReactNode[];
  defaultValue?: string;
  placeholder?: string;
};

const Container = styled.div``;

const List = styled.ul<{ showDropdown: boolean }>`
  ${({ showDropdown }) =>
    showDropdown
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `}
`;

export function Select({
  placeholder = "Choose an option",
  defaultValue = "",
  children,
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState(defaultValue || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownHandler = () => setShowDropdown(!showDropdown);

  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <SelectContext.Provider
      value={{ selectedOption, changeSelectedOption: updateSelectedOption }}
    >
      <Container>
        <div onClick={showDropdownHandler}>{selectedOption || placeholder}</div>
        <List showDropdown={showDropdown}>{children}</List>
      </Container>
    </SelectContext.Provider>
  );
}
