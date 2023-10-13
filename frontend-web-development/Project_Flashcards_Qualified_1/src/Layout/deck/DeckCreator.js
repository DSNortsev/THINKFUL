import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import {createDeck, readDeck, updateDeck} from "../../utils/api";

function DeckCreator() {
    const {deckId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const initialForm = {name: "", description: ""}
    const [deck, setDeck] = useState(initialForm);
    const [formData, setFormData] = useState(initialForm);
    const breadcrumbItems = [
        {text: deck.name, link: `/decks/${deckId}`},
        {text: deckId ? 'Edit Deck' : 'Create Deck'},
    ];
    const [error, setError] = useState(undefined);

    useEffect(() => {
        if (deckId) {
            const abortController = new AbortController();
            readDeck(deckId, abortController.signal).then((deck) => {
                setDeck(deck);
                setFormData({name: deck.name, description: deck.description})
            }).catch(setError);

            return () => abortController.abort();
        }
    }, [deckId]);

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    };

    const handleCancel = () => {
        setFormData({name: deck.name, description: deck.description});
        setError(undefined);
        if (deckId) {
            history.push(`/decks/${deckId}`);
        } else {
            history.push("/");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        if (deckId) {
            updateDeck({...formData, id: deckId}, abortController.signal).then((newDeck) => {
                setError(undefined);
                history.push(`/decks/${deckId}`);
            }).catch((error) => {
                setError(error);
                history.push(`${url}`);
            });
        } else {
            createDeck(formData, abortController.signal).then((newDeck) => {
                setError(undefined);
                history.push(`/decks/${newDeck.id}`);
            }).catch((error) => {
                setError(error);
                history.push('/decks/new');
            });
        }

    };


    return (
        <React.Fragment>
            <Breadcrumb items={breadcrumbItems}/>
            {error && (
                <div className="alert alert-danger" role="alert">
                    Failed to {deckId ? 'edit' : 'create'} deck!
                </div>
            )}
            {!error && (
                <div>
                    <h2>{deckId ? 'Edit' : 'Create'} Deck</h2>
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

export default DeckCreator;
