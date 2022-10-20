import React from "react";
import styled from "styled-components";
import { displayFont, space, color, textFont, breakpoint } from "@styles/theme";
import Image from "next/image";

type ImageType = {
  height: number;
  src: string;
  width: number;
};

type HeroProps = {
  hero: {
    image: ImageType;
    sectionType?: string;
    subtitle: string;
    theme?: string;
    title: string;
  };
};

const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-block: ${space(24)};
  background-color: ${color("gray", 50)};
  @media (min-width: ${breakpoint("desktop")}) {
    padding-inline: none;
  }
`;

const Heading = styled.h1`
  text-align: center;
  margin-top: 0;
  font-size: ${space(8)};
  ${displayFont("md", "semibold")}
  @media (min-width: ${breakpoint("desktop")}) {
    ${displayFont("md", "semibold")}
    font-size: calc(${space(16)} - ${space(2)});
  }
`;

const SubHeading = styled.h2`
  max-width: calc(${space(24)} * 7 - ${space(6)});
  text-align: center;
  color: ${color("gray", 500)};
  ${textFont("md", "regular")}
  font-size: ${space(5)};
  line-height: ${space(8)};
  padding-bottom: ${space(12)};
  margin: 0;
`;

export function Hero({ hero: { image, subtitle, title } }: HeroProps) {
  const { height, src, width } = image;

  const formatedTitle = title
    .split(" ")
    .filter((word) => word !== "Application")
    .join(" ");

  return (
    <Container>
      <Heading>{formatedTitle}</Heading>
      <SubHeading>{subtitle}</SubHeading>
      <Image
        src={src}
        alt="laptop screen shows Prolong's issues page"
        width={width}
        height={height}
      />
    </Container>
  );
}
