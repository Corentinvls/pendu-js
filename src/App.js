import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './redux/reducers'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Accueil from './components/Accueil'
import SpeedClick from './components/SpeedClick';
import Configuration from './components/Configuration';
import APropos from './components/APropos';
import JungleClick from "./components/JungleClick";
import RageColor from "./components/RageColor";

// import for background animation


import ParticlesBg from "particles-bg";

import './fonts/GoSpeeds.ttf'

const store = createStore(reducer);

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Provider store={store}>
            <Router>
                <div>

                    <nav>
                    <ParticlesBg color="ffffff" num={1000}type="lines"  bg={true}/>
                        <ul id="nav">
                            <li className="navli">
                                <Link to="/">Acceuil</Link>
                            </li>
                            <li className="navli">
                                <Link to="/speedclick">Speed Click</Link>
                            </li>
                            <li className="navli">
                                <Link to="/jungleclick">Jungle Click</Link>
                            </li>
                            <li className="navli">
                                <Link to="/ragecolor">Rage Color</Link>
                            </li>
                            <li className="navli">
                                <Link to="/configuration">Configuration</Link>
                            </li>
                            <li className="navli">
                                <Link to="/aPropos">A propos</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/">
                            <Accueil/>
                        </Route>
                        <Route exact path="/speedclick">
                            <SpeedClick/>
                        </Route>
                        <Route exact path="/jungleclick">
                            <JungleClick/>
                        </Route>
                        <Route exact path="/ragecolor">
                            <RageColor/>
                        </Route>
                        <Route path="/configuration">
                            <Configuration/>
                        </Route>
                        <Route path="/aPropos">
                            <APropos/>
                        </Route>
                    </Switch>
                </div>

            </Router>
        </Provider>
        );
    }
}
