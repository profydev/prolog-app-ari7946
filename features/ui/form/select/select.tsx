import React, {
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";
import styled, { css } from "styled-components";
import { useClickAway } from "react-use";
import { SelectContext } from "./selectContext";
import { color, textFont, space } from "@styles/theme";

type SelectProps = {
  children: ReactNode | ReactNode[];
  errorMessage?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  iconSrc?: string;
  width?: string | number;
  label?: string;
  hint?: string;
};

const Container = styled.div<{ width: number | string }>`
  position: relative;
  display: block;
  width: ${({ width }) => width || `calc(${space(20)} * 4)`};
  background-color: #fff;
`;

const List = styled.ul<{ showDropdown: boolean }>`
  display: block;
  width: 100%;
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
}))<any>`
  border: 1px solid;
  border-color: ${({ disabled, errorMessage }) =>
    !disabled && errorMessage ? color("error", 300) : color("gray", 300)};
  border-radius: 7px;
  width: ${({ width }) => width || `calc(${space(20)} * 4 - ${space(6)})`};
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
  margin-inline: ${space(1)};
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
  width = "",
  children,
  ...props
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState(defaultValue || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  // hides dropdown when user clicks outside the select component
  useClickAway(ref, () => {
    setShowDropdown(false);
  });

  const showDropdownHandler = useCallback(
    () => setShowDropdown((prevShowDropdown) => !prevShowDropdown),
    []
  );

  const updateSelectedOption = useCallback((option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  }, []);

  const value = useMemo(
    () => ({ selectedOption, changeSelectedOption: updateSelectedOption }),
    [selectedOption, updateSelectedOption]
  );

  return (
    <SelectContext.Provider value={value}>
      <Container {...props} ref={ref} width={width}>
        {label && <Label>{label}</Label>}

        <SelectedOption
          onClick={showDropdownHandler}
          selectedOption={selectedOption}
          disabled={disabled}
          errorMessage={errorMessage}
          aria-expanded={showDropdown}
          width={width}
        >
          <LeftContainer>
            {iconSrc && <OptionalIcon src={iconSrc} />}
            {selectedOption || placeholder}
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
