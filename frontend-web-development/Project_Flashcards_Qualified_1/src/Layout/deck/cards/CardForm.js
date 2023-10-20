import React from "react";

function CardForm({ edit = false, formData, handleFormCancel, handleFormChange, handleFormSubmit}) {

    return (
        <div>
            <h2>{edit ? 'Edit' : 'Create'} Card</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        rows={3}
                        placeholder="Front side of the card"
                        required
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
                        value={formData.back}
                    />
                </div>
                <div className="d-flex">
                    <button type="button" className="btn btn-secondary btn-lg mr-3"
                            onClick={handleFormCancel}>{edit ? 'Cancel' : 'Done'}
                    </button>
                    <button type="submit" className="btn btn-primary btn-lg mr-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CardForm;
