import React, { useState, useRef } from "react";
import { color, space, textFont, breakpoint } from "@styles/theme";
import { Button, ButtonColor } from "@features/ui";
import styled from "styled-components";
import Modal from "react-modal";

// (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#contact-modal");

const IconContainer = styled.div`
  position: fixed;
  cursor: pointer;
  z-index: 2;
  bottom: ${space(10)};
  right: ${space(10)};
  width: calc(${space(10)} + ${space(4)});
  height: calc(${space(10)} + ${space(4)});
  background-color: ${color("primary", 600)};
  border-radius: 50%;
  display: grid;
  place-content: center;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    maxWidth: "400px",
    height: "288px",
    borderRadius: "12px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.7)",
  },
};

const Icon = styled.img``;

const EmailIcon = styled(Icon)`
  color: black;
  width: ${space(12)};
  height: ${space(10)};
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding-inline: 0;

  @media (min-width: ${breakpoint("desktop")}) {
    padding-inline: ${space(6)};
  }
`;

const Title = styled.p`
  ${textFont("md", "semibold")}
  font-size: ${space(5)};
  color: ${color("gray", 900)};
  margin: 0;
`;

const Text = styled.p`
  ${textFont("sm", "regular")}
  text-align: center;
  line-height: ${space(5)};
  color: ${color("gray", 500)};
  margin: 0;
`;

const ModalButton = styled(Button)`
  width: 100%;
  font-size: ${space(4)};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export function ContactModal() {
  const [isModalOpen, setIsModalOPen] = useState(false);

  const toggle = () => setIsModalOPen(!isModalOpen);

  return (
    <div id="contact-modal">
      <Modal isOpen={isModalOpen} shouldCloseOnEsc style={customStyles}>
        <ModalContent>
          <EmailIcon src="/icons/email-modal.svg" />
          <Title>Contact Us Via Email</Title>
          <Text>
            Any questions? Send us an email at prolog@profy.dev. We usually
            answer within 24 hours.
          </Text>
          <ButtonGroup>
            <ModalButton color={ButtonColor.gray} onClick={toggle}>
              Cancel
            </ModalButton>
            <ModalButton
              onClick={() => {
                window.open(
                  "mailto:support@prolog-app.com?subject=Support Request:"
                );
                toggle();
              }}
            >
              Open Email App
            </ModalButton>
          </ButtonGroup>
        </ModalContent>
      </Modal>
      <IconContainer onClick={toggle}>
        <Icon src="/icons/support.svg" />
      </IconContainer>
    </div>
  );
}
