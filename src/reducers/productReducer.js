const productReducer = (state, action) => {
  console.log('product reducer');
  switch (action.type) {
  case 'LIST_PRODUCTS':
    return action.payload;
  case 'FILTER_PRODUCTS':
    return action.payload;
  default:
    return state;
  }
};

export default productReducer;
