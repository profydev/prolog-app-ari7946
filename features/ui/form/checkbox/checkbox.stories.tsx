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

const Template: ComponentStory<typeof CheckBox> = (...props) => {
  const [isCheckedA, setIsCheckedA] = useState<boolean>(false);

  const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedA(e.target.checked);
  };

  return (
    <div style={{ padding: 50 }}>
      <CheckBox
        checked={isCheckedA}
        {...props}
        handleChange={handleChangeA}
        label="Label"
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
  displayLabel: true,
};
Default.parameters = {
  viewMode: "docs",
};
