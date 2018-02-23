// @flow

import React from 'react'
import * as d3 from 'd3'
import Utils from '../shared/utils'

type Props = {
  data: Array<Object>,
  scaleData: Object,
  subSettings: Object,
  interpolationType: Function,
}

export default class LinearPlot extends React.Component<Props> {
  line = (data: Array<Object>) =>
    d3
      .line()
      .x(d =>
        Utils.scale(
          this.props.scaleData.rangeX,
          this.props.scaleData.domainX,
          d.x,
        ),
      )
      .y(d =>
        Utils.scale(
          this.props.scaleData.rangeY,
          this.props.scaleData.domainY,
          d.y,
        ),
      )
      .curve(this.props.interpolationType)(data)

  render() {
    const { data, subSettings } = this.props
    return (
      <g>
        <path
          d={this.line(data)}
          fill={subSettings.fill}
          stroke={subSettings.stroke}
          strokeWidth={subSettings.strokeWidth}
        />
      </g>
    )
  }
}
