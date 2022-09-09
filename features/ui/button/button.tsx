import React, { ReactText, ReactElement, ReactNode } from "react";
import styled, { css } from "styled-components";
import { color, textFont, space, displayFont } from "@styles/theme";

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

type ButtonContainerProps = {
  children?: ReactText | ReactElement | ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  state?: ButtonState;
  icon?: ButtonIcon;
};

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
  border-radius: ${space(2)};
  letter-spacing: 0.0375rem;
  font-weight: 500;
  font-size: 0.875rem;

  ${(props) => {
    switch (props) {
      default:
        return css`
          background-color: ${color("primary", 600)}; 
          border: 1px;
          ${"" /* background-color: red; */}
          color: #fff;
          padding-block: ${space(3)};
          padding-inline: ${space(4)};
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
