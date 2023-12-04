import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import './orders.css';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { list_order } from "../../services/order_service";
function Orders(props) {
    const navigate = useNavigate();
    const order = props.state[0].order;
    const user = props.state[1].currentUser;
    const [orders, setOrders] = useState([]);
    const loadOrder = async () => {
        try {
            const rs = await list_order(user.user_id);
            setOrders(rs.products.order);
        } catch (error) {
            console.log(error);
        }
    }
    const convertDate = (date) => {
        const dateObject = new Date(date);
        const day = dateObject.getUTCDate();
        const month = dateObject.getUTCMonth() + 1; // Month is zero-based, so we add 1
        const year = dateObject.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }
    useEffect(() => {
        loadOrder();
    }, [])
    useEffect(() => {
        if (!user.user_id) {
            navigate('/');
        }
    }, [user])
    return (
        <>
            <div className="container">
                <h1 className="title_orders">Orders</h1>
                <Table className="orders_data" >
                    <thead>
                        <tr style={{ backgroundColor: "#343a40" }}>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Total</th>
                            <th>Date order</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.first_name + " " + item.last_name}</td>
                                    <td>{item.total}$</td>
                                    <td>{convertDate(item.createdAt)}</td>
                                    <td className="link_detail">
                                        <Link to={`/orderdetail/${item._id}`} className="detail">Detail</Link></td>
                                </tr>
                            ))
                        }


                    </tbody>
                </Table>

            </div>
            <ScrollToTop smooth color="#000" />
        </>
    );
}
const mapStateToProps = (state, ownProp) => {
    return {
        state: [state.order_reducer, state.user_reducer]
    }
}
export default connect(mapStateToProps, null)(Orders);