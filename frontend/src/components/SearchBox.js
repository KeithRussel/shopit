import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form inline onSubmit={submitHandler}>
      <Form.Control
        type='text'
        placeholder='Search'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button>
        <i className='fa fa-search' aria-hidden='true'></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
