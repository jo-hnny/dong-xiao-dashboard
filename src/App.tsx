import React from 'react'
import styles from './App.module.scss'

import Login from './pages/login'
import Home from './pages/home'

import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      {/* <Route path="/" exact component={Home} /> */}

      <Redirect from="/" to="/home" />

      <Route path="/home" component={Home} />

      <Route path="/login" component={Login} />
    </Router>
  )
}

export default App
