import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import type { Page } from "@typings/page.types";
import type { Issue } from "../types/issue.types";
import { useFilters } from "@features/issues";
import { IssueFilters } from "@features/issues";

export async function getIssues(
  page: number,
  filters: IssueFilters,
  options?: { signal?: AbortSignal }
) {
  const { data } = await axios.get<Page<Issue>>(
    "https://prolog-api.profy.dev/issue",
    {
      params: { page, ...filters },
      signal: options?.signal,
    }
  );
  return data;
}

export async function resolveIssue(issueId: string) {
  const { data } = await axios.patch(
    `https://prolog-api.profy.dev/issue/${issueId}`,
    {
      status: "resolved",
    }
  );
  return data;
}

const QUERY_KEY = "issues";

export function getQueryKey(page?: number, filters?: IssueFilters) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page, filters];
}

export function useIssues(page: number) {
  const { filters } = useFilters();
  // console.log('filters', filters);
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, filters),
    ({ signal }) => getIssues(page, filters, { signal }),
    { keepPreviousData: true }
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(getQueryKey(page + 1, filters), ({ signal }) =>
        getIssues(page + 1, filters, { signal })
      );
    }
  }, [query.data, page, filters, queryClient]);
  return query;
}
