import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  Button,
  ButtonSize,
  ButtonColor,
  ButtonIcon,
  ButtonProps,
} from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({
  children = "Button CTA",
  size = ButtonSize.md,
  color = ButtonColor.primary,
  icon = ButtonIcon.none,
  ...buttonProps
}: ButtonProps) => (
  <div style={{ padding: 50 }}>
    <Button size={size} color={color} icon={icon} {...buttonProps}>
      {children}
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: "Button CTA",
  size: ButtonSize.md,
  color: ButtonColor.primary,
  icon: ButtonIcon.none,
  disabled: false,
};
Default.parameters = {
  viewMode: "docs",
};
