import * as types from "../constants/review.constants";
const initialState = {
  loading: false,
  error: "",
  reviewList: [],
};

function reviewReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REVIEW_CREATE_REQUEST:
    case types.REVIEW_GET_REQUEST:
      return { ...state, loading: true };
    case types.REVIEW_CREATE_SUCCESS:
      return { ...state, loading: false, error: "" };
    case types.REVIEW_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        reviewList: payload.reviewList,
      };

    case types.REVIEW_CREATE_FAIL:
    case types.REVIEW_GET_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default reviewReducer;
