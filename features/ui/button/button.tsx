import React, { ReactText, ReactElement, ReactNode } from "react";
import styled, { css } from "styled-components";
import { color, textFont, space } from "@styles/theme";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
}

export enum ButtonState {
  default = "default",
  hover = "hover",
  focused = "focused",
  disabled = "disabled",
}

export enum ButtonIcon {
  leading = "leading",
  trailing = "trailing",
  only = "only",
  none = "none",
}

export type ButtonContainerProps = {
  children?: ReactText | ReactElement | ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  state?: ButtonState;
  icon?: ButtonIcon;
};

// This below Button variable is only here because there's at least one
// instance where it is being used throughout the app
export const Button = styled.button`
  cursor: pointer;

  /* remove default button styles */
  border: none;
  margin: 0;
  padding: 0;
  background: transparent;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

const Container = styled(Button)<{
  size: ButtonSize;
  color: ButtonColor;
  state: ButtonState;
  icon: ButtonIcon;
}>`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${space(2)};
  letter-spacing: 0.0525rem;
  color: #fff;
  min-height: ${space(8)};
  min-width: ${space(24)};
  background-color: ${color("primary", 600)};
  border: 1px;
  ${textFont("sm", "regular")};
  background-color: red;

  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          padding-block: ${space(2)};
          padding-inline: ${space(3)};
        `;
      case ButtonSize.md:
        return css`
          padding-block: calc(${space(2)} + 0.1rem);
          padding-inline: calc(${space(3)} + 0.125rem);
        `;
      case ButtonSize.lg:
        return css`
          padding-block: ${space(3)};
          padding-inline: calc(${space(4)} + 0.075rem);
          font-size: 16px;
        `;
      case ButtonSize.xl:
        return css`
          padding-block: calc(${space(3)} + 0.1rem);
          padding-inline: calc(${space(4)} + 0.2rem);
          font-size: 16px;
        `;
    }
  }}

  ${(props) => {
    switch (props.color) {
      case ButtonColor.primary:
        return css`
          background-color: ${color("primary", 600)};
          &:hover {
            background-color: ${color("primary", 700)};
          }
        `;
      case ButtonColor.secondary:
        return css`
          color: ${color("primary", 700)};
          background-color: ${color("primary", 50)};
          &:hover {
            background-color: ${color("primary", 100)};
          }
        `;
      case ButtonColor.gray:
        return css`
          color: ${color("gray", 700)};
          border: 1px solid ${color("gray", 300)};
          background-color: rgba(255, 255, 255, 1);
          &:hover {
            color: ${color("gray", 800)};
            background-color: ${color("gray", 50)};
          }
        `;
      case ButtonColor.empty:
        return css`
          color: ${color("primary", 700)};
          border: none;
          background-color: rgba(0, 0, 0, 0);
          &:hover {
            background-color: ${color("primary", 50)};
          }
        `;
      case ButtonColor.emptyGray:
        return css`
          color: ${color("gray", 500)};
          border: none;
          background-color: rgba(0, 0, 0, 0);
          &:hover {
            background-color: ${color("gray", 50)};
            color: ${color("gray", 600)};
          }
        `;
      case ButtonColor.error:
        return css`
          color: #ffffff;
          border: 1px;
          background-color: ${color("error", 600)};
          &:hover {
            background-color: ${color("error", 700)};
          }
        `;
    }
  }}
`;

export const ButtonContainer = ({
  children,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  state = ButtonState.default,
  icon = ButtonIcon.none,
}: ButtonContainerProps) => {
  return (
    <Container size={size} color={color} state={state} icon={icon}>
      {children}
    </Container>
  );
};
