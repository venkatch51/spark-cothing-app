import productReducer from './productReducer';

describe('Product Reducer', () => {
  // Test case: it should return the initial state when the action type is not recognized
  test('should return the initial state when action type is not recognized', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = productReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  // Test case: it should update the state when the action type is 'LIST_PRODUCTS'
  test('should update the state when the action type is "LIST_PRODUCTS"', () => {
    const initialState = [];
    const payload = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    const action = { type: 'LIST_PRODUCTS', payload };
    const newState = productReducer(initialState, action);
    expect(newState).toEqual(payload);
  });

  // Test case: it should update the state when the action type is 'FILTER_PRODUCTS'
  test('should update the state when the action type is "FILTER_PRODUCTS"', () => {
    const initialState = [];
    const payload = [{ id: 1, name: 'Filtered Product 1' }];
    const action = { type: 'FILTER_PRODUCTS', payload };
    const newState = productReducer(initialState, action);
    expect(newState).toEqual(payload);
  });

  // Test case: it should preserve the previous state when the action type is not 'LIST_PRODUCTS' or 'FILTER_PRODUCTS'
  test('should preserve the previous state when the action type is not "LIST_PRODUCTS" or "FILTER_PRODUCTS"', () => {
    const initialState = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    const action = { type: 'SOME_OTHER_ACTION' };
    const newState = productReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
