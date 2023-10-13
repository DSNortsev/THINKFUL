import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import {readDeck, updateDeck} from "../../utils/api";

function DeckEditor() {
    const {deckId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const initalForm = {name: "", description: ""}
    const [deck, setDeck] = useState(initalForm);
    const [formData, setFormData] = useState(initalForm);
    const breadcrumbItems = [
        {text: deck.name, link: `/decks/${deckId}`},
        {text: 'Edit Deck'},
    ];
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then((deck) => {
            setDeck(deck);
            setFormData({name: deck.name, description: deck.description})
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
        setFormData({name: deck.name, description: deck.description});
        setError(undefined);
        history.push(`/decks/${deckId}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        updateDeck({...formData, id: deckId}, abortController.signal).then((newDeck) => {
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
                    <h2>Edit Deck</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Deck Name"
                                onChange={handleChange}
                                required
                                value={formData.name}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                rows={3}
                                placeholder="Brief Description of the deck"
                                required
                                onChange={handleChange}
                                value={formData.description}
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

export default DeckEditor;
