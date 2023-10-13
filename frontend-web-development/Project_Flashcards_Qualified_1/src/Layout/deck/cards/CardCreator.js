import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";
import {createCard, readDeck} from "../../../utils/api";

function CardCreator() {
    const {url} = useRouteMatch();
    const {deckId} = useParams();
    const history = useHistory();
    const initialForm = {front: '', back: ''}
    const [deck, setDeck] = useState({cards: []});
    const [formData, setFormData] = useState(initialForm);
    const breadcrumbItems = [
        {text: deck?.name, link: `/decks/${deckId}`},
        {text: 'Add Card'},
    ];
    const [error, setError] = useState(undefined);


    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

        return () => abortController.abort();
    }, [deckId]);

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    };

    const handleDone = () => {
        setError(undefined);
        history.push(`/decks/${deckId}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        createCard(deckId, formData, abortController.signal).then((newDeck) => {
            setFormData(initialForm);
            setError(undefined);
            history.push(`${url}`);
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
                    Failed to create new card!
                </div>
            )}
            {!error && (
                <div>
                    <h3>{deck.name}: Add Card</h3>
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
                                    onClick={handleDone}>Done
                            </button>
                            <button type="submit" className="btn btn-primary btn-lg mr-3">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </React.Fragment>
    );
}

export default CardCreator;
