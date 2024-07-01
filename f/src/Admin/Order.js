import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';

const Order = () => {
    const [data, setData] = useState();
    const customerHandler = async () => {
        const cust = await axios.get('http://localhost:11000/order');
        setData(cust?.data);
        console.log(cust);
    }
    useEffect( () => {
        customerHandler();
    },[])

    return (
        <div className='overflow-auto p-md-3'>
            <Table striped className='m-auto mt-3'>
                <thead className='table-dark'>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customer?.map((data, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td>{data.qty}</td>
                                <td>{data.category}</td>
                                <td>
                                   <img src={`${data.image}`} alt=''/>
                                </td>
                                <td>{data.date}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default Order