import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Products = () => {
    const [alldata, setAlldata] = useState();
    const navigate = useNavigate();
    let ind=1;
    const viewproductHandler = async () => {
        const data = await axios.get('http://localhost:11000/product');
        setAlldata(data?.data);
     }
    useEffect(() => {
        viewproductHandler();
    }, []);

    return (
        <div className='overflow-auto'>
            <div className='m-2 d-flex'>
                <Button variant="warning" className='m-auto'>
                    <Link to='/AddProduct' className='text-dark text-decoration-none'>Add + </Link>
                </Button>
            </div>
            <Table striped>
                <thead className='table-dark'>
                    <tr>
                        <th>S.No</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Category</th>
                        <th>Discription</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alldata?.map((data)=>data?.showdata?.map((data,index)=>(
                              <tr onClick={() => navigate(`/ViewProduct/${data?._id}`)}>
                                <td>{ind++}</td>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td>{data.qty}</td>
                                <td>{data.category}</td>
                                <td>{data.discription}</td>
                                <td>
                                    <Col xs={6} md={4}>
                                        <Image src={data.image} roundedCircle style={{ width: '50px', height: '50px', backgroundSize: '100% 100%' }} />
                                    </Col></td>
                                <td>
                                    <NavDropdown id="navbarScrollingDropdown">
                                        <NavDropdown.Item href={`/ViewProduct/${data?._id}`} className='border-bottom'>View</NavDropdown.Item>
                                        <NavDropdown.Item href={`/EditProduct/${data?._id}`} className='border-bottom'>Edit</NavDropdown.Item>
                                        <NavDropdown.Item href={`/DeleteProduct/${data?._id}`}>Delete</NavDropdown.Item>
                                    </NavDropdown>
                                </td>
                            </tr>
                        )))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Products