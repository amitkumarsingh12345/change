import React, { useEffect, useState } from 'react'
import Category from './Categories'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

const Categories = () => {
  const [viewdata, setViewdata] = useState();
  const navigate = useNavigate();

  const viewHandler = async () => {
    const dt = await axios.get('http://localhost:11000/category');
    setViewdata(dt.data);
  }
  useEffect(() => {
    viewHandler();
  }, []);

  return (
    <div className='overflow-auto'>
      <div className='m-2 d-flex'>
        <Button variant="warning" className='m-auto'>
          <Link to='/AddCategory' className='text-dark text-decoration-none'>Add + </Link>
        </Button>
      </div>
      <Table striped>
        <thead className='table-dark'>
          <tr>
            <th>S.No</th>
            <th>Category</th>
            <th>Discription</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {
            viewdata?.map((data, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.discription}</td>
                <td>
                  <Button variant="success">
                    <Link to={`/ViewCategory/${data._id}`} className='text-decoration-none text-dark'>View</Link>
                  </Button>
                </td>
                <td>
                  <Button variant="warning">
                    <Link to={`/EditCategory/${data._id}`} className='text-decoration-none text-dark'>Edit</Link>
                  </Button>
                </td>
                <td>
                  <Button variant="info">
                    <Link to={`/DeleteCategory/${data._id}`} className='text-decoration-none text-dark'>Delete</Link>
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Categories