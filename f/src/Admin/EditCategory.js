import React, { useEffect, useState } from 'react'
import Category from './Categories'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({
    name: "",
    discription: ""
  });

  const findHandler = async (event) => {
    const dt = await axios.get(`http://localhost:11000/category/${params.id}`);
    setData({
       name:dt?.data[0]?.name,
       discription:dt?.data[0]?.discription 
     });
     console.log(data);
  }

  useEffect(() => {
     findHandler();
  },[]);

  const dataHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const addHandler = async (event) => {
    event.preventDefault();
    const dt = await axios.put(`http://localhost:11000/category/${params.id}`, data);
    navigate('/Categories');
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Category Form</h2>
      <Form onSubmit={addHandler}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder="Enter category name" name="name" value={data.name} onChange={dataHandler} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" name="discription" value={data.discription} onChange={dataHandler} />
          </Form.Group>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Update
          </Button>{'   '}
          <Button variant="primary" type="button" onClick={() => navigate('/Categories')}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>

  );
}
export default EditCategory