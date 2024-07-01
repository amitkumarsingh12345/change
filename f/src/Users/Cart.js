import React, { useRef, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Cart = () => {
    const data = JSON.parse(localStorage.getItem('order'));
    const [alldata, setAlldata] = useState(data);
    const navigate = useNavigate();

    const qtyAddHandler = (val) => {
        console.log(val);
    }
    const qtyMinusHandler = (val) => {
        console.log(val);
    }
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
                            <th>Action</th>
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
                                    <td>
                                        <div class="ms-3 btn-group btn-group-sm" role="group" >
                                            <input type="button" value="-" class="btn btn-outline-secondary btn-secondary text-white ms-5" onClick={() => qtyMinusHandler(data.qty)} />
                                            <input type="button" value="+" class="btn btn-outline-primary btn-primary text-white" onClick={() => qtyAddHandler(data.qty)} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div >
                <button className='btn btn-primary me-2'>Check out</button>
                <button className='btn btn-primary' onClick={() => navigate('/All')}>Cancel</button>
            </div>
        </div>
    )
}

export default Cart