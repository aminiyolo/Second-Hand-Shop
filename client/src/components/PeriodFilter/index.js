import React from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;

const PeriodFilter = () => {
  return (
    <div>
      <Collapse>
        <Panel header="Period">
          <Radio.Group>
            <Radio />
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default PeriodFilter;
