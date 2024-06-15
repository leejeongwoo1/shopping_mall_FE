import api from "../utils/api";
import * as types from "../constants/review.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const createReview = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.REVIEW_CREATE_REQUEST });
    await api.post("/review", formData);
    dispatch({ type: types.REVIEW_CREATE_SUCCESS });
    console.log(formData, 1);
    dispatch(getReviewList(formData.productId));
  } catch (error) {
    dispatch({ type: types.REVIEW_CREATE_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage("댓글 등록 실패", "error"));
  }
};

const getReviewList = (productId) => async (dispatch) => {
  try {
    dispatch({ type: types.REVIEW_GET_REQUEST });
    const response = await api.get(`/review/${productId}`);
    console.log(response.data);
    dispatch({ type: types.REVIEW_GET_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.REVIEW_GET_FAIL, payload: error.message });
    dispatch(
      commonUiActions.showToastMessage(
        "댓글을 가져오는데 실패하였습니다",
        "error"
      )
    );
  }
};

export const reviewActions = {
  createReview,
  getReviewList,
};
