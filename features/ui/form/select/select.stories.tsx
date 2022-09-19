import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "./select";
import { Option } from "./option";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (props) => {
  return (
    <div style={{ padding: 50 }}>
      <Select>
        <Option value="one">One</Option>
        <Option value="two">Two</Option>
        <Option value="three">Three</Option>
        <Option value="four">Four</Option>
      </Select>
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  viewMode: "docs",
};
