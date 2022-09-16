import React from "react";
import styled from "styled-components";
import { color, space, breakpoint, textFont } from "@styles/theme";
import Link from "next/link";

type FooterProps = {
  appVersion?: string;
};

const Container = styled.footer`
  background-color: ${color("gray", 50)};
  height: calc(${space(20)} + ${space(24)});
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

const Nav = styled.div`
  margin-right: ${space(16)};
  order: 1;
  margin: 0 auto;

  @media (min-width: ${breakpoint("desktop")}) {
    order: 0;
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
    width: calc(${space(24)} * 3);
  }
`;

const ListItem = styled(Link)`
  display: inline-block;
`;

const Anchor = styled.a`
  display: inline-block;
  color: ${color("gray", 500)};
  ${textFont("md", "regular")};
  text-decoration: none;
`;

const FooterIcon = styled.img`
  display: block;
  width: ${space(6)} - 0.25;
  order: 2;

  @media (min-width: ${breakpoint("desktop")}) {
    order: 0;
  }
`;

export function Footer({ appVersion = "14.5.1" }: FooterProps) {
  return (
    <Container>
      <Version>Version: {appVersion}</Version>
      <Nav>
        <List>
          <ListItem href="/dashboard" passHref>
            <Anchor>Docs</Anchor>
          </ListItem>
          <ListItem href="/dashboard" passHref>
            <Anchor>API</Anchor>
          </ListItem>
          <ListItem href="/dashboard" passHref>
            <Anchor>Help</Anchor>
          </ListItem>
          <ListItem href="/dashboard" passHref>
            <Anchor>Community</Anchor>
          </ListItem>
        </List>
      </Nav>
      <FooterIcon src="/icons/logo-small.svg" alt="Profy logo" />
    </Container>
  );
}
