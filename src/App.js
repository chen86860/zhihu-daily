import '~/css/common.scss'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, Detail } from '@/components'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={Home}></Route>
          <Route path='/home' exact component={Home}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
        </div>
      </Router>
    )
  }
}

export default App
