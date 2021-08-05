import React, {Fragment} from 'react'; 
import './App.css';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'; 

//import components 
import { Landing } from './components/layout/Landing';
import { Navbar } from './components/layout/Navbar';
import { Login } from './components/auth/Login';
import Register from './components/auth/Register';
import alert from './reducers/alert';

// Redux 
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

const App = () => (
 <Provider store = {store}>
  <Router>
    <Fragment>
        <Navbar/>
        <Route exact path = "/" component = {Landing} />
        <section className = "container">
          <Alert/>
            <Switch>
                <Route exact path = "/register" component = {Register} />
                <Route exact path = "/login" component = {Login} />
            </Switch>
        </section>
    </Fragment>
  </Router>
  </Provider> 

)

export default App;
