import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Header from './components/Header';
import './styles/global.css';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/orders" component={Orders} />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    );
};

export default App;