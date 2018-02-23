// @flow

import React from 'react'
import * as d3 from 'd3'
import Utils from '../shared/utils'
import ScatterPlot from './scatter-plot.jsx'
import LinearPlot from './linear-plot.jsx'
import SubToolBar from './sub-toolbar.jsx'

const styles = {
  width: 600,
  height: 300,
  padding: 30,
}

// The number of data points for the chart.
const numDataPoints = 50

// A function that returns a random number from 0 to 1000
const randomNum = () => Math.floor(Math.random() * 1000)

// A function that creates an array of 30 elements of (x, y) coordinates.
const randomScatterDataSet = () =>
  new Array(numDataPoints).fill().map((a, index) => ({
    x: randomNum(),
    y: randomNum(),
  }))

// A function that creates an array of 30 elements of (n, y) coordinates.
const randomLinearDataSet = () =>
  new Array(numDataPoints).fill().map((a, index) => ({
    x: index,
    y: randomNum(),
  }))

type Props = {}
type State = {
  chartMode: string,
  data: Array<Object>,
  subSettings: Object,
  interpolationType: Function,
}

export default class Chart extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = {
      chartMode: 'scatter',
      data: randomScatterDataSet(),
      subSettings: {
        stroke: 'black',
        fill: 'white',
        strokeWidth: 3,
      },
      interpolationType: d3.curveLinear,
    }
  }

  handleMouseOver(mode: string) {
    switch (mode) {
      case 'scatter':
        if (this.state.chartMode !== 'scatter')
          this.setState({
            chartMode: mode,
            data: randomScatterDataSet(),
          })
        break
      case 'linear':
        if (this.state.chartMode !== 'linear')
          this.setState({
            chartMode: mode,
            data: randomLinearDataSet(),
            interpolationType: d3.curveLinear,
          })
        break
      default:
        this.setState({
          chartMode: mode,
          data: randomScatterDataSet(),
        })
        break
    }
  }

  handleSelectSubType(interpolationType: Function) {
    this.setState({ interpolationType })
  }

  renderChart() {
    const scaleData = {
      rangeX: [styles.padding, styles.width - styles.padding * 2],
      domainX: [0, Utils.max(this.state.data, 'x')],
      rangeY: [styles.padding, styles.height - styles.padding],
      domainY: [0, Utils.max(this.state.data, 'y')],
    }

    switch (this.state.chartMode) {
      case 'scatter':
        return (
          <ScatterPlot
            data={this.state.data}
            scaleData={scaleData}
            subSettings={this.state.subSettings}
          />
        )
      case 'linear':
        return (
          <LinearPlot
            data={this.state.data}
            scaleData={scaleData}
            subSettings={this.state.subSettings}
            interpolationType={this.state.interpolationType}
          />
        )
      default:
        break
    }
  }

  render() {
    return (
      <div className="main">
        <h1>React + D3 practice</h1>
        <div className="controls">
          <div
            className={`randomize ${
              this.state.chartMode === 'scatter' ? 'is-active' : ''
            }`}
            onMouseOver={() => this.handleMouseOver('scatter')}
            onFocus={() => this.handleMouseOver('scatter')}
          >
            Scatter
          </div>
          <div
            className={`randomize ${
              this.state.chartMode === 'linear' ? 'is-active' : ''
            }`}
            onMouseOver={() => this.handleMouseOver('linear')}
            onFocus={() => this.handleMouseOver('linear')}
          >
            linear
          </div>
        </div>
        <svg width={styles.width} height={styles.height}>
          {this.renderChart()}
        </svg>
        {this.state.chartMode === 'linear' ? (
          <SubToolBar
            interpolationType={this.state.interpolationType}
            onSelectSubType={interpolationType =>
              this.handleSelectSubType(interpolationType)
            }
          />
        ) : null}
      </div>
    )
  }
}
