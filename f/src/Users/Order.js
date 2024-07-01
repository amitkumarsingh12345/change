import React, { useRef, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Order = () => {
  const data = JSON.parse(localStorage.getItem('order'));
  const [alldata, setAlldata] = useState(data);
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column justify-content-center overflow-auto w-75 m-auto mt-2'>
      <div className=''>
        <Table striped>
          <thead className='table-dark'>
            <tr>
              <th>S.No</th>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody className='fw-bold'>
            {
              alldata?.map((data, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                  <td>{data.category}</td>
                  <td>{data.qty}</td>
                  <td>
                    <Col xs={6} md={4}>
                      <Image src={data.image} roundedCircle style={{ width: '50px', height: '50px', backgroundSize: '100% 100%' }} />
                    </Col>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
      <div >
        <button className='btn btn-primary me-2'>Order</button>
        <button className='btn btn-primary' onClick={() => navigate('/All')}>Cancel</button>
      </div>
    </div>
  )
}

export default Order