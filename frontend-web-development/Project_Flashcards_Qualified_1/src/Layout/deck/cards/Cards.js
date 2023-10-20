import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import CardCreator from "./CardCreator";
import CardEditor from "./CardEditor";
import NotFound from "../../common/NotFound";

function Cards() {
    const {path} = useRouteMatch();

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={`${path}/new`}>
                    <CardCreator/>
                </Route>
                <Route exact path={`${path}/:cardId/edit`}>
                    <CardEditor/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default Cards;
