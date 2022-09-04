import React from "react";
import styled from "styled-components";
import { color, space, breakpoint, textFont } from "@styles/theme";
import Link from "next/link";

const Container = styled.footer`
  background-color: ${color("gray", 50)};
  height: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-inline: 0;

  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
    justify-content: space-between;
    height: 3.7rem;
    padding-inline: ${space(8)};
  }
`;

const Version = styled.p`
  color: ${color("gray", 400)};
  order: 3;
  padding: 0;
  margin: 0;

  @media (min-width: ${breakpoint("desktop")}) {
    order: 0;
    padding: initial;
    margin: initial;
  }
`;

const Nav = styled.nav`
  margin-right: ${space(16)};
  order: 1;
  margin: 0 auto;

  @media (min-width: ${breakpoint("desktop")}) {
    order: 0;
    margin-right: 0;
    margin: 0 auto;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  gap: ${space(6)};
  list-style-type: none;
  width: 100%;

  @media (min-width: ${breakpoint("desktop")}) {
    width: 18rem;
  }
`;

const ListItem = styled(Link)`
  display: inline-block;
`;

const Anchor = styled.a`
  display: inline-block;
  color: ${color("gray", 500)};
  font: ${textFont("sm", "regular")};
`;

const FooterIcon = styled.img`
  display: block;
  width: ${space(6)} - 0.25;
  order: 2;

  @media (min-width: ${breakpoint("desktop")}) {
    order: 0;
  }
`;

export function Footer() {
  return (
    <Container>
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
      <FooterIcon src="/icons/logo-small.svg" alt="logo" />
    </Container>
  );
}
