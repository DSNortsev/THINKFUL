import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import {readDeck, updateDeck} from "../../utils/api";
import DeckForm from "./DeckForm";

function DeckEditor() {
    const {deckId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const initialForm = {name: "", description: ""}
    const [deck, setDeck] = useState(initialForm);
    const [formData, setFormData] = useState(initialForm);
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
            {error ? (
                    <div className="alert alert-danger" role="alert">
                        Failed to edit deck!
                    </div>
                ):
                <DeckForm
                    title='Edit'
                    formData={formData}
                    handleFormCancel={handleCancel}
                    handleFormChange={handleChange}
                    handleFormSubmit={handleSubmit}
                />}
        </React.Fragment>
    );
}

export default DeckEditor;
