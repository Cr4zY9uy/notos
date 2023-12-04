import { Table } from "react-bootstrap";
import './orderdetail.css';
import ScrollToTop from "react-scroll-to-top";
import { get_order_by_id } from "../../services/order_service";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function OrdersDetail() {
    const { detail } = useParams();
    const [orderDetail, setOrderDetail] = useState({});
    const loadOrderDetail = async () => {
        try {
            const rs = await get_order_by_id(detail);
            // console.log(rs);
            setOrderDetail(rs);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        loadOrderDetail();
    }, [orderDetail])
    return (
        <section className="container">
            <h1>Order detail</h1>
            <table className="infor_orderdetail">
                <tbody>
                    <tr>
                        <td className="title_info ">Full name:</td>
                        <td className="infor_detail ">{orderDetail.first_name + " " + orderDetail.last_name}</td>
                    </tr>
                    <tr>
                        <td className="title_info ">Phone: </td>
                        <td className="infor_detail ">{orderDetail.phone}</td>
                    </tr>
                    <tr>
                        <td className="title_info ">Address:</td>
                        <td className="infor_detail ">{orderDetail.address}</td>
                    </tr>
                    <tr>
                        <td className="title_info ">Payment method:</td>
                        <td className="infor_detail ">{orderDetail.payment}</td>
                    </tr>
                    <tr>
                        <td className="title_info ">Shipping:</td>
                        <td className="infor_detail ">{orderDetail.shipping}</td>
                    </tr>
                </tbody>
            </table>
            <Table >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetail?.items?.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td><img src={item.thumbnail} width={"120px"} height={"150px"} alt="product" /></td>
                            <td>{item.quantity}</td>
                            <td>{item.price}$</td>
                            <td>{item.price * item.quantity}$</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ScrollToTop smooth color="#000" />

        </section>
    );
}
export default OrdersDetail;