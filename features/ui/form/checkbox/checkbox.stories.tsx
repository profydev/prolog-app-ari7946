import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CheckBox } from "./checkbox";

export default {
  title: "UI/CheckBox",
  component: CheckBox,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = ({
  label = "Label",
  checkboxSize = "sm",
  checkPartly = false,
  disabled = false,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <div style={{ padding: 50 }}>
      <CheckBox
        label={label}
        checked={checked}
        checkboxSize={checkboxSize}
        handleChange={handleChecked}
        checkPartly={checkPartly}
        disabled={disabled}
      />
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  checked: false,
  label: "Label",
  checkboxSize: "sm",
  checkPartly: false,
  disabled: false,
};
Default.parameters = {
  viewMode: "docs",
};
