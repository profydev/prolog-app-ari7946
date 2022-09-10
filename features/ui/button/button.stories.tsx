import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ButtonContainer,
  ButtonSize,
  ButtonColor,
  ButtonIcon,
  ButtonContainerProps,
} from "./button";

export default {
  title: "UI/ButtonContainer",
  component: ButtonContainer,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ButtonContainer>;

const Template: ComponentStory<typeof ButtonContainer> = ({
  children = "Button CTA",
  size = ButtonSize.md,
  color = ButtonColor.primary,
  icon = ButtonIcon.none,
}: ButtonContainerProps) => (
  <div style={{ padding: 50 }}>
    <ButtonContainer size={size} color={color} icon={icon}>
      {children}
    </ButtonContainer>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  viewMode: "docs",
};
