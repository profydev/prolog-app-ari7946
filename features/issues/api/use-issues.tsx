import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import type { Page } from "@typings/page.types";
import type { Issue } from "../types/issue.types";
import { useFilters } from "@features/issues";

type Filters = {
  status?: null | "open" | "resolved";
  level?: null | "error" | "warning" | "info";
};

async function getIssues(page: number, filters: Filters) {
  const { data } = await axios.get(
    `https://prolog-api.profy.dev/issue?page=${page}`,
    { params: filters }
  );
  return data;
}

export function useIssues(page: number) {
  const { filters } = useFilters();

  useEffect(() => console.log("update filters!"), [filters]);

  const query = useQuery<Page<Issue>, Error>(
    ["issues", page, filters],
    () => getIssues(page, filters),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(["projects", page + 1, filters], () =>
        getIssues(page + 1, filters)
      );
    }
  }, [query.data, page, queryClient, filters]);

  return query;
}
