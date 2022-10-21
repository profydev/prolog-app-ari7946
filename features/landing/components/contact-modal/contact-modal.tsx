import React, { useState } from "react";
import { color, displayFont, space, textFont } from "@styles/theme";
import styled from "styled-components";
import Modal from "react-modal";

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
    backgroundColor: "rgba(0,0,0,.9)",
  },
};

const Icon = styled.img``;

export function ContactModal() {
  const [isModalOpen, setIsModalOPen] = useState(false);

  const toggle = () => setIsModalOPen(!isModalOpen);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        style={customStyles}
      ></Modal>
      <IconContainer
        onClick={() => {
          toggle();
          window.open("mailto:support@prolog-app.com?subject=Support Request:");
        }}
      >
        <Icon src="/icons/support.svg" />
      </IconContainer>
    </>
  );
}
