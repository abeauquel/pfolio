import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min';

import React, { Component } from 'react';
import Header from './Components/Header';
import Myfooter from './Components/Footer';
import Home from "./Home/Home";
import NotFound from './NotFound';

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import E4 from "./E4/E4";
import E6 from "./E6/E6";
import Projets from "./Projet/Projets";




class App extends Component{
    render(){
        return(
            <Router>
                <div className="App">

                        <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/Home" component={Home}/>

                        <Route path="/E4/Activites/:codeActivite" component={E4}/>
                        <Route path="/E4" component={E4}/>

                        <Route path="/E6/" component={E6}/>
                        <Route path="/Projets" component={Projets}/>
                        <Route component={NotFound}/>
                    </Switch>

                    <Myfooter/>


                </div>
            </Router>
        )
    }
}
export default App
