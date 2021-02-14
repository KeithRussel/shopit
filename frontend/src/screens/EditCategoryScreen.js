import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  updateCategory,
  singleCategory,
  listCategory,
} from '../actions/categoryActions';
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants';

const EditCategoryScreen = ({ match, history }) => {
  const categoryId = match.params.id;

  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const categorySingle = useSelector((state) => state.categorySingle);
  const { loading, error, category } = categorySingle;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!category.name || category._id !== categoryId) {
        dispatch(singleCategory(categoryId));
        // dispatch(listCategory());
      } else {
        setName(category.name);
      }
    }
  }, [dispatch, categoryId, category, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // UPDATE CATEGORY
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
      })
    );
  };
  return (
    <FormContainer>
      <h1>Edit Category</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default EditCategoryScreen;
