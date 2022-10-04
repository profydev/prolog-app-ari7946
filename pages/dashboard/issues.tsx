import { PageContainer } from "@features/ui";
import { IssueList } from "@features/issues";
import type { NextPage } from "next";
import { FiltersProvider } from "@features/issues";

const IssuesPage: NextPage = () => {
  return (
    <FiltersProvider>
      <PageContainer
        title="Issues"
        info="Overview of errors, warnings, and events logged from your projects."
      >
        <IssueList />
      </PageContainer>
    </FiltersProvider>
  );
};

export default IssuesPage;
