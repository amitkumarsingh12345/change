import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Category from './Categories';

const EditProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [cat, setCat] = useState();
    const [data, setData] = useState();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [qty, setQty] = useState("");
    const [discription, setDiscription] = useState("");
    const [edit, setEdit] = useState("");

    const findHandler = async () => {
        const data = await axios.get(`http://localhost:11000/product/${params.id}`);
    
        setName(data?.data[0]?.name);
        setPrice(data?.data[0]?.price);
        setCategory(data?.data[0]?.category);
        setImage(data?.data[0]?.image);
        setQty(data?.data[0]?.qty);
        setDiscription(data?.data[0]?.discription);
    }
    const categoryHandler = async () => {
        const data = await axios.get('http://localhost:11000/category');
        setCat(data?.data);
    }
    useEffect(() => {
        findHandler();
        categoryHandler();
    }, []);

    const cancelHandler = () => {
        navigate('/Products');
    }

    const editHandler = async(event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("name",name);
        formdata.append("price",price);
        formdata.append("category",category);
        formdata.append("image",image);
        formdata.append("qty",qty);
        formdata.append("discription",discription);

        const data = await axios.put(`http://localhost:11000/product/${params.id}`,formdata,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        navigate('/Products');
    }
       
    return (
        <div className='container w-sm-75 w-lg-50 p-3' style={{ boxShadow: '0px 0px 2px warning' }}>
            <form onSubmit={editHandler} method="">
                <div className='row'>
                    <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Product name</label>
                        <input type="text" name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} className="form-control"
                            required=""
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Product price</label>
                        <input type="text" name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                            required=""
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Product category</label>
                        <select class="form-select" aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                            <option selected>{category}</option>
                            {
                                cat?.map((data, index) => <option value={data.name}>{data.name}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Product image</label>
                        <input type="file" name="image"     
                            originalname={image}
                            onChange={(event) => setImage(event.target.files[0])}
                            className="form-control"
                            required=""
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Product qty</label>
                        <input type="number" name="qty"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="form-control"
                            required=""
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Product discription</label>
                        <input type="text" name="discription"
                            value={discription}
                            onChange={(e) => setDiscription(e.target.value)}
                            className="form-control"
                            required=""
                        />
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className="col-2 mt-2">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Edit</button>
                    </div>
                    <div className="col-2 mt-2">
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={cancelHandler}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditProduct;