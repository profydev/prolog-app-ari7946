import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (props) => {
  const [value, setValue] = useState<string>("");
  const handleChange = (input: string) => {
    setValue(input);
  };

  return (
    <div style={{ padding: 50 }}>
      <Input {...props} handleChange={handleChange} value={value} />
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  iconSrc: "./icons/email-icon.svg",
  placeholder: "olivia@untitledui.com",
  label: "Email",
  displayLabel: false,
  hint: "This is a hint text to help user.",
  error: false,
  errorMessage: "This is an error message.",
};
Default.parameters = {
  viewMode: "docs",
};
