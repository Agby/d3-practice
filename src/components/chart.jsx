import React from 'react'
import ScatterPlot from './scatter-plot.jsx'
import LinearPlot from './linear-plot.jsx'
import SubToolBar from './sub-toolbar.jsx'
import * as d3 from 'd3'

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
const randomScatterDataSet = () => Array(...{ length: numDataPoints }).map(() => ({
    x: randomNum(),
    y: randomNum(),
  }))

// A function that creates an array of 30 elements of (n, y) coordinates.
const randomLinearDataSet = () => Array(...{ length: numDataPoints }).map((value, index) => ({
    x: index,
    y: randomNum(),
  }))

export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartMode: 'scatter',
      data: randomScatterDataSet(),
      stroke: 'black',
      fill: 'grey',
      strokeWidth:  3,
      interpolationType: null,
    }
  }
  
  handleMouseOver(mode: string) {
    switch(mode) {
      case 'scatter':
        this.setState({
          chartMode: mode,
          data: randomScatterDataSet(),
          interpolationType: null,
        })
        break
      case 'linear':
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
          interpolationType: null,
        })
        break
    }
  }
  handleSelectSubType(interpolationType) {
    this.setState({interpolationType})
  }
  renderChart() {
    switch(this.state.chartMode) {
      case 'scatter':
        return (<ScatterPlot {...this.state} {...styles} />)
      case 'linear':
        return (<LinearPlot {...this.state} {...styles} />)
      default:
        return (<ScatterPlot {...this.state} {...styles} />)
    }
  }

  render() {
    return (
      <div className='main'>
        <h1>React + D3 practice</h1>
        <div className="controls">
          <div
            className={`randomize ${this.state.chartMode === 'scatter' ? 'is-active' : null}`}
            onMouseOver={() => this.handleMouseOver('scatter')}
          >
            Scatter
          </div>
          <div
            className={`randomize ${this.state.chartMode === 'linear' ? 'is-active' : null}`}
            onMouseOver={() => this.handleMouseOver('linear')}
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
            onSelectSubType={(interpolationType) => this.handleSelectSubType(interpolationType)}
          />) : null}
      </div>
    )
  }
}
