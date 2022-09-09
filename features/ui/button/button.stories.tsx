import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ButtonContainer } from "./button";

export default {
  title: "UI/ButtonContainer",
  component: ButtonContainer,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ButtonContainer>;

const Template: ComponentStory<typeof ButtonContainer> = () => (
  <div style={{ padding: 50 }}>
    <ButtonContainer>Button CTA</ButtonContainer>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  viewMode: "docs",
};
