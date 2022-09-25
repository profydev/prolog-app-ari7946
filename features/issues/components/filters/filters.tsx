import React from "react";
import styled from "styled-components";
import { Select, Option } from "@features/ui";
import { useFilters } from "@features/issues";

const Container = styled.div`
  padding-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
`;

export function Filters() {
  const { filters, handleFilters } = useFilters();

  const handleLevel = (value: any) => {
    handleFilters(value);
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
    </Container>
  );
}
