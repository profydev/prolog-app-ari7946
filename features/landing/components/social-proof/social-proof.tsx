import React from "react";
import styled from "styled-components";
import { displayFont, space, color, textFont, breakpoint } from "@styles/theme";

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
  padding-block: ${space(20)};
  display: grid;
  align-content: center;
  row-gap: ${space(1)};
  width: 100%;
  background-color: #fff;
  @media (min-width: ${breakpoint("desktop")}) {
    background-color: ${color("gray", 50)};
  }
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
  width: 90%;
  margin: 0 auto;
  gap: 2rem;
`;

const Item = styled.li`
  display: flex;
  color: ${color("gray", 900)};
  gap: ${space(3)};
  ${textFont("md", "semibold")}

  @media (min-width: ${breakpoint("desktop")}) {
    ${displayFont("sm", "medium")}
    gap: ${space(3)};
    &:last-child {
      display: none;
    }
    }
  }
`;

export function SocialProof({
  socialProof: { companies, title },
}: SocialProofProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <List>
        {/* slice off last company for desktop view */}
        {companies?.map(({ name, logo }) => (
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
