import React, { ButtonHTMLAttributes } from "react";
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

export enum ButtonIcon {
  leading = "leading",
  trailing = "trailing",
  only = "only",
  none = "none",
}

export const Icon = styled.img<{ icon: ButtonIcon }>`
  display: block;
  width: ${space(5)};
  margin-left: ${(props) =>
    props.icon == ButtonIcon.trailing ? ".5rem" : "none"};
  margin-right: ${(props) =>
    props.icon == ButtonIcon.leading ? ".5rem" : "none"};
`;

// This below Button variable is only here because there's at least one
// instance where it is being used throughout the app
// export const Button = styled.button`
// cursor: pointer;

/* remove default button styles */
// border: none;
// margin: 0;
// padding: 0;
// background: transparent;
// line-height: normal;
// -webkit-font-smoothing: inherit;
// -moz-osx-font-smoothing: inherit;
// -webkit-appearance: none;

// &::-moz-focus-inner {
//   border: 0;
//   padding: 0;
// }
// `;

const Container = styled.button<{
  size: ButtonSize;
  color: ButtonColor;
  icon: ButtonIcon;
}>`
  cursor: pointer;
  /* remove default button styles */
  border: none;
  margin: 0;
  padding: 0;
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  background: transparent;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${space(2)};
  letter-spacing: 0.0525rem;
  color: #fff;
  min-height: ${space(8)};
  ${(props) => props.icon !== ButtonIcon.only && `min-width: ${space(24)}`};
  background-color: ${color("primary", 600)};
  border: 1px;
  ${textFont("sm", "regular")};

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
          &:focus {
            outline: 3px solid ${color("primary", 100)};
          }
          &:disabled {
            background-color: ${color("primary", 200)};
          }
        `;
      case ButtonColor.secondary:
        return css`
          color: ${color("primary", 700)};
          background-color: ${color("primary", 50)};
          &:hover {
            background-color: ${color("primary", 100)};
          }
          &:focus {
            outline: 3px solid ${color("primary", 100)};
            background-color: ${color("primary", 50)};
          }
          &:disabled {
            background-color: ${color("primary", 25)};
            color: ${color("primary", 300)};
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
          &:focus {
            outline: 3px solid ${color("gray", 100)};
            background-color: rgba(255, 255, 255, 1);
          }
          &:disabled {
            background-color: ${color("gray", 25)};
            color: ${color("gray", 300)};
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
          &:focus {
            outline: none;
            background-color: rgba(255, 255, 255, 1);
          }
          &:disabled {
            color: ${color("gray", 300)};
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
          &:focus {
            outline: none;
            background-color: rgba(0, 0, 0, 0);
          }
          &:disabled {
            color: ${color("gray", 300)};
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
          &:focus {
            outline: 3px solid ${color("error", 100)};
          }
          &:disabled {
            background-color: ${color("error", 200)};
          }
        `;
    }
  }}
`;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: ButtonIcon;
};

export const Button = ({
  children,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  icon = ButtonIcon.none,
  ...buttonProps
}: ButtonProps) => {
  return (
    <Container size={size} color={color} icon={icon} {...buttonProps}>
      {icon === ButtonIcon.trailing && (
        <>
          {children}
          <Icon src="/icons/button-icon.svg" icon={icon} />
        </>
      )}
      {icon === ButtonIcon.leading && (
        <>
          <Icon src="/icons/button-icon.svg" icon={icon} />
          {children}
        </>
      )}
      {icon === ButtonIcon.only && (
        <Icon src="/icons/button-icon.svg" icon={icon} />
      )}
      {icon === ButtonIcon.none && children}
    </Container>
  );
};
