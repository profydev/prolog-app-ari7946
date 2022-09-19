import React, { ReactNode } from "react";
import { useSelectContext } from "./selectContext";

type OptionProps = {
  children: ReactNode | ReactNode[];
  value: string;
};

export function Option({ children, value }: OptionProps) {
  const { changeSelectedOption } = useSelectContext();

  return (
    <li className="select-option" onClick={() => changeSelectedOption(value)}>
      {children}
    </li>
  );
}
