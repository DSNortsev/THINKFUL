import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";
import {readCard, readDeck, updateCard} from "../../../utils/api";

function CardEditor() {
    const {deckId, cardId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const [formData, setFormData] = useState({front: '', back: ''});
    const breadcrumbItems = [
        {text: `Deck ${deck.name}`, link: `/decks/${deckId}`},
        {text: `Edit Card ${cardId}`},
    ];
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        readCard(cardId, abortController.signal).then((card) => {
            setCard(card);
            setFormData({front: card.front, back: card.back})
        }).catch(setError);

        readDeck(deckId, abortController.signal).then((deck) => {
            setDeck(deck);
        }).catch(setError);

        return () => abortController.abort();
    }, []);

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    };

    const handleCancel = () => {
        setFormData({front: card.front, back: card.back});
        setError(undefined);
        history.push(`/decks/${deckId}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        updateCard({...formData, id: cardId, deckId: deck.id}, abortController.signal).then(() => {
            setError(undefined);
            history.push(`/decks/${deckId}`);
        }).catch((error) => {
            setError(error);
            history.push(`${url}`);
        });
    };


    return (
        <React.Fragment>
            <Breadcrumb items={breadcrumbItems}/>
            {error && (
                <div className="alert alert-danger" role="alert">
                    Failed to edit deck!
                </div>
            )}
            {!error && (
                <div>
                    <h2>Edit Card</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="front" className="form-label">Front</label>
                            <textarea
                                id="front"
                                name="front"
                                className="form-control"
                                rows={3}
                                placeholder="Front side of the card"
                                required
                                onChange={handleChange}
                                value={formData.front}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="back" className="form-label">Back</label>
                            <textarea
                                id="back"
                                name="back"
                                className="form-control"
                                rows={3}
                                placeholder="Back side of the card"
                                required
                                onChange={handleChange}
                                value={formData.back}
                            />
                        </div>
                        <div className="d-flex">
                            <button type="button" className="btn btn-secondary btn-lg mr-3"
                                    onClick={handleCancel}>Cancel
                            </button>
                            <button type="submit" className="btn btn-primary btn-lg mr-3">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </React.Fragment>
    );
}

export default CardEditor;
