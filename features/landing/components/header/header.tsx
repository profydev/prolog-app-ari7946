import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@features/ui";
import { useQueryClient } from "react-query";
import { getProjects } from "@features/projects";
import { color, space, breakpoint, textFont } from "@styles/theme";
import Link from "next/link";
import { useRouter } from "next/router";

const Container = styled.header`
  /* width: 90%; */
  height: ${space(20)};
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  margin-inline: auto;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  gap: ${space(6)};
  list-style-type: none;
  width: 100%;
  display: none;
  @media (min-width: ${breakpoint("desktop")}) {
    display: flex;
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

export function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    // prefetch projects for the dashboard section
    queryClient.prefetchQuery(["projects"], getProjects);
  }, [queryClient]);

  return (
    <Container>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/logo-large.svg" alt="Prolog logo" />

      <List>
        <ListItem href="/" passHref>
          <Anchor>Home</Anchor>
        </ListItem>
        <ListItem href="/products" passHref>
          <Anchor>Products</Anchor>
        </ListItem>
        <ListItem href="/documentation" passHref>
          <Anchor>Documentation</Anchor>
        </ListItem>
        <ListItem href="/pricing" passHref>
          <Anchor>Pricing</Anchor>
        </ListItem>
      </List>

      <Button
        style={{ height: "44px", minWidth: "165px" }}
        onClick={() => {
          router.prefetch("/dashboard");
          router.push("/dashboard");
        }}
      >
        Open Dashboard
      </Button>
    </Container>
  );
}
