import contactReducer from './contactReducer';

describe('Contact Reducer', () => {
  // Test case: it should return the initial state when the action type is not recognized
  test('should return the initial state when action type is not recognized', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = contactReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  // Test case: it should update the state when the action type is 'contact_details'
  test('should update the state when the action type is "contact_details"', () => {
    const initialState = [];
    const payload = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    const action = { type: 'contact_details', payload };
    const newState = contactReducer(initialState, action);
    expect(newState).toEqual(payload);
  });

  // Test case: it should preserve the previous state when the action type is not 'contact_details'
  test('should preserve the previous state when the action type is not "contact_details"', () => {
    const initialState = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    const action = { type: 'SOME_OTHER_ACTION' };
    const newState = contactReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
