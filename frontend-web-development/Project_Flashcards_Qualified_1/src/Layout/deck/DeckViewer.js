import React, {useEffect, useState} from "react";
import {Link, useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import {deleteDeck, readDeck} from "../../utils/api";
import ErrorMessage from "../common/ErrorMessage";
import Card from "./cards/Card";

function DeckViewer() {
    const {deckId} = useParams();
    const history = useHistory();
    const {url} = useRouteMatch();
    const [deck, setDeck] = useState({cards: []});
    const [error, setError] = useState(undefined);
    const breadcrumbItems = [
        {text: deck?.name},
    ];

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

        return () => abortController.abort();
    }, []);

    const handleDeleteDeck = (id) => {
        const isConfirmed = window.confirm('Delete this deck?\n\nYou will not be able to recover it.');
        if (isConfirmed) {
            deleteDeck(id).then(() => {
                history.push("/");
            }).catch(setError)
        }
    }

    if (error) {
        return <ErrorMessage error={error}/>
    }

    const list = deck.cards.map((card) => <Card key={card.id} card={card}/>);

    return (
        <div>
            <Breadcrumb items={breadcrumbItems}/>
            <div className="container mb-5">
                <div className="d-flex">
                    <h3 className="card-title flex-grow-1">{deck.name}</h3>
                    <p className="card-text">{deck.cards.length} cards</p>
                </div>
                <p className="card-text">{deck.description}</p>
                <div className="d-flex mt-4">
                    <Link className="btn btn-secondary btn-lg mr-3" to={`${url}/edit`}>Edit</Link>
                    <Link className="btn btn-primary btn-lg mr-3" to={`${url}/study`}>Study</Link>
                    <Link className="btn btn-primary btn-lg mr-3" to={`${url}/cards/new`}>+ Add Cards</Link>
                    <Link className="btn btn-danger btn-lg ml-auto" to='#'
                          onClick={() => handleDeleteDeck(deck.id)}>Delete</Link>
                </div>
            </div>
            <div className="container mb-3">
                <h2>Cards</h2>
                {deck && deck.cards.length > 0
                    ? list
                    : <p className="card-text">No cards in the deck</p>
                }
            </div>
        </div>
    );
}

export default DeckViewer;
