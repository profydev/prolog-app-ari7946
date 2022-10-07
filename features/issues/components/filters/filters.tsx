import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Select, Option, Input } from "@features/ui";
import { useFilters, IssueLevel, IssueStatus } from "@features/issues";
import { useProjects } from "@features/projects";

import { useRouter } from "next/router";

const Container = styled.div`
  padding-bottom: 2rem;
  display: flex;
  gap: 3rem;
  justify-content: flex-end;
`;

export function Filters() {
  const { handleFilters } = useFilters();
  const { data: projects } = useProjects();
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const routerQueryProjectName =
    (router.query.projectName as string)?.toLowerCase() || undefined;
  const projectNames = projects?.map((project) => project.name.toLowerCase());

  const handleChange = (input: string) => {
    setInputValue((prevInput) => (prevInput === input ? prevInput : input));

    if (inputValue?.length < 2) {
      handleProjectName(undefined);
    }

    const name = projectNames?.find(
      (name) =>
        inputValue?.length > 2 &&
        name?.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (name) handleProjectName(inputValue?.toLowerCase());
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
    handleProjectName(routerQueryProjectName);
    setInputValue(routerQueryProjectName || "");
  }, [routerQueryProjectName, handleProjectName]);

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
