import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
// import products from '../products';
import { listProducts } from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='top-products mb-2'>
            <h1>Top Products</h1>
            <ProductCarousel />
          </div>
          <div className='hero'>
            <h1>Products</h1>
            <Row>
              {products.map((p) => (
                <Col sm={12} ml={6} lg={3} key={p._id}>
                  <Product product={p} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
