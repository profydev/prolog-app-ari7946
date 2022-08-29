export enum ProjectLanguage {
  react = "react",
  node = "node",
  python = "python",
}

export enum ProjectStatus {
  stable = "stable",
  warning = "warning",
  critical = "critical",
  error = "error",
  info = "info",
}

export type ResponseProject = {
  id: string;
  name: string;
  language: ProjectLanguage;
  numIssues: number;
  numEvents24h: number;
  status: ProjectStatus;
};

export type Project = {
  id: string;
  name: string;
  language: ProjectLanguage;
  numIssues: number;
  numEvents24h: number;
  status: Exclude<ProjectStatus, ProjectStatus.error | ProjectStatus.info>;
};
