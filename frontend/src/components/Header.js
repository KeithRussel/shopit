import React from 'react';
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

  const logoutHandler = () => {
    dispatch(logout());
  };

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
            <Nav.Link href='#cart' className='cart'>
              <i className='fa fa-shopping-cart' aria-hidden='true'></i>
            </Nav.Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
