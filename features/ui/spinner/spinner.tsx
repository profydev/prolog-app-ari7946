import styled, { keyframes } from "styled-components";
import { color, space } from "@styles/theme";

const Container = styled.div`
  width: 100%;
  height: 27vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
`;

const SpinnerOutline = styled.div`
  width: ${space(12)};
  height: ${space(12)};
  border: ${space(2)} solid ${color("primary", 50)};
  border-radius: 50%;
  border-right-color: ${color("primary", 600)};
  border-right-radius: 20px;
  animation: ${spin} 0.2s ease-in-out infinite;
  -webkit-animation: ${spin} 0.4s ease-in-out infinite;
  margin: 0 auto;
`;

export function Spinner() {
  return (
    <Container className="spinner">
      <SpinnerOutline />
    </Container>
  );
}
