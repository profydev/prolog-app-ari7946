import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, Option } from "./";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Select>;

const selectData = [
  "Phoenix Baker",
  "Olivia Rhye",
  "Lana Steiner",
  "Demi Wilkinson",
  "Candice Wu",
  "Natali Craig",
  "Drew Cano",
];

const Template: ComponentStory<typeof Select> = (props) => {
  return (
    <div style={{ padding: 50 }}>
      <Select {...props}>
        {selectData.map((name) => (
          <Option key={name} value={name}>
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  placeholder: "Select team member",
  iconSrc: "./icons/person-select.svg",
  label: "Team member",
  hint: "This is a hint text to help user.",
  errorMessage: "",
};
Default.parameters = {
  viewMode: "docs",
};
