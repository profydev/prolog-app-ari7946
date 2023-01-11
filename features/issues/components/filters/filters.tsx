import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";
import { capitalize } from "lodash";

import {
  Select,
  Option,
  Input,
  Button,
  IconOptions,
  NavigationContext,
} from "@features/ui";
import {
  useFilters,
  IssueLevel,
  IssueStatus,
  IssueFilters,
} from "@features/issues";
import { useDebouncedCallback } from "use-debounce";

import { breakpoint } from "@styles/theme";
import { useWindowSize } from "react-use";

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

const getStatusDefaultValue = (filters: IssueFilters) => {
  if (!filters.status) {
    return "Status";
  }
  if (filters.status === IssueStatus.open) {
    return "Unresolved";
  }
  return "Resolved";
};

const getLevelDefaultValue = (filters: IssueFilters) => {
  if (!filters.level) {
    return "Level";
  }
  return capitalize(filters.level);
};

export function Filters() {
  const { handleFilters, filters } = useFilters();
  const debouncedHandleFilters = useDebouncedCallback(handleFilters, 300);
  const [inputValue, setInputValue] = useState(filters.project || "");
  const { width } = useWindowSize();
  const isMobileScreen = width <= 1023;
  const { isMobileMenuOpen } = useContext(NavigationContext);

  const handleChange = (project: string) => {
    setInputValue(project);
    debouncedHandleFilters({ project });
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
          defaultValue={getStatusDefaultValue(filters)}
          width={isMobileScreen ? "97%" : "8rem"}
          data-cy="filter-by-status"
          style={{
            ...(isMobileMenuOpen && {
              opacity: 0,
            }),
          }}
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
          defaultValue={getLevelDefaultValue(filters)}
          width={isMobileScreen ? "97%" : "8rem"}
          data-cy="filter-by-level"
          style={{
            ...(isMobileMenuOpen && {
              opacity: 0,
            }),
          }}
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
