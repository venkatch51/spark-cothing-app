const contactReducer = (state = [], action) => {
  console.log('Contactreducer');
  switch (action.type) {
  case 'contact_details':
    return action.payload;
  default:
    return state;
  }
};

export default contactReducer;
