const initialState = {
    username: null,
    loading: false
};

const reducer = (state, action) => {
    if (!state) return initialState;
    switch (action.type) {
        case 'SIGN_UP_STARTED':
            return Object.assign({}, state, {
                loading: true
            });

        case 'SIGN_UP_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                username: action.username
            });
    }
}
const store = Redux.createStore(
    reducer,
    Redux.applyMiddleware(ReduxThunk.default)
);
const ReduxBehavior = PolymerRedux(store);
const AsyncActionsBehavior = {
    actions: {
        signUpWithTimeout: function(username) {
            return function(dispatch) {
                dispatch({
                    type: 'SIGN_UP_STARTED'
                });
                // Do async task
                setTimeout(function() {
                    dispatch({
                        type: 'SIGN_UP_COMPLETE',
                        username: username
                    });
                }, 3000);
            }
        }
    }
};
