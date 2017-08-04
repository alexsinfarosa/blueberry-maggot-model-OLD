import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";
import CustomLabel from "./CustomLabel";

import { Flex, Box, Heading } from "rebass";

@inject("store")
@observer
export default class Graph extends Component {
  render() {
    const { ACISData } = this.props.store.app;

    // Change the aspect ratio when viewed on different devices
    let aspect;
    const w = window.innerWidth;
    if (w >= 0 && w <= 401) {
      aspect = 1;
    } else if (w > 401 && w <= 768) {
      aspect = 1.5;
    } else {
      aspect = 2;
    }
    return (
      <Flex my={2} column>
        <Heading fontSize={[2, 2, 3]}>Cumulative Degree Day Graph </Heading>
        <Box w={["100%", "90%", "90%"]}>
          <ResponsiveContainer width="100%" aspect={aspect}>
            <LineChart
              data={ACISData.slice()}
              margin={{ top: 20, right: 0, left: -25, bottom: 20 }}
            >
              <XAxis dataKey="dateGraph" tick={<CustomLabel />} />
              <YAxis />
              <CartesianGrid stroke="#E9E9E9" strokeDasharray="7 7" />
              <Tooltip />
              <Legend
                align="right"
                verticalAlign="top"
                height={48}
                payload={[
                  {
                    value: "Cumulative degree day",
                    type: "line",
                    color: "#4C4177"
                  }
                ]}
              />
              <Line
                dot={false}
                activeDot={{ r: 7 }}
                type="monotone"
                dataKey="cdd"
                stroke="#4C4177"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    );
  }
}
