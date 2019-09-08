import React from 'react'
import styles from './App.module.scss'

import Login from './pages/login'
import Home from './pages/home'

import { HashRouter as Router, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      {/* <Route path="/" exact component={Home} /> */}

      <Route path="/home" component={Home} />

      <Route path="/login" component={Login} />
    </Router>
  )
}

export default App
