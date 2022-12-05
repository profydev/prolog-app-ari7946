import { useRouter } from "next/router";
import { IssueLevel, IssueStatus } from "../types/issue.types";

type Filters = {
  status: IssueStatus;
  level: IssueLevel;
  project: string;
};

export const useFilters = () => {
  const router = useRouter();

  const filters = {
    status: router.query.status as IssueStatus,
    level: router.query.level as IssueLevel,
    project: router.query.project,
  } as Filters;

  const updateFilters = (newFilters: Partial<Filters>) => {
    const query = { ...router.query, ...newFilters };
    router.push({ query });
  };

  return { filters, updateFilters };
};
