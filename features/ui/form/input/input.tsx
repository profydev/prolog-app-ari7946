import React, { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { color, textFont, space } from "@styles/theme";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
  handleChange: (input: string) => unknown;
  disabled?: boolean;
  displayLabel?: boolean;
  iconSrc?: string;
  placeholder?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
};

const Container = styled.div`
  position: relative;
`;

const InputContainer = styled.input<{
  errorMessage: string;
  error: boolean;
  isIconPresent: boolean;
}>`
  display: block;
  border: 1px solid;
  border-color: ${({ errorMessage, error }) =>
    errorMessage || error ? color("error", 300) : color("gray", 300)};
  border-radius: 7px;
  width: calc(${space(20)} * 4 - ${space(6)});
  padding: ${space(2, 3)};
  letter-spacing: 0.05rem;
  color: ${color("gray", 900)};
  ${textFont("md", "regular")};

  ${({ isIconPresent }) =>
    isIconPresent &&
    css`
      padding-left: ${space(10)};
      width: calc(${space(20)} * 4 - ${space(12)} - ${space(2)});
    `}

  ::placeholder {
    color: ${color("gray", 400)};
  }

  &:focus {
    outline: 3px solid;
    outline-color: ${({ errorMessage, error }) =>
      errorMessage || error ? color("error", 100) : color("primary", 200)};
  }

  &:disable {
    color: ${color("gray", 500)};
    background-color: ${color("gray", 50)};
  }
`;

const InputIcon = styled.img<{
  iconSrc?: string;
  displayLabel?: boolean;
}>`
  display: block;
  height: ${space(5)};
  width: ${space(5)};
  margin-inline: ${space(2)};
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  transform: ${({ displayLabel }) => displayLabel && "translateY(12%)"};
`;

const Label = styled.label<{
  displayLabel?: boolean;
}>`
  display: ${({ displayLabel }) => (displayLabel ? "block" : "none")};
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
  letter-spacing: 0.045rem;
`;

const ErrorMessage = styled.p`
  margin: 0;
  margin-top: ${space(1)};
  color: ${color("error", 500)};
  ${textFont("sm", "regular")};
  letter-spacing: 0.05rem;
`;

const ErrorIcon = styled(InputIcon)<{
  displayLabel: boolean;
}>`
  height: ${space(4)};
  width: ${space(4)};
  left: 280px;
  transform: ${({ displayLabel }) => displayLabel && "translateY(40%)"};
`;

export function Input({
  label,
  value,
  handleChange,
  disabled = false,
  iconSrc = "",
  placeholder = "",
  displayLabel = false,
  hint = "",
  error = false,
  errorMessage = "",
  ...props
}: InputProps) {
  const isIconPresent = iconSrc.length > 3;

  return (
    <>
      <Container {...props}>
        <Label htmlFor={label} displayLabel={displayLabel}>
          {label}
        </Label>

        {iconSrc && (
          <InputIcon
            src={iconSrc}
            iconSrc={iconSrc}
            displayLabel={displayLabel}
          />
        )}

        {(error || errorMessage) && (
          <ErrorIcon src="./icons/error-icon.svg" displayLabel={displayLabel} />
        )}

        <InputContainer
          type="input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            handleChange(e.target.value);
          }}
          disabled={disabled}
          value={value}
          isIconPresent={isIconPresent}
          placeholder={placeholder}
          errorMessage={errorMessage}
          error={error}
        />
      </Container>
      {hint && !errorMessage && <Hint>{hint}</Hint>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
}
