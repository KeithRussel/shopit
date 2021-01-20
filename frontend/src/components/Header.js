import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const removeBadge = () => {
    // const element = document.getElementsByClassName('fa-shopping-cart');
    // element.classList.remove('badge-cart');
    console.log('test');
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      removeBadge();
      // console.log('test');
    }
  });

  return (
    <header>
      <div className='top-nav'>
        <div className='top-nav-wrapper'>
          <Navbar>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='#sell-centre'>Sell Centre</Nav.Link>
                <Nav.Link href='#download'>Download</Nav.Link>
              </Nav>
              <Nav className='ml-auto'>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <LinkContainer to='/login'>
                      <Nav.Link href='/login'>
                        <i className='fas fa-user'></i> Login
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                      <Nav.Link href='/register'> Register</Nav.Link>
                    </LinkContainer>
                  </>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className='top-nav-wrapper-search'>
          <LinkContainer to='/'>
            <Navbar.Brand>Shop it</Navbar.Brand>
          </LinkContainer>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <div className='d-block order-cart'>
            <LinkContainer to='/cart'>
              <Nav.Link href='/cart' className='cart'>
                <i
                  data-count={
                    cartItems.length > 0 ? cartItems.length : undefined
                  }
                  className='fa fa-shopping-cart badge-cart'
                  aria-hidden='true'
                ></i>
                {/* <span>2</span> */}
              </Nav.Link>
            </LinkContainer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
