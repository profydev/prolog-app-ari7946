import React, { useState, ReactNode } from "react";
import styled, { css } from "styled-components";
import { SelectContext } from "./selectContext";
import { color, textFont, space } from "@styles/theme";

type SelectProps = {
  children: ReactNode | ReactNode[];
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  iconSrc?: string;
};

const Container = styled.div``;

const List = styled.ul<{ showDropdown: boolean }>`
  display: block;
  width: calc(${space(20)} * 4);
  position: absolute;
  margin: 0;
  padding: 0;
  box-shadow: 0 7px 12px -6px ${color("gray", 300)};
  border-radius: 7px;
  /* ${textFont("md", "regular")}; */
  ${({ showDropdown }) =>
    showDropdown
      ? css`
          opacity: 1;
          visibility: visible;
          position: relative;
          z-index: 200;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `};
`;

const SelectedOption = styled.div.attrs(() => ({
  tabIndex: 0,
}))<any>`
  border: 1px solid ${color("gray", 300)};
  border-radius: 7px;
  width: calc(${space(20)} * 4 - ${space(6)});
  padding: ${space(2, 3)};
  color: ${({ selectedOption }) =>
    selectedOption ? color("gray", 900) : color("gray", 500)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  ${textFont("md", "regular")};

  &:focus {
    outline: 3px solid ${color("primary", 300)};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${color("gray", 500)};
      background-color: ${color("gray", 100)};
      pointer-events: none;
    `}
`;

const SelectIcon = styled.img<{
  showDropdown: boolean;
}>`
  transform: ${({ showDropdown }) =>
    showDropdown ? "rotate(180deg)" : "none"};
  padding-inline: ${space(2)};
`;

export function Select({
  placeholder = "Choose an option",
  defaultValue = "",
  disabled = false,
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
        <SelectedOption
          onClick={showDropdownHandler}
          selectedOption={selectedOption}
          disabled={disabled}
        >
          {selectedOption || placeholder}
          <SelectIcon
            src="./icons/select-icon.svg"
            showDropdown={showDropdown}
          />
        </SelectedOption>
        <List showDropdown={showDropdown}>{children}</List>
      </Container>
    </SelectContext.Provider>
  );
}
