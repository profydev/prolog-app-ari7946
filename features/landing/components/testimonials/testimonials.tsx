import React from "react";
import styled from "styled-components";
import { displayFont, space, color, textFont } from "@styles/theme";
import Image from "next/image";

type UserImage = {
  src: string;
  width: number;
  height: number;
};

type Testimonial = {
  title: string;
  text: string;
  userName: string;
  userRole: string;
  userCompany: string;
  userImage: UserImage;
};

type TestimonialsProps = {
  testimonials: {
    sectionType?: string;
    theme?: string;
    title: string;
    subtitle: string;
    testimonials: Testimonial[];
  };
};

const Container = styled.section`
  width: 100%;
  margin-block: ${space(24)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h2`
  text-align: center;
  ${displayFont("md", "semibold")}
  font-size: calc(${space(16)} - ${space(2)});
  margin-top: 0;
`;

const SubHeading = styled.h3`
  max-width: calc(${space(24)} * 7 - ${space(6)});
  text-align: center;
  color: ${color("gray", 500)};
  ${textFont("md", "regular")}
  font-size: ${space(5)};
  line-height: ${space(8)};
  padding-bottom: ${space(12)};
  margin: 0;
`;

const CardsContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Card = styled.article<{
  primary: boolean;
}>`
  width: 350px;
  height: 416px;
  text-align: center;
  padding-inline: ${space(6)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ primary }) =>
    primary ? color("primary", 50) : color("gray", 50)};
`;

const CardTitle = styled.h4`
  color: ${color("primary", 700)};
  font-size: ${space(4)};
  margin-bottom: 0;
`;

const CardText = styled.p<{
  primary: boolean;
}>`
  color: ${({ primary }) =>
    primary ? color("primary", 900) : color("gray", 900)};
  font-size: ${space(6)};
  line-height: ${space(8)};
`;

const CardFigure = styled.figure`
  margin-top: ${space(6)};
`;

const CardFigcaption = styled.figcaption<{
  primary: boolean;
}>`
  padding-top: ${space(4)};
  color: ${({ primary }) =>
    primary ? color("primary", 900) : color("gray", 900)};
  font-size: ${space(4)};
`;

const UserDetails = styled.p<{
  primary: boolean;
}>`
  color: ${({ primary }) =>
    primary ? color("primary", 700) : color("gray", 500)};
  ${textFont("sm", "regular")}
`;

export function Testimonials({
  testimonials: { title, subtitle, testimonials },
}: TestimonialsProps) {
  return (
    <Container>
      <Heading>{title}</Heading>
      <SubHeading>{subtitle}</SubHeading>
      <CardsContainer>
        {testimonials.map(
          (
            { userName, userRole, userCompany, userImage, text, title },
            index
          ) => {
            // primary is true for odd numbers (i.e. first and third card)
            const primary = index % 2 === 0;
            return (
              <Card key={userName} primary={primary}>
                <CardTitle>{title}</CardTitle>
                <CardText primary={primary}>{text}</CardText>
                <CardFigure>
                  <Image
                    src={userImage.src}
                    alt={`picture of ${userName}`}
                    width={userImage.width}
                    height={userImage.height}
                  />
                  <CardFigcaption primary={primary}>{userName}</CardFigcaption>
                  <UserDetails primary={primary}>
                    {userRole}, {userCompany}
                  </UserDetails>
                </CardFigure>
              </Card>
            );
          }
        )}
      </CardsContainer>
    </Container>
  );
}
