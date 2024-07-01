import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [data, setData] = useState();
    const navigate = useNavigate("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [qty, setQty] = useState("");
    const [discription, setDiscription] = useState("");

    const categoryHandler = async () => {
        let dt = await axios.get('http://localhost:11000/category');
        setData(dt?.data);
    }

    useEffect(() => {
        categoryHandler();
    }, []);

    const addHandler = async event => {
        event.preventDefault();
        console.log(image);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('qty', qty);
        formData.append('discription', discription);
        let result = await axios.post('http://localhost:11000/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        navigate('/Products');
    }

    const cancelHandler = () => {
        navigate('/Products');
    }

    return (
        <div className='container w-sm-75 w-lg-50 p-3' style={{ boxShadow: '0px 0px 2px warning' }}>
            <form onSubmit={addHandler} method="">
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
                            <option selected>Open this select menu</option>
                            {
                                data?.map((data, index) => <option value={data.name}>{data.name}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Product image</label>
                        <input type="file" name="image"
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
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Create</button>
                    </div>
                    <div className="col-2 mt-2">
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={cancelHandler}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddProduct;