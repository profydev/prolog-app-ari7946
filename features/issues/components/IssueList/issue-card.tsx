import React from "react";
import styled from "styled-components";
import capitalize from "lodash/capitalize";
import { ProjectLanguage } from "@features/projects";
import { Issue } from "@features/issues";
import { IssueLevel } from "../../types/issue.types";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { color, space, textFont } from "@styles/theme";

type IssueCardProps = {
  projectLanguage: ProjectLanguage;
  projectName: string;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

const Container = styled.article`
  width: inherit;
  height: 276px;
  margin-block: ${space(3)};
  border: 1px solid ${color("gray", 200)};
  box-sizing: border-box;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: ${space(2)};
  padding: ${space(5)};
  box-sizing: border-box;
  display: block;
  ${textFont("sm", "regular")}
`;

const TopContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const MiddleContainerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${color("gray", 500)};
`;

const BottomContainer = styled.div`
  width: 100%;
  margin-top: ${space(6)};
`;

const GraphImage = styled.img`
  display: block;
  width: inherit;
  height: 76px;
`;

const SubHeading = styled.h3`
  margin: ${space(6, 6, 3, 6)};
  text-align: left;
  color: ${color("gray", 500)};
  ${textFont("sm", "medium")};
`;

const LanguageIcon = styled.img`
  width: ${space(10)};
  margin-right: ${space(3)};
`;
const ErrorTypeAndMessage = styled.div`
  color: ${color("gray", 900)};
  width: inherit;
  white-space: nowrap;
`;

const ErrorType = styled.span`
  ${textFont("sm", "medium")}
`;

const FirstLineOfStackTrace = styled.p`
  padding: 0;
  margin: 0;
  color: ${color("gray", 500)};
  white-space: nowrap;
`;

export function IssueCard({
  projectLanguage,
  projectName,
  issue,
}: IssueCardProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  return (
    <Container>
      <TopContainer>
        <LanguageIcon
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <div>
          <ErrorTypeAndMessage>
            <ErrorType>
              ({projectName}) {name}:&nbsp; <br />
            </ErrorType>
            {message}
          </ErrorTypeAndMessage>
          <FirstLineOfStackTrace>{firstLineOfStackTrace}</FirstLineOfStackTrace>
        </div>
      </TopContainer>

      <MiddleContainer>
        <MiddleContainerItem>
          <SubHeading>Status</SubHeading>
          <Badge color={levelColors[level]} size={BadgeSize.sm}>
            {capitalize(level)}
          </Badge>
        </MiddleContainerItem>

        <MiddleContainerItem>
          <SubHeading>Events</SubHeading>
          {numEvents}
        </MiddleContainerItem>

        <MiddleContainerItem>
          <SubHeading>Users</SubHeading>
          {numUsers}
        </MiddleContainerItem>
      </MiddleContainer>

      <BottomContainer>
        <GraphImage src="/images/mobile-issue-graph.png" alt="issues graph" />
      </BottomContainer>
    </Container>
  );
}
