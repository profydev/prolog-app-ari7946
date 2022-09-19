import React, { ReactNode } from "react";
import styled from "styled-components";
import { useSelectContext } from "./selectContext";
import { color, textFont, space } from "@styles/theme";

type OptionProps = {
  children: ReactNode | ReactNode[];
  value: string;
};

const ListItem = styled.li`
  border: 1px solid red;
  list-style-type: none;
  padding: ${space(3)};
  ${textFont("md", "regular")};
  cursor: pointer;
`;

export function Option({ children, value }: OptionProps) {
  const { changeSelectedOption } = useSelectContext();

  return (
    <ListItem onClick={() => changeSelectedOption(value)}>{children}</ListItem>
  );
}
