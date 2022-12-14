import { useRouter } from "next/router";
import styled from "styled-components";
import { useIssues } from "@features/issues";
import { ProjectLanguage, useProjects } from "@features/projects";
import { color, space, textFont, breakpoint } from "@styles/theme";
import { Button, ButtonColor } from "@features/ui";
import { IssueRow } from "./Issue-row";
import { Filters } from "../filters";
import { useWindowSize } from "react-use";
import { IssueCard } from "./issue-card";

const Container = styled.div`
  width: 100%;
`;

const BottomContainer = styled.div`
  background: white;
  border: none;
  box-sizing: border-box;
  overflow: hidden;

  @media (min-width: ${breakpoint("desktop")}) {
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
      0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    border-radius: ${space(2)};
    border: 1px solid ${color("gray", 200)};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  border-bottom: 1px solid ${color("gray", 200)};
`;

const HeaderCell = styled.th`
  padding: ${space(3, 6)};
  text-align: left;
  color: ${color("gray", 500)};
  ${textFont("xs", "medium")};
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space(4, 6)};
  border-top: 1px solid ${color("gray", 200)};
`;

const PaginationButton = styled.button`
  height: 38px;
  padding: ${space(0, 4)};
  background: white;
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;

  &:not(:first-of-type) {
    margin-left: ${space(3)};
  }
`;

const PageInfo = styled.div`
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")}
`;

const PageNumber = styled.span`
  ${textFont("sm", "medium")}
`;

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const { width } = useWindowSize();
  const isMobileScreen = width <= 1023;
  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });

  const issuesPage = useIssues(page);
  const projects = useProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>
  );

  const projectIdToName = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.name,
    }),
    {} as Record<string, string>
  );

  const { items, meta } = issuesPage.data || {};

  return (
    <Container>
      <Filters />
      <BottomContainer>
        {isMobileScreen ? (
          <>
            {(items || []).map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
                projectName={projectIdToName[issue.projectId]}
              />
            ))}
            <Button
              style={{
                width: "100%",
                border: `1px solid gray`,
                marginTop: "2rem",
              }}
              color={ButtonColor.emptyGray}
            >
              Load more
            </Button>
          </>
        ) : (
          <>
            <Table>
              <thead>
                <HeaderRow>
                  <HeaderCell>Issue</HeaderCell>
                  <HeaderCell>Level</HeaderCell>
                  <HeaderCell>Events</HeaderCell>
                  <HeaderCell>Users</HeaderCell>
                </HeaderRow>
              </thead>
              <tbody>
                {(items || []).map((issue) => (
                  <IssueRow
                    key={issue.id}
                    issue={issue}
                    projectLanguage={projectIdToLanguage[issue.projectId]}
                    projectName={projectIdToName[issue.projectId]}
                  />
                ))}
              </tbody>
            </Table>
            <PaginationContainer>
              <div>
                <PaginationButton
                  onClick={() => navigateToPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </PaginationButton>
                <PaginationButton
                  onClick={() => navigateToPage(page + 1)}
                  disabled={page === meta?.totalPages}
                >
                  Next
                </PaginationButton>
              </div>
              <PageInfo>
                Page <PageNumber>{meta?.currentPage}</PageNumber> of{" "}
                <PageNumber>{meta?.totalPages}</PageNumber>
              </PageInfo>
            </PaginationContainer>
          </>
        )}
      </BottomContainer>
    </Container>
  );
}
