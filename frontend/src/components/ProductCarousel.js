import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);

  const { loading, error, products } = productTopRated;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    // <Carousel pause='hover' className='bg-dark'>
    //   {products.map((product) => (
    //     <Carousel.Item key={product._id}>
    //       <Link to={`/product/${product._id}`}>
    //         <Image src={product.image} alt={product.name} fluid />
    //         <Carousel.Caption className='carousel-caption'>
    //           <h2>
    //             {product.name} (${product.price})
    //           </h2>
    //         </Carousel.Caption>
    //       </Link>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
    <Carousel responsive={responsive}>
      {products.map((product) => (
        <Link to={`/product/${product._id}`}>
          <Image src={product.image} alt={product.name} fluid />
          <div>
            <h5>
              {product.name} (${product.price})
            </h5>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
