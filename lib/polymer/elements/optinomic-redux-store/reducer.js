const reducer = (state, action) => {
    if (!state) return initialState;
    switch (action.type) {

        case 'GET_DATA_STARTED':
            return Object.assign({}, state, {
                loading: true
            });

        case 'KOMED_LOGIN_COMPLETE':
            return Object.assign({}, state, {
                komed: action.data
            });

        case 'GET_CURRENT_USER_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                user: action.data
            });

        case 'GET_CURRENT_PATIENT_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                patient: action.data
            });

        case 'GET_CURRENT_PATIENT_STAYS_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                stays: action.data
            });

        case 'GET_CLINIC_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                clinic: action.data
            });

        case 'GET_APPS_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                apps: action.data
            });

        case 'GET_SURVEY_RESPONSES_COMPLETE':
            var sr = Object.assign({}, state.survey_responses);
            var app_id = action.data.app_id;
            sr.data[app_id] = action.data;

            //console.log('(!) GET_SURVEY_RESPONSES_COMPLETE', app_id, sr);
            return Object.assign({}, state, {
                loading: false,
                survey_responses: sr
            });

        case 'SIGN_UP_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                username: action.username
            });
    }
};

const store = Redux.createStore(
    reducer,
    Redux.applyMiddleware(ReduxThunk.default)
);

const ReduxBehavior = PolymerRedux(store);
