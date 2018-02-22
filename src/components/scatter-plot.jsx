import React from 'react'
import * as d3 from 'd3'

export default class scatterPlot extends React.Component {
  // Returns the largest X coordinate from the data set
  xMax = data => d3.max(data, d => d[0])

  // Returns the higest Y coordinate from the data set
  yMax = data => d3.max(data, d => d[1])

  // Returns a function that "scales" X coordinates from the data to fit the chart
  xScale = props => {
    return d3
      .scaleLinear()
      .domain([0, this.xMax(props.data)])
      .range([props.padding, props.width - props.padding * 2])
  }

  // Returns a function that "scales" Y coordinates from the data to fit the chart
  yScale = props => {
    return d3
      .scaleLinear()
      .domain([0, this.yMax(props.data)])
      .range([props.height - props.padding, props.padding])
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <g>
          {this.props.data.map((coords, index) => (
            <circle
              key={index}
              cx={this.xScale(this.props)(coords[0])}
              cy={this.yScale(this.props)(coords[1])}
              r={2}
            />
          ))}
        </g>
      </svg>
    )
  }
}
