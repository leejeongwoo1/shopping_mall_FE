import * as types from "../constants/order.constants";

const initialState = {
  orderList: [],
  selectedOrder: {},
  totalPageNum: 1,
  loading: false,
  error: "",
  orderNum: "",
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
    case types.GET_ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, orderNum: payload };
    case types.GET_ORDER_SUCCESS:
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
    case types.GET_ORDER_LIST_FAIL:
      return { ...state, error: payload, loading: false };
    case types.SET_SELECTED_ORDER:
      return { ...state, selectedOrder: payload };
    default:
      return state;
  }
}
export default orderReducer;
