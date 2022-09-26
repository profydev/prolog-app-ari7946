import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  ReactNode,
} from "react";
import { IssueFilters } from "@features/issues";

export const FiltersContext = createContext<{
  filters: IssueFilters;
  handleFilters: (filter: IssueFilters) => unknown;
  inputValue: string;
  setInputValue: (val: string) => void;
}>({
  filters: { status: undefined, level: undefined },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  handleFilters: (_filter: IssueFilters) => {},
  inputValue: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setInputValue: () => {},
});

type FiltersProviderProps = {
  children: ReactNode | ReactNode[];
};

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const [filters, setFilters] = useState<IssueFilters>({
    status: undefined,
    level: undefined,
  });

  const handleFilters = useCallback(
    (filter) => setFilters((prevFilters) => ({ ...prevFilters, ...filter })),
    []
  );

  const memoizedValue = useMemo(
    () => ({ filters, handleFilters, inputValue, setInputValue }),
    [filters, handleFilters, inputValue, setInputValue]
  );
  console.log("val", inputValue);
  return (
    <FiltersContext.Provider value={memoizedValue}>
      {children}
    </FiltersContext.Provider>
  );
}
