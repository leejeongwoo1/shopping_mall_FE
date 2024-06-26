import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const response = await api.post("/order", payload);
    console.log(response.data.orderNum, 1);
    dispatch({
      type: types.CREATE_ORDER_SUCCESS,
      payload: response.data.orderNum,
    });
    dispatch(cartActions.getCartQty());
    navigate("/payment/success");
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const response = await api.get("/order/me");
    dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, error: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};
const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });
    const response = await api.get("./order", { params: { ...query } });
    dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, error: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    const response = await api.put(`/order/${id}`, { status });
    dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: response.data });
    dispatch(
      commonUiActions.showToastMessage("오더 업데이트 완료!", "success")
    );
    dispatch(getOrderList());
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, error: error.message });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
