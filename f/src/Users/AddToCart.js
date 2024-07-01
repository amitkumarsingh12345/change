import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const AddToCart = () => {
  const params = useParams();
  const data = JSON.parse(params.id);
  const qty = parseInt(data.qty);
  const [qt, setQt] = useState(qty);
  const email = JSON.parse(localStorage.getItem('user'));

  const orderHandler = async () => {
    const order = await axios.post('http://localhost:11000/order', {
      name: data.name,
      price: data.price,
      category: data.category,
      email: email,
      qty: qt,
      image: data.image
    });
    console.log(order);
  }

  const qtyHandler = (e) => {
    if (e.target.value == '-') {
      if (qt > 1) {
        setQt(qt - 1);
      }
    } else if (e.target.value == '+') {
      setQt(qt + 1);
    }
  }

  return (
    <div className="w-25 mt-3 m-auto">
      <img src={`/${data.image}`} className="card-img-top m-auto my-3" alt="..." style={{ maxHeight: '200px', maxWidth: '350px' }} />
      <div className="card-body lh-1 ">
        <h5 className="card-title mb-2 pb-2" style={{ borderBottom: '1px solid black' }}>{data.name}</h5>
        <p className="card-text pb-2 fw-bold" style={{ borderBottom: '1px solid black' }}>Product Price : {data.price}</p>
        <p className="card-text pb-2 fw-bold" style={{ borderBottom: '1px solid black' }}>Product Quentity : {qt}</p>
        <p className="card-text pb-2 fw-bold" style={{ borderBottom: '1px solid black' }}>Product Category : {data.category}</p>
        <p className="card-text pb-2 fw-bold" style={{ borderBottom: '1px solid black' }}>Product Discription : {data.discription}</p>
        <p className="card-text pb-2 fw-bold"><small className="text-muted">{ }</small></p>
        <div className='d-flex justify-content-center'>
          <div class="ms-3 btn-group btn-group-sm me-2" role="group" >
            <input type="button" value="-" class="btn btn-outline-danger " onClick={qtyHandler} />
            <input type="button" value="+" class="btn btn-outline-warning " onClick={qtyHandler} />
          </div>
          <div className='w-25'>
            <button className='btn btn-warning btn-sm' onClick={orderHandler}>Buy now</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AddToCart