import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  ReactNode,
} from "react";

type Filters = {
  status?: null | "open" | "resolved";
  level?: null | "error" | "warning" | "info";
};

export const FiltersContext = createContext<{
  filters: Filters;
  handleFilters: (level: null | string) => unknown;
}>({
  filters: { status: null, level: null },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  handleFilters: (level: string | null) => {},
});

type FiltersProviderProps = {
  children: ReactNode | ReactNode[];
};

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [filters, setFilters] = useState<Filters>({
    status: null,
    level: null,
  });

  const handleFilters = useCallback(
    (level) => setFilters((prevFilters) => ({ ...prevFilters, level })),
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
