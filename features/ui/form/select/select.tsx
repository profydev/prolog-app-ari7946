import React, { useState, ReactNode } from "react";
import styled, { css } from "styled-components";
import { SelectContext } from "./selectContext";
import { color, textFont, space } from "@styles/theme";

type SelectProps = {
  children: ReactNode | ReactNode[];
  errorMessage?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  iconSrc?: string;
  label?: string;
  hint?: string;
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
  border: 1px solid;
  border-color: ${({ disabled, errorMessage }) =>
    !disabled && errorMessage ? color("error", 300) : color("gray", 300)};
  border-radius: 7px;
  width: calc(${space(20)} * 4 - ${space(6)});
  padding: ${space(2, 3)};
  color: ${({ selectedOption }) =>
    selectedOption ? color("gray", 900) : color("gray", 500)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.052rem;
  ${textFont("md", "regular")};

  &:focus {
    outline: 3px solid;
    outline-color: ${({ disabled, errorMessage }) =>
      !disabled && errorMessage ? color("error", 100) : color("primary", 200)};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${color("gray", 500)};
      background-color: ${color("gray", 100)};
      pointer-events: none;
    `}
`;

const SelectArrowIcon = styled.img<{
  showDropdown: boolean;
}>`
  transform: ${({ showDropdown }) =>
    showDropdown ? "rotate(180deg)" : "none"};
  padding-inline: ${space(3)};
`;

const OptionalIcon = styled.img`
  padding-inline: ${space(1, 2)};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.p`
  margin: 0;
  margin-bottom: ${space(1)};
  color: ${color("gray", 700)};
  ${textFont("md", "regular")};
`;

const Hint = styled.p`
  margin: 0;
  margin-top: ${space(1)};
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")};
  letter-spacing: 0.05rem;
`;

const ErrorMessage = styled.p`
  margin: 0;
  margin-top: ${space(1)};
  color: ${color("error", 500)};
  ${textFont("sm", "regular")};
  letter-spacing: 0.05rem;
`;

export function Select({
  placeholder = "Choose an option",
  defaultValue = "",
  iconSrc = "",
  disabled = false,
  label = "",
  hint = "",
  errorMessage = "",
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
        {label && <Label>{label}</Label>}
        <SelectedOption
          onClick={showDropdownHandler}
          selectedOption={selectedOption}
          disabled={disabled}
          errorMessage={errorMessage}
        >
          <LeftContainer>
            {iconSrc && <OptionalIcon src={iconSrc} />}
            {selectedOption || placeholder}
          </LeftContainer>

          <SelectArrowIcon
            src="./icons/select-icon.svg"
            showDropdown={showDropdown}
          />
        </SelectedOption>
        {hint && !errorMessage && <Hint>{hint}</Hint>}
        {errorMessage && !showDropdown && !disabled && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
        <List showDropdown={showDropdown}>{children}</List>
      </Container>
    </SelectContext.Provider>
  );
}
