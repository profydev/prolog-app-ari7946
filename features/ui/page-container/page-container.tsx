import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { SidebarNavigation } from "@features/ui";
import { color, displayFont, space, breakpoint, textFont } from "@styles/theme";
import Link from "next/link";

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

// Footer
const Footer = styled.footer`
  background-color: ${color("gray", 50)};
  height: 3.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: ${space(8)};
`;

const Version = styled.p`
  color: ${color("gray", 400)};
`;

const Nav = styled.nav`
  margin-right: ${space(16)};
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  position: inline-block;
  display: flex;
  gap: ${space(6)};
  list-style-type: none;
  width: 18rem;
  /* border: 1px solid red; */
  /* justify-content: space-between; */
`;

const ListItem = styled(Link)`
  position: block;
`;

const Anchor = styled.a`
  display: block;
  color: ${color("gray", 500)};
  font: ${textFont("sm", "regular")};
`;

const MenuIcon = styled.img`
  display: block;
  width: ${space(6)} - 0.25;
`;

export function PageContainer({ children, title, info }: PageContainerProps) {
  return (
    <Container>
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
        <Footer>
          <Version>Version: 14.5.1</Version>
          <Nav>
            <List>
              <ListItem href="/dashboard">
                <Anchor>Docs</Anchor>
              </ListItem>
              <ListItem href="/dashboard">
                <Anchor>API</Anchor>
              </ListItem>
              <ListItem href="/dashboard">
                <Anchor>Help</Anchor>
              </ListItem>
              <ListItem href="/dashboard">
                <Anchor>Community</Anchor>
              </ListItem>
            </List>
          </Nav>
          <MenuIcon src="/icons/logo-small.svg" alt="logo" />
        </Footer>
      </Main>
    </Container>
  );
}
