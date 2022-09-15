import React from "react";
import { space, color, textFont } from "@styles/theme";
import styled from "styled-components";

type ErrorMessageProps = {
  handleRefresh: () => void;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${color("error", 300)};
  color: ${color("error", 600)};
  background-color: ${color("error", 25)};
  border-radius: 10px;
  font: ${textFont("md", "semibold")};
`;

const FetchDataContainer = styled.div`
  display: flex;
  min-width: 7rem;
  align-items: center;
  cursor: pointer;
`;

const MessageContainer = styled.div`
  display: flex;
`;

const ErrorIcon = styled.img`
  display: block;
  width: ${space(5)};
  padding-inline: ${space(2)};
`;

const RightArrow = styled.img`
  display: block;
  width: ${space(5)};
  color: ${color("error", 600)};
  padding-inline: ${space(2)};
`;

export function ErrorMessage({ handleRefresh }: ErrorMessageProps) {
  return (
    <Container>
      <MessageContainer>
        <ErrorIcon src="/icons/error-icon.svg" />
        <p data-cy="project-error-message">
          There was a problem while loading the project data
        </p>
      </MessageContainer>
      <FetchDataContainer
        onClick={handleRefresh}
        data-cy="project-error-refetch"
      >
        <p>Try again</p>
        <RightArrow src="/icons/error-arrow-right.svg" />
      </FetchDataContainer>
    </Container>
  );
}
