import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <>
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
                <Nav.Link href='#login'>Login</Nav.Link>
                <Nav.Link href='#signup'>Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className='top-nav-wrapper-search'>
          <LinkContainer to='/'>
            <Navbar.Brand>Shop it</Navbar.Brand>
          </LinkContainer>
          <Form inline>
            <FormControl type='text' placeholder='Search' />
            <Button>
              <i className='fa fa-search' aria-hidden='true'></i>
            </Button>
          </Form>
          <div className='d-block order-cart'>
            <Nav.Link href='#cart' className='cart'>
              <i className='fa fa-shopping-cart' aria-hidden='true'></i>
            </Nav.Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
