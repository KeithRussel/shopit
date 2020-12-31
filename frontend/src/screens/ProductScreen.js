import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Image, FormControl, Form, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

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

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
            <h3>Reviews</h3>
            <Row>
              <Col md={12}>
                <p className='ml-3'>
                  Please <a href='#'>sign in</a> to write a review
                </p>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
