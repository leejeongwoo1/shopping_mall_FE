import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../style/adminProduct.style.css";
import { reviewActions } from "../action/reviewAction";

const InitialFormData = {
  name: "",
  review: "",
};

const ReviewWriteBox = ({ productId }) => {
  const [formData, setFormData] = useState({ ...InitialFormData });
  //const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(reviewActions.createReview({ ...formData, productId: productId }));
    setFormData({ ...InitialFormData });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          value={formData.name}
          placeholder="Enter name"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="review">
        <Form.Label>Review</Form.Label>
        <Form.Control
          type="review"
          value={formData.review}
          placeholder="review"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReviewWriteBox;
