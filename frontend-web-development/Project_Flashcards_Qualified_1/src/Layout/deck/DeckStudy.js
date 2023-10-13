import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readDeck} from "../../utils/api";
import ErrorMessage from "../common/ErrorMessage";
import Breadcrumb from "../common/Breadcrumb";

function DeckStudy() {
    const {deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({cards: []});
    const [error, setError] = useState(undefined);
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const currentCard = deck?.cards[cardIndex];
    const breadcrumbItems = [
        {text: deck?.name, link: `/decks/${deckId}`},
        {text: 'Study'},
    ];

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

        return () => abortController.abort();
    }, [deckId]);

    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    }
    const handleNextCard = () => {
        if (cardIndex < deck.cards.length - 1) {
            setCardIndex(cardIndex + 1);
            setIsFlipped(false);
        } else {
            const isConfirmed = window.confirm('Restart cards?\n\nClick \'cancel\' to return to home page');
            if (isConfirmed) {
                setCardIndex(0);
                setIsFlipped(false);
            } else {
                history.push("/");
            }
        }
    }

    const loading = (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );

    if (error) {
        return <ErrorMessage error={error}/>
    }

    return (
        <div>
            {!deck.name && loading}
            {deck?.name && (
                <div>
                    <Breadcrumb items={breadcrumbItems}/>
                    <h2>{deck ? `Study: ${deck.name}` : loading}</h2>
                    <div>
                        {deck && deck.cards.length > 2 ? (
                            <div className="card container mb-3">
                                <div className="card-body">
                                    <h4 className="card-title">{`Card ${cardIndex + 1} of ${deck.cards.length}`}</h4>
                                    <div>
                                        <p>{isFlipped ? currentCard.back : currentCard.front}</p>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-secondary btn-lg mr-3"
                                                onClick={handleFlipCard}>Flip
                                        </button>
                                        {isFlipped &&
                                            <button className="btn btn-primary btn-lg mr-3"
                                                    onClick={handleNextCard}>Next</button>}
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <div className="mt-4">
                                <h3 className="card-title">Not enough cards.</h3>
                                <p>You need at least 3 cards to study. There
                                    are {deck?.cards.length} cards in this
                                    deck.</p>
                                <Link className="btn btn-primary btn-lg" to={`/decks/${deckId}/cards/new`}>Add
                                    Cards</Link>
                            </div>

                        )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeckStudy;
