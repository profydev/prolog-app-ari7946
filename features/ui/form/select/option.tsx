import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { useSelectContext } from "./selectContext";
import { color, textFont, space } from "@styles/theme";

type OptionProps = {
  children: ReactNode | ReactNode[];
  value: string;
};

const ListItem = styled.li<{ isCurrentlySelected: boolean }>`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding-inline: ${space(3)};
  padding-block: calc(${space(3)} - 0.1rem);
  ${textFont("md", "regular")};
  cursor: pointer;
  color: ${color("gray", 800)};
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
  /* padding-bottom: ${space(3)}; */
`;

export function Option({ children, value }: OptionProps) {
  const { changeSelectedOption, selectedOption } = useSelectContext();
  const isCurrentlySelected = selectedOption === value;

  return (
    <ListItem
      isCurrentlySelected={isCurrentlySelected}
      onClick={() => changeSelectedOption(value)}
    >
      {children}
      <ListItemIcon
        isCurrentlySelected={isCurrentlySelected}
        src="./icons/select-checked-sm.svg"
      />
    </ListItem>
  );
}
