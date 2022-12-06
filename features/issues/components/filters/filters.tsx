import React, { useState } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";
import {
  Select as UnstyledSelect,
  Option,
  Button as UnstyledButton,
  IconOptions,
  Input as UnstyledInput,
} from "@features/ui";
import { useFilters } from "../../hooks";
import { IssueLevel, IssueStatus } from "../../types/issue.types";
import { breakpoint } from "@styles/theme";
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

const Button = styled(UnstyledButton)`
  height: 2.5rem;
  min-width: 8rem;
  width: 100%;

  @media (min-width: ${breakpoint("desktop")}) {
    width: auto;
  }
`;

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

const Select = styled(UnstyledSelect)`
  width: 100%;

  @media (min-width: ${breakpoint("desktop")}) {
    width: 8rem;
  }
`;

const Input = styled(UnstyledInput)`
  width: 100%;
  box-sizing: border-box;
`;

export function Filters() {
  const { updateFilters, filters } = useFilters();
  const [project, setProject] = useState(filters.project);
  const debouncedUpdateFilters = useDebouncedCallback(updateFilters, 300);

  const handleChange = (input: string) => {
    setProject(input);
    debouncedUpdateFilters({ project: input });
  };

  const handleLevel = (level?: string) => {
    updateFilters({ level: level as IssueLevel });
  };

  const handleStatus = (status?: string) => {
    updateFilters({ status: status as IssueStatus });
  };

  return (
    <Container>
      <Button
        iconSrc="/icons/select-icon-white.svg"
        iconOptions={IconOptions.leading}
      >
        Resolve selected issues
      </Button>

      <RightContainer>
        <Select
          placeholder="Status"
          value={filters.status}
          onChange={handleStatus}
          options={statusOptions}
        >
          {statusOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Level"
          value={filters.level}
          onChange={handleLevel}
          options={levelOptions}
        >
          {levelOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Select>

        <Input
          handleChange={handleChange}
          value={project || ""}
          label="project name"
          placeholder="Project Name"
          iconSrc="/icons/search-icon.svg"
        />
      </RightContainer>
    </Container>
  );
}
