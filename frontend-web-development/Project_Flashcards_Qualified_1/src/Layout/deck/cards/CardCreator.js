import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";
import CardForm from "./CardForm";
import {createCard, readDeck} from "../../../utils/api";

function CardCreator() {
    const {deckId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const initialForm = {front: '', back: ''}
    const [deck, setDeck] = useState({});
    const [formData, setFormData] = useState(initialForm);
    const breadcrumbItems = [
            {text: deck?.name, link: `/decks/${deckId}`},
            {text: 'Add Card'}
    ];
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then((deck) => {
            setDeck(deck);
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
            {error ? (
                <div className="alert alert-danger" role="alert">
                    Failed to create new card!
                </div>
            ) :
            <CardForm
                edit={false}
                formData={formData}
                handleFormCancel={handleCancel}
                handleFormChange={handleChange}
                handleFormSubmit={handleSubmit}
            />}
        </React.Fragment>
    );
}

export default CardCreator;
