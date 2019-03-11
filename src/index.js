import React from 'react'
import ReactDOM from 'react-dom'
import {buttonStyles, labelStyles} from './styles'

import {agent, after} from 'rx-helper'
import {interval, of, concat} from 'rxjs'
import {takeUntil, map} from 'rxjs/operators'

window.agent = agent

// The specs of the system are
// on start, start ticking every PERIOD ms
// on stop, stop ticking
// on tick, update UI
// on clear, stop, then set lapsed to 0

const PERIOD = 90
const any = () => true

const props = {
  lapsed: 0,
}
const renderUI = () => {
  ReactDOM.render(<App {...props} />, document.getElementById('root'))
}

//// **** ////
// Filters - synchronous handlers; called first
agent.filter('tick', () => {
  props.lapsed += PERIOD
})
agent.filter('clear', () => {
  props.lapsed += 0
})
// Handlers - run if fitlers pass, can be async, adding more events
agent.on(any, ({action}) => console.log(action))
//// **** ////
const dispatch = event => {
  agent.process(event)
}

function Stopwatch(props) {
  const {started, lapsed} = props

  return (
    <div>
      <label style={labelStyles}>{lapsed} ms</label>
      <button
        style={buttonStyles}
        onClick={() => {
          dispatch({
            type: 'start',
          })
        }}
      >
        {lapsed > 0 ? 'Stop' : 'Start'}
      </button>
      <button style={buttonStyles} onClick={() => dispatch({type: 'clear'})}>
        Clear
      </button>
    </div>
  )
}

function App(props) {
  return (
    <div>
      Example Solution from <a href="">How To End A Hook Up</a>, described by{' '}
      <a href="//twitter.com/kentcdodds">@kentcdodds</a>
      <hr />
      <Stopwatch {...props} />
      <hr />
      <i>Deanius Solutions, Inc.</i>
    </div>
  )
}

renderUI()
