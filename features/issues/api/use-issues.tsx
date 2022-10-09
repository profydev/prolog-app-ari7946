import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import type { Page } from "@typings/page.types";
import type { Issue } from "../types/issue.types";
import { useFilters } from "@features/issues";
import { IssueFilters } from "@features/issues";
import { useRouter } from "next/router";

async function getIssues(page: number, filters: IssueFilters) {
  const { data } = await axios.get(
    `https://prolog-api.profy.dev/issue?page=${page}`,
    { params: filters }
  );
  return data;
}

export function useIssues(page: number) {
  const router = useRouter();
  const { filters } = useFilters();

  const newObj = { ...filters };

  // Object.keys(newObj).forEach(key => {
  // if (newObj[key] === undefined) {
  //   delete newObj[key];
  // }
  // });

  // router.push({
  //   pathname: "/dashboard/[level]",
  //   query: {
  //     ...filters,
  //   },
  // });

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
