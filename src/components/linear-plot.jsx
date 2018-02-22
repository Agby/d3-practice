// @flow

import React from 'react'
import * as d3 from 'd3'

type Props = {
  width: number,
  height: number,
  data: Object,
  stroke: string,
  fill: string,
  strokeWidth: number,
  interpolationType: func,
};

export default class LinearPlot extends React.Component<Props> {
  line = () => {
    return d3
      .line()
      .x(d => this.xScale()(d.x))
      .y(d => this.yScale()(d.y))
      .curve(this.props.interpolationType)
  }

  // Returns the largest X coordinate from the data set
  xMax = (data: Object) => d3.max(data, d => d.x)

  // Returns the higest Y coordinate from the data set
  yMax = (data: Object) => d3.max(data, d => d.y)

  // Returns a function that "scales" X coordinates from the data to fit the chart
  xScale = () => {
    return d3
      .scaleLinear()
      .range([this.props.padding, this.props.width - this.props.padding * 2])
      .domain([0, this.xMax(this.props.data)])
  }

  // Returns a function that "scales" Y coordinates from the data to fit the chart
  yScale = () => {
    return d3
      .scaleLinear()
      .range([this.props.padding, this.props.height - this.props.padding]) // switch these two value to reverse Y asix but not work
      .domain([0, this.yMax(this.props.data)])
  }

  render() {
    const { data, stroke, fill, strokeWidth } = this.props;
    return (
      <g>
        <path
         d={this.line()(data)}
         fill={'white'}
         stroke={stroke}
         strokeWidth={strokeWidth} 
        />
      </g>
    )
  }
}
