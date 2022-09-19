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
      <Select placeholder="Select team member">
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
Default.args = {};
Default.parameters = {
  viewMode: "docs",
};
