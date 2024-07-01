import React, { useEffect, useState } from 'react'
import './App.css';
import Carousels from './Caponents/Carousels';
import Cards from './Caponents/Cards';
import axios from 'axios';
import Nabtab from './Caponents/Nabtab';
import { useNavigate, useParams } from 'react-router-dom';
import Groupbtn from './Caponents/Groupbtn';
import NavtabForSm from './Caponents/NavtabForSm';

const Home = (props) => {
    const [allproduct, setAllproduct] = useState();
    const params = useParams();
    const user = localStorage.getItem('user');

    const productHandler = async () => {
        let data = await axios.get('http://localhost:11000/product');

        if (params.id && params.id != 'All') {
            data = data?.data?.map((data) => data?.showdata?.filter((dt) => dt.category == params.id));
            setAllproduct(data);
        } else {
            data = data?.data?.map((data) => data?.showdata?.filter((dt) => dt.category != params.id));
            setAllproduct(data);
        }
    }
    useEffect(() => {
        productHandler();
    }, []);

    return (
        <>
            <div className='d-none '>
                <Nabtab />
            </div>
            <div className='d-block'>
                <NavtabForSm/>
            </div>
            <Groupbtn />
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col'>
                        <Carousels />
                    </div>
                </div>
            </div>
            <div className='container-fluid ' style={{ boxShadow: '0px 0px 10px white' }}>
                <div className='row justify-content-space-evenly justify-content-sm-center d-flex flex-direction-column my-2'>
                    {
                        allproduct?.map((data) => data?.map((dt) => (
                            <div className='d-flex justify-content-center col-sm-6 col-md-4 col-lg-3 col-xl-2 my-2' >
                                <Cards props={dt} />
                            </div>
                        )))
                    }
                </div>
            </div>
        </>
    )
}

export default Home