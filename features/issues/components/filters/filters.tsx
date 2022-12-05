import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  Select,
  Option,
  Input,
  Button,
  IconOptions,
  NavigationContext,
} from "@features/ui";
import { useFilters } from "../../hooks";
import { IssueLevel, IssueStatus } from "../../types/issue.types";
import { useProjects } from "@features/projects";
import { breakpoint } from "@styles/theme";
import { useWindowSize } from "react-use";
import { OptionType } from "@features/ui/form/select/select";

const statusOptions = [
  { value: undefined, text: "--None--" },
  { value: IssueStatus.open, text: "Unresolved" },
  { value: IssueStatus.resolved, text: "Resolved" },
] as OptionType[];

const levelOptions = [
  { value: undefined, text: "--None--" },
  { value: IssueLevel.error, text: "Error" },
  { value: IssueLevel.warning, text: "Warning" },
  { value: IssueLevel.info, text: "Info" },
] as OptionType[];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-block: 1rem;
  width: 100%;
  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
    justify-content: space-between;
    order: initial;
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

const RightContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  order: -1;
  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
    gap: 3rem;
    order: initial;
  }
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
  const { width } = useWindowSize();
  const isMobileScreen = width <= 1023;
  const { isMobileMenuOpen } = useContext(NavigationContext);

  const handleChange = (input: string) => {
    setInputValue(input);

    if (inputValue?.length < 2) {
      handleProjectName(undefined);
      return;
    }

    const name = projectNames?.find((name) =>
      name?.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (name) {
      handleProjectName(name);
    }
  };

  const handleLevel = (level?: string) => {
    handleFilters({ level: level as IssueLevel });
  };

  const handleStatus = (status?: string) => {
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
      query: {
        page: router.query.page || 1,
        ...newObj,
      },
    };

    if (routerQueryProjectName && isFirst) {
      handleProjectName(routerQueryProjectName);
      setInputValue(routerQueryProjectName || "");
      isFirst.current = false;
    }

    router.push(url, undefined, { shallow: false });
  }, [filters.level, filters.status, filters.project, router.query.page]);

  return (
    <Container>
      <Button
        iconSrc="/icons/select-icon-white.svg"
        iconOptions={IconOptions.leading}
        style={{
          height: "2.5rem",
          minWidth: "8rem",
          ...(isMobileScreen && { width: "100%" }),
        }}
      >
        Resolve selected issues
      </Button>

      <RightContainer>
        <Select
          placeholder="Status"
          width={isMobileScreen ? "97%" : "8rem"}
          value={filters.status}
          onChange={handleStatus}
          options={statusOptions}
          data-cy="filter-by-status"
          style={{
            ...(isMobileMenuOpen && {
              opacity: 0,
            }),
          }}
        >
          {statusOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Level"
          width={isMobileScreen ? "97%" : "8rem"}
          value={filters.level}
          onChange={handleLevel}
          options={levelOptions}
          data-cy="filter-by-level"
          style={{
            ...(isMobileMenuOpen && {
              opacity: 0,
            }),
          }}
        >
          {levelOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Select>

        <Input
          handleChange={handleChange}
          value={inputValue}
          label="project name"
          placeholder="Project Name"
          iconSrc="/icons/search-icon.svg"
          data-cy="filter-by-project"
          style={{
            ...(isMobileScreen && { width: "94%", marginRight: "3rem" }),
            ...(isMobileMenuOpen && {
              opacity: 0,
            }),
          }}
        />
      </RightContainer>
    </Container>
  );
}
