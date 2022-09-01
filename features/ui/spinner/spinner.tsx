import styled, { keyframes } from "styled-components";
import { color, space } from "@styles/theme";

const Container = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  to {
    -webkit-transform: rotate(360deg);
  }
`;

const SpinnerOutline = styled.div`
  width: ${space(10)};
  height: ${space(10)};
  border: 6px solid ${color("primary", 50)};
  border-radius: 50%;
  border-top-color: ${color("primary", 500)};
  animation: ${spin} 0.2s ease-in-out infinite;
  -webkit-animation: ${spin} 0.4s ease-in-out infinite;
  margin: 0 auto;
`;

export function Spinner() {
  return (
    <Container>
      <SpinnerOutline />
    </Container>
  );
}
