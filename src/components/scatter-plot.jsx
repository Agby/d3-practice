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
};

export default class scatterPlot extends React.Component<Props> {
  // Returns the largest X coordinate from the data set
  xMax = (data: Object) => d3.max(data, d => d.x)

  // Returns the higest Y coordinate from the data set
  yMax = (data: Object) => d3.max(data, d => d.y)

  // Returns a function that "scales" X coordinates from the data to fit the chart
  xScale = (props: Object) => {
    return d3
      .scaleLinear()
      .range([this.props.padding, this.props.width - this.props.padding * 2])
      .domain([0, this.xMax(this.props.data)])
  }

  // Returns a function that "scales" Y coordinates from the data to fit the chart
  yScale = (props: Object) => {
    return d3
      .scaleLinear()
      .range([this.props.padding, this.props.height - this.props.padding]) // switch these two value to reverse Y asix but not work
      .domain([0, this.yMax(this.props.data)])
  }

  render() {
    return (
      <g>
        {this.props.data.map((coords, index) => (
          <circle
            key={index}
            cx={this.xScale()(coords.x)}
            cy={this.yScale()(coords.y)}
            r={this.props.strokeWidth}
            stroke={this.props.stroke}
            fill={this.props.fill}
          />
        ))}
      </g>
    )
  }
}
