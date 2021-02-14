import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listCategory, createCategory } from '../actions/categoryActions';
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants';

const CategoryListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);

  const { loading, error, categories } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCategoryCreate,
    error: errorCategoryCreate,
    success: successCategoryCreate,
    category: createdCategory,
  } = categoryCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCategoryCreate) {
      history.push(`/admin/category/${createdCategory._id}/edit`);
    } else {
      dispatch(listCategory());
    }
  }, [dispatch, history, userInfo, successCategoryCreate, createdCategory]);

  //   const deleteProductHandler = (id) => {
  //     if (window.confirm('Are you sure?')) {
  //       dispatch(deleteProduct(id));
  //       console.log('deleted');
  //     }
  //   };

  const createCategoryHandler = () => {
    console.log('Add Category');
    dispatch(createCategory());
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-primary my-3'>
        Go Back
      </Link>
      <Row>
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCategoryHandler}>
            <i className='fas fa-plus'></i> Add Category
          </Button>
        </Col>
      </Row>

      {loadingCategoryCreate && <Loader />}
      {errorCategoryCreate && (
        <Message variant='danger'>{errorCategoryCreate}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>CATEGORY NAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    <LinkContainer to={`/admin/category/${category._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    {/* <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteProductHandler(category._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default CategoryListScreen;
