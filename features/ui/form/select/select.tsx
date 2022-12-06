import React, { useState, ReactNode, useRef, HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { useClickAway } from "react-use";
import { SelectContext } from "./selectContext";
import { color, textFont, space } from "@styles/theme";

export type OptionType = {
  text: string;
  value: string;
};

type SelectProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  children: ReactNode | ReactNode[];
  errorMessage?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  iconSrc?: string;
  label?: string;
  hint?: string;
  value?: string;
  onChange?: (value?: string) => void;
  options: OptionType[];
};

const Container = styled.div`
  position: relative;
  display: block;
  background-color: #fff;
`;

const List = styled.ul<{ showDropdown: boolean }>`
  display: block;
  min-width: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  box-shadow: 0 7px 12px -6px ${color("gray", 300)};
  border-radius: 7px;
  ${({ showDropdown }) =>
    showDropdown
      ? css`
          opacity: 1;
          visibility: visible;
          position: absolute;
          height: auto;
          z-index: 200;
          margin-top: ${space(1)};
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `};
`;

const SelectedOption = styled.div.attrs(() => ({
  tabIndex: 0,
  ariaHasPopup: "listbox",
}))<{ disabled: boolean; hasError: boolean; isSelected: boolean }>`
  width: 100%;
  border: 1px solid;
  border-color: ${({ disabled, hasError }) =>
    !disabled && hasError ? color("error", 300) : color("gray", 300)};
  border-radius: 7px;
  padding: ${space(2, 3)};
  color: ${({ isSelected }) =>
    isSelected ? color("gray", 900) : color("gray", 500)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.052rem;
  ${textFont("md", "regular")};

  &:focus {
    outline: 3px solid;
    outline-color: ${({ disabled, hasError }) =>
      !disabled && hasError ? color("error", 100) : color("primary", 200)};
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
  padding-inline: ${space(1)};
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
  defaultValue,
  value,
  iconSrc,
  disabled = false,
  label,
  hint,
  errorMessage,
  children,
  options,
  onChange,
  ...props
}: SelectProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  // hides dropdown when user clicks outside the select component
  useClickAway(ref, () => {
    setShowDropdown(false);
  });

  const updateSelectedOption = (value: string) => {
    if (onChange) onChange(value);
    setShowDropdown(false);
  };

  const selectedOption =
    value === undefined
      ? undefined
      : options.find((option) => option.value === value);

  const toggleDropDown = () => {
    setShowDropdown(!showDropdown);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Space") {
      toggleDropDown();
    }
  };

  return (
    <SelectContext.Provider
      value={{
        selectedValue: value || defaultValue,
        changeSelectedValue: updateSelectedOption,
      }}
    >
      <Container ref={ref} {...props}>
        {label && <Label>{label}</Label>}

        <SelectedOption
          onClick={toggleDropDown}
          onKeyDown={onKeyDown}
          isSelected={!!selectedOption}
          disabled={disabled}
          hasError={!!errorMessage}
          aria-expanded={showDropdown}
        >
          <LeftContainer>
            {iconSrc && <OptionalIcon src={iconSrc} />}
            {selectedOption?.text || placeholder}
          </LeftContainer>

          <SelectArrowIcon
            src={"/icons/select-icon.svg"}
            showDropdown={showDropdown}
          />
        </SelectedOption>

        {hint && !showDropdown && !errorMessage && <Hint>{hint}</Hint>}

        {errorMessage && !showDropdown && !disabled && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}

        <List showDropdown={showDropdown} role="listbox" tabIndex={-1}>
          {children}
        </List>
      </Container>
    </SelectContext.Provider>
  );
}
