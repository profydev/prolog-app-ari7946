import React, { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

// utility function
const getContentWhenChecked = (
  checkboxSize: "sm" | "md",
  checkPartly: boolean
): string => {
  if (checkboxSize === "md" && checkPartly) {
    return "url('icons/select-minus-md.svg')";
  } else if (checkboxSize === "md" && !checkPartly) {
    return "url('icons/select-checked-md.svg')";
  } else if (checkboxSize === "sm" && checkPartly) {
    return "url('icons/select-minus-sm.svg')";
  } else if (checkboxSize === "sm" && !checkPartly) {
    return "url('icons/select-checked-sm.svg')";
  } else {
    return "url('icons/select-minus-md.svg')";
  }
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input<any>`
  display: flex;
  align-items: center;
  /* remove default appearance */
  -webkit-appearance: none;
  appearance: none;
  /* create a custom design */
  width: 1rem;
  height: 1rem;
  margin-right: 0.4rem;
  ${(props) => {
    return (
      props.checkboxSize === "md" &&
      css`
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.6rem;
      `
    );
  }}
  border-radius: 0.30rem;
  border: 0.1rem solid ${color("primary", 600)};
  outline: none;
  cursor: pointer;
  
  /* Hover */
  &:hover {
    background-color: ${color("primary", 50)};
  }
  
  /* Not Checked */
  &:not(:checked) {
    content: "";
  }

  /* Checked */
  &:checked {
    background-color: ${color("primary", 50)};
  }
  &:checked::before {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: auto;
    content: ${(props) =>
      getContentWhenChecked(props.checkboxSize, props.checkPartly)};
    padding-bottom: ${(props) => (props.checkPartly ? `0.5rem` : `0.15rem`)};
    };
  }

  /* Focus for accessability */
  &:not(:checked):focus,
  &:checked:focus {
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1),
      0 0 0 4px ${color("primary", 100)};
  }

  /* Disabled checkbox */
  &:disabled:not(:checked),
  &:disabled:checked {
    box-shadow: none;
    border-color: ${color("gray", 200)};
    background-color: ${color("gray", 100)};
  }
  &:disabled:not(:checked) + label, &:disabled:checked + label {
    color: ${color("gray", 300)};
  }
`;

const Label = styled.label<any>`
  display: ${(props) => (props.displayLabel ? "inherit" : "none")};
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")};
  ${(props) => {
    return (
      props.checkboxSize === "md" &&
      css`
        ${textFont("md", "regular")};
      `
    );
  }}
`;

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  checked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  displayLabel?: boolean;
  checkboxSize?: "sm" | "md";
  checkPartly?: boolean;
  disabled?: boolean;
};

export const CheckBox = ({
  label,
  handleChange,
  displayLabel = true,
  checked = false,
  checkboxSize = "md",
  checkPartly = false,
  disabled = false,
  ...props
}: CheckboxProps) => {
  return (
    <Container>
      <Input
        {...props}
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        id={label}
        checkboxSize={checkboxSize}
        checkPartly={checkPartly}
        disabled={disabled}
      />
      <Label
        {...props}
        htmlFor={label}
        checked={checked}
        checkboxSize={checkboxSize}
        disabled={disabled}
        displayLabel={displayLabel}
      >
        {label}
      </Label>
    </Container>
  );
};
