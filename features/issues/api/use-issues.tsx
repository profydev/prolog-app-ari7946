import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import type { Page } from "@typings/page.types";
import type { Issue } from "../types/issue.types";

async function getIssues(page: number, filters: Filters) {
  const { data } = await axios.get(
    `https://prolog-api.profy.dev/issue?page=${page}`,
    { params: filters }
  );
  console.log("data", data);
  return data;
}

type Filters = {
  status: null | "open" | "resolved";
  level: null | "error" | "warning" | "info";
};

export function useIssues(page: number) {
  const [filters, setFilters] = useState<Filters>({
    status: "open",
    level: null,
  });

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
