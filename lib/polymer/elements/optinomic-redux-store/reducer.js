const reducer = (state, action) => {
    if (!state) return initialState;
    switch (action.type) {

        case 'SET_PERSISTENT_STATE':
            // console.log('(----->) SET_PERSISTENT_STATE', action);
            return Object.assign({}, state, action.new_state);

        case 'SET_SIGNIN_START':
            var current_signin = Object.assign({}, state.signin);
            current_signin.data = action.signin.data;
            current_signin.isLoggedIn = action.signin.isLoggedIn;
            current_signin.trust_computer = action.signin.trust_computer;
            // console.log('(----->) SET_SIGNIN_START', action.signin, current_signin, store.getState());
            return Object.assign({}, state, {
                signin: current_signin
            });


        case 'GET_DATA_STARTED':
            return Object.assign({}, state, {
                loading: true
            });

        case 'GET_USERAPPCALCULATION_COMPLETE':
            var _app_userapp_calculations = Object.assign({}, state._app_userapp_calculations);

            console.warn('ACTION', action);
            _app_userapp_calculations[action.module_calc] = action.data; 

            return Object.assign({}, state, {
                _app_userapp_calculations: _app_userapp_calculations
            });

        case 'GET_CURRENT_USER_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                _app_user: action.data
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

        case 'SAVE_PARAMS_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                _app_params: action.data
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

        case 'SET_APP_TOOLBAR':
            var options = Object.assign({}, state.options);
            options.show_app_toolbar = action.show_app_toolbar;

            return Object.assign({}, state, {
                options: options
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