import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { Select, Option, Input } from "@features/ui";
import {
  useFilters,
  IssueLevel,
  IssueStatus,
  IssueFilters,
} from "@features/issues";
import { useProjects } from "@features/projects";

import { useRouter } from "next/router";

const Container = styled.div`
  padding-bottom: 2rem;
  display: flex;
  gap: 3rem;
  justify-content: flex-end;
`;

export function Filters() {
  const { handleFilters, filters } = useFilters();
  const { data: projects } = useProjects();
  const router = useRouter();
  const routerQueryProjectName =
    (router.query.projectName as string)?.toLowerCase() || undefined;
  const [inputValue, setInputValue] = useState<string>("");
  const projectNames = projects?.map((project) => project.name.toLowerCase());
  const isFirst = useRef(true);

  const handleChange = (input: string) => {
    setInputValue(input);

    if (inputValue?.length < 2) {
      handleProjectName(undefined);
    }

    const name = projectNames?.find(
      (name) =>
        inputValue?.length > 2 &&
        name?.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (name) {
      handleProjectName(name);
    }
  };

  const handleLevel = (level?: string) => {
    if (level) {
      level = level.toLowerCase();
    }
    handleFilters({ level: level as IssueLevel });
  };

  const handleStatus = (status?: string) => {
    if (status === "Unresolved") {
      status = "open";
    }
    if (status) {
      status = status.toLowerCase();
    }
    handleFilters({ status: status as IssueStatus });
  };

  const handleProjectName = useCallback(
    (projectName) => handleFilters({ project: projectName?.toLowerCase() }),
    [handleFilters]
  );

  useEffect(() => {
    const newObj: { [key: string]: string } = {
      ...filters,
    };

    Object.keys(newObj).forEach((key) => {
      if (newObj[key] === undefined) {
        delete newObj[key];
      }
    });

    const url = {
      pathname: router.pathname,
      query: { ...newObj },
    };

    if (routerQueryProjectName && isFirst) {
      handleProjectName(routerQueryProjectName);
      setInputValue(routerQueryProjectName || "");
      isFirst.current = false;
    }

    router.push(url, undefined, { shallow: true });
  }, [filters.level, filters.status, filters.project]);

  return (
    <Container>
      <Select
        placeholder="Status"
        defaultValue="Status"
        width="8rem"
        data-cy="filter-by-status"
      >
        <Option value={undefined} handleCallback={handleStatus}>
          --None--
        </Option>
        <Option value="Unresolved" handleCallback={handleStatus}>
          Unresolved
        </Option>
        <Option value="Resolved" handleCallback={handleStatus}>
          Resolved
        </Option>
      </Select>

      <Select
        placeholder="Level"
        defaultValue="Level"
        width="8rem"
        data-cy="filter-by-level"
      >
        <Option value={undefined} handleCallback={handleLevel}>
          --None--
        </Option>
        <Option value="Error" handleCallback={handleLevel}>
          Error
        </Option>
        <Option value="Warning" handleCallback={handleLevel}>
          Warning
        </Option>
        <Option value="Info" handleCallback={handleLevel}>
          Info
        </Option>
      </Select>

      <Input
        handleChange={handleChange}
        value={inputValue}
        label="project name"
        placeholder="Project Name"
        iconSrc="/icons/search-icon.svg"
        data-cy="filter-by-project"
      />
    </Container>
  );
}
