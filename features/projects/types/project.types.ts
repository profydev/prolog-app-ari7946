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
  status: Exclude<ProjectStatus, ProjectStatus.critical | ProjectStatus.stable>;
};

export type Project = {
  id: string;
  name: string;
  language: ProjectLanguage;
  numIssues: number;
  numEvents24h: number;
  status: Exclude<ProjectStatus, ProjectStatus.error | ProjectStatus.info>;
};

export type Project = {
  id: string;
  name: string;
  language: ProjectLanguage;
  numIssues: number;
  numEvents24h: number;
  status: Exclude<ProjectStatus, ProjectStatus.error | ProjectStatus.info>;
};
