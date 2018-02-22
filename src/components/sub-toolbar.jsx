// @flow

import React from 'react'
import * as d3 from 'd3'

const interpolationTypes = {
  curveBasis: d3.curveBasis,
  curveBasisClosed: d3.curveBasisClosed,
  curveBasisOpen: d3.curveBasisOpen,
  curveLinear: d3.curveLinear,
  curveLinearClosed: d3.curveLinearClosed,
  curveMonotoneX: d3.curveMonotoneX,
  curveMonotoneY: d3.curveMonotoneY,
  curveNatural: d3.curveNatural,
  curveStep: d3.curveStep,
  curveStepAfter: d3.curveStepAfter,
  curveStepBefore: d3.curveStepBefore,
}

const renderSubToolBar = (props) => (
  <div className="sub-toolbar">
    {Object.keys(interpolationTypes).map(key => (
      <div 
      	key={key}
      	className={`sub-button ${props.interpolationType === interpolationTypes[key] ? 'is-active' : null}`}
      	onMouseOver={() => props.onSelectSubType(interpolationTypes[key])}
      >
      	{key}
      </div>
    ))}
  </div>
)

export default renderSubToolBar