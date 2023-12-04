import { Row, Col, Card } from "react-bootstrap";
import './favourite.css'
import ScrollToTop from "react-scroll-to-top";
import FAVOURITE_ACTION from "../../redux/favourite/favourite_action";
import { connect } from "react-redux";
import { Rate } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { add_favourite, get_favourite_id, list_favourite, modify_favourite } from "../../services/favourite_service";
import { useEffect } from "react";
import { addFOC } from "../../services/user_service";
function Favourite(props) {
    const favouriteList = props.state[0].favourite;
    const user = props.state[1].currentUser;
    const navigate = useNavigate();
    const deleteFavourite = (index) => {
        const deleteList = [...favouriteList];
        deleteList.splice(index, 1);
        props.deleteFavourite(deleteList);
    }

    const loadFavourite = async () => {
        try {
            const rs = await get_favourite_id(user.user_id);
            if (rs.message === "No favourite exists for this user") {
                try {
                    const en = await add_favourite({ items: favouriteList });
                    const us = await addFOC({ user_id: user.user_id, favourite: en.favourite_id });
                    return us;
                }
                catch (error) {
                    console.log(error);
                }
            }
            const ds = await modify_favourite({ favourite_id: rs, items: favouriteList });
            return ds;

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadFavourite();
    }, [favouriteList])
    useEffect(() => {
        if (!user.user_id) {
            navigate('/');
        }
    }, [user])
    return (
        <>
            <div className='banner_favourite'>
                <h1>Favourite</h1>
            </div>

            <div className="container">
                <Row className="h-30">
                    {
                        favouriteList.map((item, index) => (
                            <Col xs={3} className="mt-2 mb-2 text-center h-50 item" key={index}>

                                <div className="delete_button" typeof="submit" onClick={() => deleteFavourite(index)}><i className="bi bi-x-lg"></i></div>
                                <Card>
                                    <Link to={`/product/${item.product_id}`}>
                                        <Card.Img variant="top" src={item.thumbnail} alt="product-img" height={"300px"} loading="lazy" />
                                        <Card.Title>
                                            <div className="info_pro">
                                                <p className='product_name'>{item.title}</p>
                                                <p className='product_price'>{item.price}$</p>
                                                <Rate disabled value={item.rating} style={{ color: "#d8d81a", fontSize: "1rem", display: "flex", paddingLeft: "10px" }} />
                                            </div>
                                        </Card.Title>
                                    </Link>
                                </Card>

                            </Col>
                        ))
                    }

                </Row>
            </div>
            <ScrollToTop smooth color="#000" />

        </>
    );
}
const mapStateToProps = (state, ownProp) => {
    return {
        state: [state.favourite_reducer, state.user_reducer]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteFavourite: (favourite) => {
            dispatch({ type: FAVOURITE_ACTION.DELETE_FAVOURITE, payload: favourite })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favourite);