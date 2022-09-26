import React from "react";
import styled from "styled-components";
import { Select, Option, Input } from "@features/ui";
import { useFilters, IssueLevel, IssueStatus } from "@features/issues";

const Container = styled.div`
  padding-bottom: 2rem;
  display: flex;
  gap: 3rem;
  justify-content: flex-end;
`;

export function Filters() {
  const { handleFilters, inputValue, setInputValue } = useFilters();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleLevel = (level: IssueLevel) => {
    handleFilters({ level });
  };

  const handleStatus = (status: IssueStatus) => {
    handleFilters({ status });
  };

  return (
    <Container>
      <Select placeholder="Status" defaultValue="Status" width="8rem">
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

      <Select placeholder="Level" defaultValue="Level" width="8rem">
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
      />
    </Container>
  );
}
