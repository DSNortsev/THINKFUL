import React, {useEffect, useState} from "react";
import ErrorMessage from "../common/ErrorMessage";
import DeckItem from "./DeckItem";
import {listDecks} from "../../utils/api";
import {Link} from "react-router-dom";

const DeckList = () => {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);


    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setDecks).catch(setError);

        return () => abortController.abort();
    }, []);

    if (error) {
        return <ErrorMessage error={error}/>
    }

    const list = decks.map((deck) => <DeckItem key={deck.id} deck={deck}/>);

    return (
        <React.Fragment>
            <div className="container">
                <Link className="btn btn-secondary btn-lg" to='/decks/new'>+ Create Deck</Link>
                <div className="container mt-3">
                    <section className="row">{list}</section>
                </div>
            </div>
        </React.Fragment>

    );
}

export default DeckList;
