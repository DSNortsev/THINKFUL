import React from "react";

function DeckForm({title, formData, handleFormCancel, handleFormChange, handleFormSubmit}) {
    return (
        <div>
            <h2>{title} Deck</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Deck Name"
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
                        value={formData.description}
                    />
                </div>
                <div className="d-flex">
                    <button type="button" className="btn btn-secondary btn-lg mr-3"
                            onClick={handleFormCancel}>Cancel
                    </button>
                    <button type="submit" className="btn btn-primary btn-lg mr-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeckForm;
