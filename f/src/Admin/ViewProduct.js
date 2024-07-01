import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';

const ViewProduct = () => {
    const [data, setData] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    const findHandler = async () => {
        const dt = await axios.get(`http://localhost:11000/product/${params.id}`);
        setData(dt?.data[0]);
    }
    useEffect(() => {
        findHandler();
    }, []);

    return (
        <div className="w-25 mt-3 m-auto">
        <img src={`/${data.image}`} className="card-img-top m-auto my-3" alt="..." style={{ maxHeight: '200px', maxWidth: '350px' }} />
        <div className="card-body lh-1 ">
          {/* <h5 className="card-title mb-2 pb-2" style={{ borderBottom: '1px solid black' }}>Product Name : {data.name}</h5> */}
          <p className="card-text pb-2 fw-bold" style={{ borderBottom: '1px solid black' }}>Product Name : {data.name}</p>
          <p className="card-text pb-2 fw-bold" style={{ borderBottom: '1px solid black' }}>Product Price : {data.price}</p>
          <p className="card-text pb-2 fw-bold" style={{ borderBottom: '1px solid black' }}>Product Quentity : {data.qty}</p>
          <p className="card-text pb-2 fw-bold" style={{ borderBottom: '1px solid black' }}>Product Category : {data.category}</p>
          <p className="card-text pb-2 fw-bold" style={{ borderBottom: '1px solid black' }}>Product Discription : {data.discription}</p>
          <p className="card-text pb-2 fw-bold"><small className="text-muted">{ }</small></p>
          <div className='d-flex justify-content-center'>
            <div className='w-25'>
              <button className='btn btn-warning btn-sm' onClick={() => navigate('/Products')}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ViewProduct