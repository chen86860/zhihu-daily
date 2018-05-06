import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

const ParamsExample = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="Home">Home</Link>
          </li>
          <li>
            <Link to="Me">Me</Link>
          </li>
          <li>
            <Link to="Detail">Detail</Link>
          </li>
        </ul>

        <Route path="/:id" component={Child}></Route>
      </div>
    </Router>
  )
}

const Child = ({ match }) => {
  return (
    <div>
      <h3>{match.params.id}</h3>
    </div>
  )
}

export default ParamsExample