import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import {createDeck} from "../../utils/api";
import DeckForm from "./DeckForm";

function DeckCreator() {
    const {deckId} = useParams();
    const history = useHistory();
    const initialForm = {name: "", description: ""}
    const [deck, setDeck] = useState(initialForm);
    const [formData, setFormData] = useState(initialForm);
    const breadcrumbItems = [
        {text: deck.name, link: `/decks/${deckId}`},
        {text: 'Create Deck'},
    ];
    const [error, setError] = useState(undefined);

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    };

    const handleCancel = () => {
        setFormData({name: deck.name, description: deck.description});
        setError(undefined);
        history.push("/");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        createDeck(formData, abortController.signal).then((newDeck) => {
            setError(undefined);
            history.push(`/decks/${newDeck.id}`);
        }).catch((error) => {
            setError(error);
            history.push('/decks/new');
        });
    };


    return (
        <React.Fragment>
            <Breadcrumb items={breadcrumbItems}/>
            {error ? (
                <div className="alert alert-danger" role="alert">
                    Failed to create deck!
                </div>
            ):
            <DeckForm
                title='Create'
                formData={formData}
                handleFormCancel={handleCancel}
                handleFormChange={handleChange}
                handleFormSubmit={handleSubmit}
            />}
        </React.Fragment>
    );
}

export default DeckCreator;
