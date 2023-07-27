const itemReducer = (state = [], action) => {
  console.log('Inside Reducer');
  switch (action.type) {
  case 'LIST_ITEMS':
    return action.payload;
  default:
    return state;
  }
};

export default itemReducer;
