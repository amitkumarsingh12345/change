// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import { Link, NavLink, useNavigate } from 'react-router-dom';

// const Customer = () => {
//     const [customer, setCustomer] = useState();
//     const customerHandler = async () => {
//         const cust = await axios.get('http://localhost:11000/user');
//         setCustomer(cust?.data);
//         console.log(cust);
//     }
//     useEffect( () => {
//         customerHandler();
//     },[])

//     return (
//         <div className='overflow-auto p-md-3'>
//             <Table striped className='m-auto mt-3'>
//                 <thead className='table-dark'>
//                     <tr>
//                         <th>S.No</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                         <th>Date</th>
//                         <th>Purchase</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         customer?.map((data, index) => (
//                             <tr>
//                                 <td>{index + 1}</td>
//                                 <td>{data.name}</td>
//                                 <td>{data.email}</td>
//                                 <td>{data.phone}</td>
//                                 <td>{data.Date}</td>
//                                 <td>
//                                     <Button variant="info">
//                                         <Link to={`/Perchase/${data._id}`} className='text-decoration-none text-dark'>View</Link>
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))
//                     }

//                 </tbody>
//             </Table>
//         </div>
//     )
// }

// export default Customer



import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';

const Customer = () => {
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
            <h3 style={{textAlign:'center'}}>Ordered Product</h3>
            <Table striped className='m-auto mt-3'>
                <thead className='table-dark'>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((data, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td>{data.qty}</td>
                                <td>{data.category}</td>
                                <td>{data.date}</td>
                                <td>{data.time}</td>
                                <td>
                                   <img src={`${data.image}`} alt='' style={{width:'50px', height:'50px',borderRadius:'50%',backgroundSize:'100% 100%'}}/>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default Customer