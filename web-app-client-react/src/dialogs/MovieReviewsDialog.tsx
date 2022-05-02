import React, {FC, useContext} from "react";
import {Button, Modal} from "react-bootstrap";
import {MovieReviewsDialogContext} from "../contexts/MovieReviewsDialogContext";

export const MovieReviewsDialog: FC = () => {

    const {
        showMovieReviewsDialog,
        setShowMovieReviewsDialog,
    }: any = useContext(MovieReviewsDialogContext);

    let {selectedMovieReviews, selectedMovieName}: any = useContext(MovieReviewsDialogContext);

    const handleClose = () => {
        setShowMovieReviewsDialog(false);
    };

    return (
        <>
            <Modal show={showMovieReviewsDialog} onHide={handleClose} dialogClassName="modal-50w" backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMovieName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMovieReviews.length === 0 &&
                        <div className="text-center alert alert-danger">
                            This is movie doesn't have any reviews, yet!
                        </div>
                    }
                    {selectedMovieReviews.length !== 0 &&
                        <div className="mt-3 p-4 card">
                            <h3 className="mt-3 text-center">Reviews</h3>
                            {selectedMovieReviews.map((review: any) => (
                                <div className="mt-3 card" key={review.id}>
                                    <div className="row g-0">
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{review.user.username}</h5>
                                                <p className="card-text">{review.text}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
