var reducer = function(state, action) {
  //console.log('REDUCER :: -----> ', state, action);
  if (!state)
    return initialState;

  switch (action.type) {
    case 'GET_DATA_STARTED':
      return Object.assign({}, state, {
        loading: true
      });

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

    case 'SET_TRUST_COMPUTER':
      var current_signin = Object.assign({}, state.signin);
      current_signin.trust_computer = action.trust_computer;
      console.log('(----->) SET_TRUST_COMPUTER', action.trust_computer, current_signin, store.getState());
      return Object.assign({}, state, {
        signin: current_signin
      });

    case 'SAVE_DEVICE_SIZE_COMPLETE':
      return Object.assign({}, state, {
        device: action.data
      });


    case 'SET_OBJECT':
      {
        var current_object = {};
        var statePath = action.statePath;
        var statePathArray = statePath.split('.');

        name = statePathArray[0];
        statePathArray.shift();

        if (statePathArray.length === 0) {
          current_object[action.statePath] = action.data;
        } else {

          state[name] = state[name] || {};
          var right_obj = JSON.parse(JSON.stringify(state[name]));
          setValue(right_obj, statePathArray, action.data);

          current_object[name] = right_obj;
        };

        // console.error(':: SET_OBJECT --->', current_object);
        return Object.assign({}, state, current_object);
      };


    case 'SET_CURRENT_SIDEBAR_COMPLETE':
      {
        var sb = Object.assign({}, state.sidebar);
        sb.current = action.data;
        return Object.assign({}, state, {
          loading: false,
          sidebar: sb
        });
      };

    case 'GET_PATIENTS_LIST_COMPLETE':
      {
        var sb = Object.assign({}, state.patients_list);
        sb[action.data.path] = action.data;
        return Object.assign({}, state, {
          loading: false,
          patients_list: sb
        });
      };

    case 'GET_CURRENT_USER_COMPLETE':
      return Object.assign({}, state, {
        loading: false,
        user: action.data
      });

    default:
      return state;
  }
};
