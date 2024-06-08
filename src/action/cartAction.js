import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
const addToCart =
  ({ id, size }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.ADD_TO_CART_REQUEST });
      const response = await api.post("/cart", { productId: id, size, qty: 1 });
      dispatch({
        type: types.ADD_TO_CART_SUCCESS,
        payload: response.data.cartItemQty,
      }); //TODO
      dispatch(
        commonUiActions.showToastMessage(
          "카트에 상품이 추가됐습니다.",
          "success"
        )
      );
    } catch (error) {
      dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.message });
      dispatch(commonUiActions.showToastMessage(error.message, "error"));
    }
  };

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST });
    const response = await api.get("/cart");
    console.log("rrrr", response.data.data);
    dispatch({
      type: types.GET_CART_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(1232);
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.message });
  }
};
const deleteCartItem = (id) => async (dispatch) => {};

const updateQty = (id, value) => async (dispatch) => {};
const getCartQty = () => async (dispatch) => {};
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
