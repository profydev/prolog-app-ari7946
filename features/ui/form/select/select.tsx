import React, { useState, ReactNode } from "react";
import styled, { css } from "styled-components";
import { SelectContext } from "./selectContext";
import { color, textFont, space } from "@styles/theme";

type SelectProps = {
  children: ReactNode | ReactNode[];
  defaultValue?: string;
  placeholder?: string;
};

const Container = styled.div``;

const List = styled.ul<{ showDropdown: boolean }>`
  display: inline-block;
  width: calc(${space(20)} * 4);
  margin: 0;
  padding: 0;
  border: 1px solid red;
  ${textFont("md", "regular")};
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

const SelectedOption = styled.div`
  border: 1px solid red;
  width: calc(${space(20)} * 4);
  padding: ${space(3)};
  border-radius: 5px;
  color: ${color("gray", 500)};
  cursor: pointer;
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
        <SelectedOption onClick={showDropdownHandler}>
          {selectedOption || placeholder}
        </SelectedOption>
        <List showDropdown={showDropdown}>{children}</List>
      </Container>
    </SelectContext.Provider>
  );
}
