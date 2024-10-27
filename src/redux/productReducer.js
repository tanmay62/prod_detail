const initialState = {
  list: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'FETCH_PRODUCTS_FAIL':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default productReducer;