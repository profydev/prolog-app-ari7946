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
import { useProjects } from "@features/projects";
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
  const { data: projects } = useProjects();
  // const router = useRouter();
  // const routerQueryProjectName =
  //   (router.query.projectName as string)?.toLowerCase() || undefined;
  const [inputValue, setInputValue] = useState(filters.project || "");
  const projectNames = projects?.map((project) => project.name.toLowerCase());
  // const isFirst = useRef(true);
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

  // useEffect(() => {
  //   const newObj: { [key: string]: string } = {
  //     ...filters,
  //   };

  //   Object.keys(newObj).forEach((key) => {
  //     if (newObj[key] === undefined) {
  //       delete newObj[key];
  //     }
  //   });

  //   const url = {
  //     pathname: router.pathname,
  //     query: {
  //       page: router.query.page || 1,
  //       ...newObj,
  //     },
  //   };

  //   if (routerQueryProjectName && isFirst) {
  //     handleProjectName(routerQueryProjectName);
  //     setInputValue(routerQueryProjectName || "");
  //     isFirst.current = false;
  //   }

  //   router.push(url, undefined, { shallow: false });
  // }, [filters.level, filters.status, filters.project, router.query.page]);

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
