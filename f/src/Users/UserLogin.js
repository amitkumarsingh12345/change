import axios from "axios";
import {useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [auth, setAuth] = useState(null);
    const [alert, setAlert] = useState(false);
    const [change, setChange] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [forget, setForget] = useState({
        email: "",
        password: ""
    });

    //-------------------Forget------------------------- 

    const changeHandler = event => {
        setForget({ ...forget, [event.target.name]: event.target.value });
    }
    const forgetHandler = async () => {
        const data = await axios.put('http://localhost:11000/user', forget);
        console.log(data.data.Massage);
        if (data.data.Massage == 'Data Modified!!') {
            setChange(true);
        }
    }

    //-------------------Login------------------------- 

    const userHandler = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    const loginHandler = async event => {
        event.preventDefault();
        const data = await axios.post('http://localhost:11000/userlogin', user);
        JSON.stringify(data.data.name) ? localStorage.setItem("user", JSON.stringify(data?.data?.email)) : setAlert(true);
        setAuth(localStorage.getItem("user"));
        if(auth) {
          navigate('/All');
        } else {
            setAlert(true);
        }
    }

    //-------------------Close------------------------- 
    const cancelHandler = () => {
        navigate('/All');
    }

    return (
        <div className='w-75 w-md-50 container-fluid bg-white p-3 p-md-5 mt-3' style={{
            borderRadius: '5px',
            boxShadow: '0px 0px 1px gray'
        }}>

            {alert ? <div className="alert alert-primary" role="alert">
                This Acount not exist. {" "}
                <NavLink to="/Signup" className="alert-link">
                    Signup
                </NavLink>
                {" "} for new acount.
            </div> : ""
            }
            {
                change?<div className="alert alert-primary" role="alert">
                    Password updated & new password [{forget.password}]
                </div>:""
            }

            <form>
                <div className='row'>
                    <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Your Email</label>
                        <input type="email" name="email"
                            value={user.email}
                            onChange={userHandler}
                            className="form-control"
                            required=""
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Your Password</label>
                        <input type="password" name="password"
                            value={user.password}
                            onChange={userHandler}
                            className="form-control"
                            required=""
                        />


                        <div className="col">
                            <NavLink to="/Signup" className='text-decoration-none' data-bs-toggle="modal" data-bs-target="#exampleModal">Forget password</NavLink>
                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                                                <input type="email" className="form-control" value={forget.email}
                                                    name="email"
                                                    onChange={changeHandler} id="exampleFormControlInput1" placeholder="name@example.com" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleFormControlInput1" className="form-label">New password</label>
                                                <input type="email" className="form-control"
                                                    value={forget.password}
                                                    name="password"
                                                    onChange={changeHandler}
                                                    id="exampleFormControlInput1" placeholder="newpassword@example" />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={forgetHandler} data-bs-dismiss="modal">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className="col">
                        <button className="btn btn-warning me-1 my-sm-0" onClick={cancelHandler}>Cancel</button>
                        <button type="button" onClick={loginHandler} class="btn btn-warning my-2 my-sm-0">Login</button>
                    </div>
                </div>
            </form>
        </div >

    )
}
export default UserLogin;