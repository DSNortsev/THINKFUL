import React from "react";
import Header from "./common/Header";
import NotFound from "./common/NotFound";
import Deck from "./deck/Deck";
import DeckList from "./home/DeckList";
import {Route, Switch, useRouteMatch} from "react-router-dom";


function Layout() {
    const {path, url} = useRouteMatch();

    return (
        <React.Fragment>
            <Header/>
            <div className="container">
                {/*TODO: Implement the screen starting here */}
                <Switch>
                    <Route exact path='/'>
                        <DeckList/>
                    </Route>
                    <Route path='/decks'>
                        <Deck/>
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
        </React.Fragment>
    );
}

export default Layout;
