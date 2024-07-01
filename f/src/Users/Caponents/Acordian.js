import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { TopCart } from '../Header';

function Acordian({ data }) {
    const [qt, setQt] = useState(1);
    const [order, setOrder] = useState();
    const email = localStorage.getItem('user');

    // const qtyHandler = (ref) => {
    //     if (qt > 1 && ref.target.value == '-') {
    //         setQt(qt - 1);
    //     } else if (ref.target.value == '+') {
    //         setQt(qt + 1);
    //     }
    // }

    const orderHandler = (...prop) => {
        const qt = localStorage.getItem('qt');
        const prod = qt ? parseInt(qt) + 1 : 1;
        setQt(prod);
        const orders = {
            name: prop[0],
            price: prop[2],
            category: prop[1],
            email: email,
            qty: 1,
            image: prop[3],
        };

        let arr = [];
        if (prod == 1) {
            arr.push(orders);
            localStorage.setItem('qt', prod);
        } else {
            const data = JSON.parse(localStorage.getItem('order'));
            const filtered = data?.filter((dt) => dt.name==prop[0]);
            if(filtered.length>0) {
                filtered[0].qty = (filtered[0].qty+1);
                arr.push(...data);
                localStorage.setItem('qt', prod-1);
            } else {
                arr.push(...data, orders);
                localStorage.setItem('qt', prod);
            }
        }
        setOrder(arr);
        console.log(arr);
    }

    return (
        <Accordion defaultActiveKey="1">
            {order ? localStorage.setItem('order', JSON.stringify(order)) : ""}
            <Accordion.Item eventKey="1">
                <Accordion.Header>About</Accordion.Header>
                <Accordion.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        From <i class="fa-solid fa-indian-rupee-sign"></i>{' '}{data.price}<br />
                        Qty. [{qt}]
                    </Card.Text>
                    <Card.Text>
                        <div className='d-flex justify-content-evenly'>
                            <div className='me-1'>         
                                   <button className='btn btn-warning btn-sm' onClick={() => orderHandler(data.name, data.category, data.price, data.image)}>
                                        <i className="fa-solid fa-cart-arrow-down"></i>
                                    </button>          
                            </div>
                            <div className=''>
                                <button className='btn btn-warning btn-sm'>Buy now</button>
                            </div>
                        </div>

                    </Card.Text>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default Acordian;