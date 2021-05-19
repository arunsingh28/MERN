import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrivateRoute from './components/routes/privateRoute'

import PrivateScreen from './components/screen/private'
import LoginScreen from './components/screen/login'
import RegisterScreen from './components/screen/register'


const App = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={PrivateScreen} />
                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/register" component={RegisterScreen} />
            </Switch>
        </Router>
    )
}

export default App