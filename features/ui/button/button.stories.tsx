import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  Button,
  ButtonSize,
  ButtonColor,
  IconOptions,
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
  iconOptions = IconOptions.none,
  ...buttonProps
}: ButtonProps) => (
  <div style={{ padding: 50 }}>
    <Button
      size={size}
      color={color}
      iconOptions={iconOptions}
      {...buttonProps}
    >
      {children}
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: "Button CTA",
  size: ButtonSize.md,
  color: ButtonColor.primary,
  iconOptions: IconOptions.none,
  iconSrc: "/icons/button-icon.svg",
  disabled: false,
};
Default.parameters = {
  viewMode: "docs",
};
