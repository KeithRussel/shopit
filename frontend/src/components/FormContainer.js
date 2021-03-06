import React from 'react';
import { Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Row className='justify-content-md-center form-margin-auto'>
      <Col xs={12} md={6} className='form-bg'>
        {children}
      </Col>
    </Row>
  );
};

export default FormContainer;
