import itemReducer from './itemReducer';

describe('Item Reducer', () => {
  // Test case: it should return the initial state when the action type is not recognized
  test('should return the initial state when action type is not recognized', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = itemReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  // Test case: it should update the state when the action type is 'LIST_ITEMS'
  test('should update the state when the action type is "LIST_ITEMS"', () => {
    const initialState = [];
    const payload = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    const action = { type: 'LIST_ITEMS', payload };
    const newState = itemReducer(initialState, action);
    expect(newState).toEqual(payload);
  });

  // Test case: it should preserve the previous state when the action type is not 'LIST_ITEMS'
  test('should preserve the previous state when the action type is not "LIST_ITEMS"', () => {
    const initialState = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    const action = { type: 'SOME_OTHER_ACTION' };
    const newState = itemReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
