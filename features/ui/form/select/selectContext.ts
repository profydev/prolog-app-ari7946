import { createContext, useContext } from "react";

export const SelectContext = createContext<{
  selectedValue?: string;
  changeSelectedValue: (value: string) => void;
}>({
  selectedValue: undefined,
  changeSelectedValue: () => null,
});

export const useSelectContext = () => {
  return useContext(SelectContext);
};
