import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";
import CardForm from "./CardForm";
import {readCard, readDeck, updateCard} from "../../../utils/api";

function CardEditor() {
    const {deckId, cardId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const initialForm = {front: '', back: ''}
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const [formData, setFormData] = useState(initialForm);
    const breadcrumbItems = [
            {text: `Deck ${deck.name}`, link: `/decks/${deckId}`},
            {text: `Edit Card ${cardId}`}
    ];
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then((deck) => {
            setDeck(deck);
        }).catch(setError);

        readCard(cardId, abortController.signal).then((card) => {
            setCard(card);
            setFormData({front: card.front, back: card.back})
        }).catch(setError);

        return () => abortController.abort();
    }, [cardId]);

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    };

    const handleCancel = () => {
        setError(undefined);
        history.push(`/decks/${deckId}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
            updateCard({...formData, id: card.id, deckId: deck.id}, abortController.signal).then(() => {
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
                        Failed to edit card!
                    </div>
                ) :
                <CardForm
                    edit={true}
                    formData={formData}
                    handleFormCancel={handleCancel}
                    handleFormChange={handleChange}
                    handleFormSubmit={handleSubmit}
                />}
        </React.Fragment>
    );
}

export default CardEditor;
