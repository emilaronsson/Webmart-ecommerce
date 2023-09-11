import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "react-bootstrap";

import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">
                  Your shopping cart is empty
                </h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">
                <div>
                    <h6 className="d-flex align-items-center justify-content-between fs-4 fw-bold">
                        Subtotal:
                        <span className="fs-4 fw-bold">${totalAmount}</span>
                    </h6>
                    
                </div>
                <p className="fs-6 mt-2">taxes and shipping will be calculated in checkout</p>
                <div>
                    <Link to='/checkout'>
                        <button className="buy__btn w-100">
                            Checkout
                        </button>
                    </Link>
                    <Link to='/shop'>
                        <button className="buy__btn w-100 mt-3">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({item}) => {

    const dispatch = useDispatch();
    const deleteProduct = () => {
        dispatch(cartActions.deleteFromCart(item.id))
    }
    return <tr >
    <td>
      <img src={item.imgUrl} alt="" />
    </td>
    <td>{item.productName}</td>
    <td>${item.price}</td>
    <td>{item.quantity}</td>
    <td>
      <motion.i whileTap={{scale:1.2}} onClick={deleteProduct} class="ri-delete-bin-line"></motion.i>
    </td>
  </tr>
}

export default Cart;
