import { useQuery } from "react-query";
import axios from "axios";
import {
  Project,
  ProjectStatus,
  ResponseProject,
} from "../types/project.types";

type GetProjectsResponse = {
  data: ResponseProject[];
};

async function getProjects(): Promise<Project[]> {
  const { data } = (await axios.get(
    "https://prolog-api.profy.dev/project"
  )) as GetProjectsResponse;

  const updateStatus = (data: ResponseProject[]): Project[] => {
    return data?.map((project: any): Project => {
      if (project.status === ProjectStatus.error) {
        project.status = ProjectStatus.critical;
      } else if (project.status === ProjectStatus.info) {
        project.status = ProjectStatus.stable;
      }

      return project;
    });
  };
  return updateStatus(data);
}

export function useProjects() {
  return useQuery<Project[], Error>("projects", getProjects);
}
