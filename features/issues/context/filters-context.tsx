import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  ReactNode,
} from "react";
import { IssueFilters } from "@features/issues";

// type Filters = {
//   status?: null | "open" | "resolved";
//   level?: null | "error" | "warning" | "info";
// };

export const FiltersContext = createContext<{
  filters: IssueFilters;
  handleFilters: (filter: IssueFilters) => unknown;
}>({
  filters: { status: undefined, level: undefined },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  handleFilters: (filter: IssueFilters) => {},
});

type FiltersProviderProps = {
  children: ReactNode | ReactNode[];
};

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [filters, setFilters] = useState<IssueFilters>({
    status: undefined,
    level: undefined,
  });

  const handleFilters = useCallback(
    (filter) => setFilters((prevFilters) => ({ ...prevFilters, ...filter })),
    []
  );

  const memoizedValue = useMemo(
    () => ({ filters, handleFilters }),
    [filters, handleFilters]
  );

  return (
    <FiltersContext.Provider value={memoizedValue}>
      {children}
    </FiltersContext.Provider>
  );
}
