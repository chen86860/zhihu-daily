import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import components from './components'
// import { Provider } from 'react-redux'
// import { store, history } from './store'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={components.Home}></Route>
          <Route path='/home' exact component={components.Home}></Route>
          <Route path="/detail/:id" component={components.Detail}></Route>
        </div>
      </Router >
    )
  }
}


export default App
