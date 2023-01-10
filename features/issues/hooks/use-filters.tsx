// import { useContext } from "react";
// import { FiltersContext } from "../context/filters-context";

// export const useFilters = () => useContext(FiltersContext);

import { useRouter } from "next/router";
import { IssueFilters } from "../types/issue.types";

export const useFilters = () => {
  const router = useRouter();

  // Derives filter values from the URL
  const filters = {
    status: router.query.status,
    level: router.query.level,
    project: router.query.project,
  } as IssueFilters;

  // Updates URL with router.push
  const handleFilters = (newFilters: IssueFilters) => {
    const query = { ...router.query, ...newFilters };
    router.push({ query });
  };

  return { filters, handleFilters };
};
