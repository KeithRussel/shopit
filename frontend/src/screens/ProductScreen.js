import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Image,
  FormControl,
  Form,
  Button,
  ListGroup,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productCreateReview;

  const qtyCountClick = (e) => {
    // console.log(e.target.id);
    if (e.target.id === 'qty-plus') {
      setQty(qty + 1);
    } else {
      setQty(qty - 1);
    }
  };

  const validate = () => {
    return parseInt(qty);
  };

  const handleChangeCount = (qty) => {
    setQty(validate(qty));
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    console.log('Add to Cart Clicked');
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <div className='product-wrapper'>
            <Row>
              <Col md={5} lg={5}>
                <Image src={product.image} thumbnail />
              </Col>
              <Col md={7} lg={7}>
                <h3>{product.name}</h3>
                <div className='ratings'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                <div className='price'>
                  <p>${product.price}</p>
                </div>
                <div className='description'>
                  <p>{product.description}</p>
                </div>
                <div className='input-qty'>
                  {product.countInStock > 0 ? (
                    <Form inline>
                      <Button
                        onClick={qtyCountClick}
                        variant='outline-primary'
                        className='qty-minus'
                        id='qty-minus'
                        disabled={qty === 0}
                      >
                        <i
                          className='fa fa-minus'
                          aria-hidden='true'
                          id='qty-minus'
                        ></i>
                      </Button>
                      <FormControl
                        type='text'
                        id='quantity'
                        name='quantity'
                        min='0'
                        max={product.countInStock}
                        onChange={handleChangeCount}
                        value={validate(qty)}
                      />
                      <Button
                        onClick={qtyCountClick}
                        className='qty-plus'
                        id='qty-plus'
                        variant='outline-primary'
                        disabled={qty === product.countInStock}
                      >
                        <i
                          className='fa fa-plus'
                          id='qty-plus'
                          aria-hidden='true'
                        ></i>
                      </Button>
                    </Form>
                  ) : (
                    <div>
                      <h5>Out of Stock</h5>
                    </div>
                  )}
                  <div className='my-3'>
                    <Button
                      variant='primary'
                      size='sm'
                      className='py-3'
                      onClick={addToCartHandler}
                      disabled={qty === 0}
                    >
                      <i
                        className='fa fa-shopping-cart mr-2'
                        aria-hidden='true'
                      ></i>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className='product-spec-wrapper my-3'>
            <h3>Product Specifications</h3>
            <Row>
              <Col md={12}>
                <p className='ml-3'>
                  Category: <span>{product.category}</span>
                </p>
                <p className='ml-3'>
                  Brand: <span>{product.brand}</span>
                </p>
                <p className='ml-3'>
                  Stocks: <span>{product.countInStock}</span>
                </p>
              </Col>
            </Row>
          </div>
          <div className='product-review-wrapper my-3'>
            <h3>Product Ratings</h3>
            <Row>
              <Col md={12}>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
