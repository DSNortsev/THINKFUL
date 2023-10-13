import React, {useState} from 'react';
import {deleteCard} from "../../../utils/api";
import {Link, useRouteMatch} from "react-router-dom";

function Card({card}) {
    const {url} = useRouteMatch();
    const [error, setError] = useState(undefined);

    const handleDelete = (cardId) => {
        const abortController = new AbortController();
        const isConfirmed = window.confirm('Delete this card?\n\nYou will not be able to recover it.');
        if (isConfirmed) {
            deleteCard(cardId, abortController.signal).then(() => {
                window.location.reload();
            }).catch(setError);
        }
    };

    return (
        <React.Fragment>
            {error && (
                <div className="alert alert-danger" role="alert">
                    Failed to create new deck!
                </div>
            )}
            <div className="card">
                <div className="row justify-content-between">
                    <p className="col">{card.front}</p>
                    <p className="col">{card.back}</p>
                </div>
                <div className="d-flex">
                    <Link className="btn btn-secondary btn-lg mr-3 mb-3 ml-auto"
                          to={`${url}/cards/${card.id}/edit`}>Edit</Link>
                    <Link className="btn btn-danger btn-lg mr-3 mb-3" to="#" onClick={() => handleDelete(card.id)}
                    >Delete</Link>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Card;
