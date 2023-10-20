import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import DeckViewer from "./DeckViewer";
import DeckStudy from "./DeckStudy";
import Cards from "./cards/Cards";
import NotFound from "../common/NotFound";
import DeckEditor from "./DeckEditor";


function DeckDetails() {
    const {path} = useRouteMatch();

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={`${path}`}>
                    <DeckViewer/>
                </Route>
                <Route exact path={`${path}/study`}>
                    <DeckStudy/>
                </Route>
                <Route exact path={`${path}/edit`}>
                    <DeckEditor/>
                </Route>
                <Route path={`${path}/cards`}>
                    <Cards/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default DeckDetails;
