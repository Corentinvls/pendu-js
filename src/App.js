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
import APropos from './components/APropos';
import JungleClick from "./components/JungleClick";
import RageColor from "./components/RageColor";


import ParticlesBg from "particles-bg";

import './fonts/GoSpeeds.ttf'

const store = createStore(reducer);

export default class App extends React.Component {
    /**
     * Constructor add the props of react component
     */
    constructor(props) {
        super(props);
    }


    /**
     *  Display the virtual DOM
     *  @return the virtual DOM
     */
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>

                        <nav>
                            <ParticlesBg color="ffffff" num={50} rps={0.5} type="color" bg={true}/>
                            <ul id="nav">
                                <li >
                                    <Link className="navli" to="/">Acceuil</Link>
                                </li>
                                <li >
                                    <Link className="navli"to="/speedclick">Speed Click</Link>
                                </li>
                                <li >
                                    <Link className="navli" to="/jungleclick">Jungle Click</Link>
                                </li>
                                <li >
                                    <Link className="navli" to="/ragecolor">Rage Color</Link>
                                </li>
                                <li>
                                    <Link className="navli" to="/aPropos">A propos</Link>
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
