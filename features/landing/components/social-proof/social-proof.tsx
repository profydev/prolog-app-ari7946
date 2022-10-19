import React from "react";
import styled from "styled-components";
import { displayFont, space, color, textFont } from "@styles/theme";

type Company = {
  name: string;
  logo: string;
};

type SocialProofProps = {
  socialProof: {
    companies: Company[];
    title: string;
    theme?: string;
    sectionType?: string;
  };
};

const Container = styled.section`
  margin: 0 auto;
  height: 296px;
  display: grid;
  align-content: center;
  row-gap: ${space(1)};
  width: 100%;
  background-color: ${color("gray", 50)};
`;

const Title = styled.h3`
  text-align: center;
  color: ${color("gray", 500)};
  ${textFont("md", "medium")}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  height: 5rem;
  width: 90%;
  margin: 0 auto;
`;

const Item = styled.li`
  display: flex;
  gap: ${space(3)};
  color: ${color("gray", 900)};
  ${displayFont("sm", "medium")}
`;

export function SocialProof({
  socialProof: { companies, title },
}: SocialProofProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <List>
        {/* slice off last company for desktop view */}
        {companies?.slice(0, -1).map(({ name, logo }) => (
          <Item key={name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt={name} />
            <p>{name}</p>
          </Item>
        ))}
      </List>
    </Container>
  );
}
