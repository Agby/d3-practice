// @flow

import React from 'react'
import Utils from '../shared/utils'

const scatterPlot = (props: {
  data: Array<Object>,
  scaleData: Object,
  subSettings: Object,
}) => {
  const { data, scaleData, subSettings } = props
  return (
    <g>
      {data.map((coords, index) => (
        <circle
          key={index}
          cx={Utils.scale(scaleData.rangeX, scaleData.domainX, coords.x)}
          cy={Utils.scale(scaleData.rangeY, scaleData.domainY, coords.y)}
          r={subSettings.strokeWidth}
          stroke={subSettings.stroke}
          fill={subSettings.fill}
        />
      ))}
    </g>
  )
}

export default scatterPlot
