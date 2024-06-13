import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import { useNavigate } from "react-router-dom";

import "../style/orderStatus.style.css";

const MyPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { orderList } = useSelector((state) => state.order);
  const navigate = useNavigate();
  if (!user) navigate("/login");
  //오더리스트 들고오기
  useEffect(() => {
    dispatch(orderActions.getOrder());
  }, []);
  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  if (orderList?.length === 0) {
    return (
      <Container className="no-order-box">
        <div>진행중인 주문이 없습니다.</div>
      </Container>
    );
  }
  console.log(orderList);
  return (
    <Container className="status-card-container">
      {orderList.map((item) => (
        <OrderStatusCard
          orderItem={item}
          className="status-card-container"
          key={item._id}
        />
      ))}
    </Container>
  );
};

export default MyPage;
