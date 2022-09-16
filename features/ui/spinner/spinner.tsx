import styled, { keyframes } from "styled-components";
import { color, space } from "@styles/theme";

const Container = styled.div`
  width: 100%;
  margin-top: calc(${space(20)} + ${space(10)});
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerOutline = styled.div`
  width: ${space(16)};
  height: ${space(16)};
  border: ${space(2)} solid ${color("primary", 50)};
  border-radius: 50%;
  border-right-color: ${color("primary", 600)};
  animation: ${spin} 0.2s ease-in-out infinite;
  margin: 0 auto;
`;

export function Spinner() {
  return (
    <Container className="spinner">
      <SpinnerOutline />
    </Container>
  );
}
