export enum IssueLevel {
  info = "info",
  warning = "warning",
  error = "error",
}

export enum IssueStatus {
  resolved = "resolved",
  open = "open",
}

export type Issue = {
  id: string;
  projectId: string;
  name: string;
  message: string;
  stack: string;
  level: IssueLevel;
  status: IssueStatus;
  numEvents: number;
  numUsers: number;
};

export type IssueFilters = Partial<Pick<Issue, "level" | "status">>;
