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
  const router = useRouter();
  const { handleFilters, filters } = useFilters();
  const { data: projects } = useProjects();
  const [inputValue, setInputValue] = useState<string>("");
  const routerQueryProjectName =
    (router.query.projectName as string)?.toLowerCase() || undefined;
  const [projectName, setProjectName] = useState<string | undefined>(
    routerQueryProjectName || undefined
  );
  const projectNames = projects?.map((project) => project.name.toLowerCase());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleLevel = (level: IssueLevel) => {
    handleFilters({ level });
  };

  const handleStatus = (status: IssueStatus) => {
    handleFilters({ status });
  };

  const handleProjectName = useCallback(
    (projectName) => handleFilters({ project: projectName?.toLowerCase() }),
    [handleFilters, routerQueryProjectName]
  );

  useEffect(() => {
    if (inputValue?.length < 2) {
      setProjectName(undefined);
      handleProjectName(undefined);
      return;
    }
    const name = projectNames?.find(
      (name) =>
        inputValue?.length > 2 &&
        name?.toLowerCase().includes(inputValue.toLowerCase())
    );

    setProjectName(
      (prevName) => name?.toLowerCase() || prevName?.toLowerCase()
    );
    handleProjectName(projectName?.toLowerCase());
  }, [inputValue?.toLowerCase()]);

  useEffect(() => {
    handleProjectName(routerQueryProjectName);
    setProjectName(routerQueryProjectName?.toLowerCase());
    setInputValue(routerQueryProjectName?.toLowerCase() as string);
  }, [routerQueryProjectName]);

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
        <Option value="Open" handleCallback={handleStatus}>
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
