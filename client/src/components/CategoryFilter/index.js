import React from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CategoryFilter = () => {
  return (
    <div>
      <Collapse>
        <Panel header="Category">
          <Checkbox />
        </Panel>
      </Collapse>
    </div>
  );
};

export default CategoryFilter;
