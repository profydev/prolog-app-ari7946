import React from "react";
import styled from "styled-components";
import { Select, Option } from "@features/ui";
import { useFilters, IssueLevel, IssueStatus } from "@features/issues";

const Container = styled.div`
  padding-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
`;

export function Filters() {
  const { handleFilters } = useFilters();

  const handleLevel = (level: IssueLevel) => {
    handleFilters({ level });
  };

  const handleStatus = (status: IssueStatus) => {
    handleFilters({ status });
  };

  return (
    <Container>
      <Select placeholder="Status" defaultValue="Status">
        <Option value={null} handleCallback={handleLevel}>
          --None--
        </Option>
        <Option value="error" handleCallback={handleLevel}>
          Error
        </Option>
        <Option value="warning" handleCallback={handleLevel}>
          Warning
        </Option>
        <Option value="info" handleCallback={handleLevel}>
          Info
        </Option>
      </Select>

      <Select placeholder="Status" defaultValue="Status">
        <Option value={null} handleCallback={handleStatus}>
          --None--
        </Option>
        <Option value="open" handleCallback={handleStatus}>
          Unresolved
        </Option>
        <Option value="resolved" handleCallback={handleStatus}>
          Resolved
        </Option>
      </Select>
    </Container>
  );
}
