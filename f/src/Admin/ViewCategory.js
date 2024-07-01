import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const ViewCategory = () => {
   const [data,setData] = useState();
   const params =  useParams();
   const navigate = useNavigate();
   const editHandler = async() => {
       const dt = await axios.get(`http://localhost:11000/category/${params.id}`);
       setData(dt?.data[0]);
   }
   useEffect( () => {
      editHandler();
   },[]);

   return(
    <div className='d-flex p-5'>
    <Card className='m-auto'>
      <Card.Header as="h5">Category</Card.Header>
      <Card.Body>
        <Card.Title>{data?.name}</Card.Title>
        <Card.Text>
          {data?.discription}
        </Card.Text>
        <Button variant="warning" onClick={() => navigate('/Categories')}>Close</Button>
      </Card.Body>
    </Card>
    </div>
   )
}
export default ViewCategory