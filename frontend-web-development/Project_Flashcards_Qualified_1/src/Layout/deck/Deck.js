import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import DeckCreator from "./DeckCreator";
import DeckDetails from "./DeckDetails";
import NotFound from "../common/NotFound";

function Deck() {
    const {path} = useRouteMatch();

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={`${path}/new`}>
                    <DeckCreator/>
                </Route>
                <Route path={`${path}/:deckId`}>
                    <DeckDetails/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default Deck;
