import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { SidebarNavigation, Footer } from "@features/ui";
import { color, displayFont, space, breakpoint, textFont } from "@styles/theme";
import { FiltersProvider } from "@features/issues";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
  info: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${color("gray", 900)};

  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  min-height: calc(
    100vh - 2 * ${space(10)} - ${({ theme }) => theme.size.headerHeight}
  );
  margin-top: ${({ theme }) => theme.size.headerHeight};
  padding: ${space(8, 3)};
  background: white;
  flex-grow: 1;

  @media (min-width: ${breakpoint("desktop")}) {
    min-height: calc(100vh - ${space(24)} - 2 * ${space(8)});
    margin-top: ${space(3)};
    padding: ${space(8)};
    border-top-left-radius: ${space(10)};
  }
`;

const Title = styled.h1`
  margin: ${space(0, 0, 1)};
  color: ${color("gray", 900)};
  ${displayFont("sm", "medium")}
`;

const Info = styled.div`
  margin-bottom: ${space(8)};
  color: ${color("gray", 500)};
  ${textFont("md", "regular")}
`;

export function PageContainer({ children, title, info }: PageContainerProps) {
  return (
    <Container>
      <FiltersProvider>
        <Head>
          <title>ProLog - {title}</title>
          <meta name="description" content="Error monitoring" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <SidebarNavigation />
        <Main>
          <ContentContainer>
            <Title>{title}</Title>
            <Info>{info}</Info>
            {children}
          </ContentContainer>
          <Footer />
        </Main>
      </FiltersProvider>
    </Container>
  );
}
