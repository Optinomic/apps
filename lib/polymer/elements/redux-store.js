const initialState = {
    "loading": false,
    "username": null,
    "clinic": {
        "error": false,
        "data": null
    }
};

const reducer = (state, action) => {
    if (!state) return initialState;
    switch (action.type) {
        case 'GET_DATA_STARTED':
            return Object.assign({}, state, {
                loading: true
            });

        case 'GET_CLINIC_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                clinic: action.clinic
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
        actionGetClinic: function() {
            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
                });
                // Do async task
                helpers.callAPI('GET', '/clinic', {}, {}, function(req) {
                    if (req.status == 200) {
                        var resp = JSON.parse(req.response);

                        // All fields are coming as array: Make Object out of it:
                        var json_data = {};
                        resp.clinic.forEach(function(item, itemIndex) {
                            json_data[item[0]] = item[1];
                        });

                        var response = {
                            "error": false,
                            "data": json_data
                        };

                        response.data.array = resp.clinic;

                        console.log('The response is ', response);
                    } else {
                        var response = {
                            "error": true,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status
                        };
                        console.err('(!) Error: ', response);
                    };
                    dispatch({
                        type: 'GET_CLINIC_COMPLETE',
                        clinic: response
                    });
                });
            }
        },
        signUpWithTimeout: function(username) {
            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
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
