import React, {useState} from "react";
import {Link} from "react-router-dom";
import {deleteDeck} from "../../utils/api";

const DeckItem = ({deck = {cards: []}}) => {
    const [error, setError] = useState(undefined);

    const handleDeleteDeck = (id) => {
        const abortController = new AbortController();
        const isConfirmed = window.confirm('Delete this deck?\n\nYou will not be able to recover it.');
        if (isConfirmed) {
            deleteDeck(id, abortController.signal).then(() => {
                window.location.reload();
            }).catch(setError);
        }
    }

    return (
        <React.Fragment>
            {error && (
                <div className="alert alert-danger" role="alert">
                    Failed to create new deck!
                </div>
            )}
            <div className="card container mb-3">
                <div className="card-body">
                    <div className="d-flex">
                        <h3 className="card-title flex-grow-1">{deck.name}</h3>
                        <p className="card-text ">{deck.cards.length} cards</p>
                    </div>
                    <p className="card-text">{deck.description}</p>
                    <div className="d-flex">
                        <Link className="btn btn-secondary btn-lg mr-3" to={`/decks/${deck.id}`}>View</Link>
                        <Link className="btn btn-primary btn-lg mr-3" to={`/decks/${deck.id}/study`}>Study</Link>
                        <Link className="btn btn-danger btn-lg ml-auto" to='#'
                              onClick={() => handleDeleteDeck(deck.id)}>Delete</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DeckItem;
