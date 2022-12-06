import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { useSelectContext } from "./selectContext";
import { color, textFont, space } from "@styles/theme";

type OptionProps = {
  children: ReactNode | ReactNode[];
  value: any;
};

const ListItem = styled.li.attrs(() => ({
  tabIndex: 0,
}))<{ isCurrentlySelected: boolean }>`
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding-inline: ${space(3)};
  padding-block: calc(${space(3)} - 0.1rem);
  ${textFont("md", "regular")};
  cursor: pointer;
  z-index: 100;
  color: ${color("gray", 800)};
  background-color: #fff;

  ${({ isCurrentlySelected }) =>
    isCurrentlySelected &&
    css`
      background-color: ${color("primary", 25)};
    `};
`;

const ListItemIcon = styled.img<{ isCurrentlySelected: boolean }>`
  display: ${({ isCurrentlySelected }) =>
    isCurrentlySelected ? "block" : "none"};
  padding: ${space(0)};
  width: ${space(4)};
  height: ${space(4)};
`;

export function Option({ children, value }: OptionProps) {
  const { changeSelectedValue, selectedValue } = useSelectContext();
  const isCurrentlySelected = selectedValue === value;

  const onClick = () => {
    changeSelectedValue(value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.code === "Space") {
      onClick();
    }
  };

  return (
    <ListItem
      isCurrentlySelected={isCurrentlySelected}
      aria-selected={isCurrentlySelected}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="option"
    >
      {children}
      <ListItemIcon
        isCurrentlySelected={isCurrentlySelected}
        src="/icons/select-checked-sm.svg"
      />
    </ListItem>
  );
}
