const UserStore = (function() {

  // ----------------------------------
  //  Saving userStore to localStorage
  //  only when trust_computer = true
  //  logout => _enoded state.
  // ----------------------------------

  var storage = localStorage;

  //  Should we save to localStorage?
  //  Should we debug state to console?

  var localStorageOptions = {
    "name": "unknown",
    "name_prefix": "optinomic_state_",
    "name_suffix": "_encoded",
    "started": false,
    "using": false,
    "console": false
  };

  var getOptions = function() {
    return localStorageOptions;
  };

  var getStarted = function() {
    return localStorageOptions.started;
  };

  var getConsole = function() {
    return localStorageOptions.console;
  };

  var setConsole = function(console) {
    localStorageOptions.console = console;
  };

  var clear = function() {
    var storage_name = localStorageOptions.name_prefix + Session.getUserID();
    //console.warn('clear', storage_name);
    storage.removeItem(storage_name);
  };

  var clear_all = function() {
    console.warn('(clear_all) localStorage is clear now!');
    storage.clear();
  };

  var setSignin = function() {
    store.dispatch(addSignin());
  };

  // -------------------------------
  // Store - Actions
  // -------------------------------
  var addSignin = function() {

    var login_data = {
      "data": {
        "user_id": Session.getUserID(),
        "token": Session.getToken()
      },
      "isLoggedIn": Session.isLoggedIn(),
      "trust_computer": Session.getTrustComputer()
    };

    return {
      type: 'SET_SIGNIN_START',
      signin: login_data
    }
  };

  var replaceState = function(new_state) {
    //console.log('---> replaceState', new_state);
    return {
      type: 'SET_PERSISTENT_STATE',
      new_state: Object.assign({}, new_state)
    }
  };


  // -------------------------------
  // Start / Stop
  // -------------------------------

  var start = function() {

    var signin = {
      "user_id": Session.getUserID(),
      "token": Session.getToken()
    };


    var trust_computer = Session.getTrustComputer();
    if (trust_computer) {

      localStorageOptions.using = true;
      var state = store.getState();

      // Just to be sure
      if ((signin.user_id !== null) && (signin.token !== null)) {
        var user_id = signin.user_id;


        var localStorageName = localStorageOptions.name_prefix + user_id;
        localStorageOptions.name = localStorageName;


        //  Check if localStorage has Data - if yes use this!
        var persistedUserState = null;
        persistedUserState = storage.getItem(localStorageName + localStorageOptions.name_suffix);
        // console.log('(?) STORE HELPER', localStorageName, signin, persistedUserState);

        if (persistedUserState !== null) {
          // Decode persistedUserState
          var persistedUserStateDecoded = JSON.parse(decodeURIComponent(escape(atob(persistedUserState))));

          // persistedUserState is available
          // Replace currentState with persistedUserState & add new signin credentials
          store.dispatch(replaceState(persistedUserStateDecoded));
          store.dispatch(addSignin(signin));

          // Remove _encoded persistedUserState
          storage.removeItem(localStorageName + localStorageOptions.name_suffix);
          //localStorageOptions.using = true;

          console.warn('(!) -----> User_Store - encoded & persisted');


        } else {

          loggedInUserState = JSON.parse(storage.getItem(localStorageName));

          if (loggedInUserState !== null) {
            // Already Logged-In / Page-Refresh
            // Dispatch full state (replaceState) to current state
            store.dispatch(replaceState(loggedInUserState));
            store.dispatch(addSignin(signin));

            console.warn('(!) -----> User_Store - persisted');

          } else {
            // No persisted state is there
            // Dispatch only signin to current (initialState) state
            store.dispatch(addSignin(signin));
            console.warn('(!) -----> User_Store - initialState');

          };
        };


      } else {
        // console.warn('(!) -----> User_Store - unknown');
      };


    } else {
      localStorageOptions.using = false;

      // No persisted state is there
      // Dispatch only signin to current (initialState) state
      store.dispatch(addSignin(signin));
      console.warn('(!) -----> User_Store (untrusted computer) - initialState');
    };

    localStorageOptions.started = true;

  };


  var stop = function() {

    function isQuotaExceeded(e) {
      var quotaExceeded = false;
      if (e) {
        if (e.code) {
          switch (e.code) {
            case 22:
              quotaExceeded = true;
              break;
            case 1014:
              // Firefox
              if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                quotaExceeded = true;
              }
              break;
          }
        } else if (e.number === -2147024882) {
          // Internet Explorer 8
          quotaExceeded = true;
        }
      }
      return quotaExceeded;
    }

    console.warn('(✓) UserStore.stop: ', localStorageOptions.using);

    if (Session.getTrustComputer()) {

      // Make sure to persist latest state_encoded to localStorage & clear 'sigin'
      var state = store.getState();

      // Remove user_id / token
      state.signin = {
        "data": {
          "user_id": null,
          "token": null
        },
        "trust_computer": false,
        "isLoggedIn": false
      };

      // Remove _decoded version.
      storage.removeItem(localStorageOptions.name);

      try {
        var encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
        storage.setItem(localStorageOptions.name + "_encoded", encoded);

      } catch (e) {
        if (isQuotaExceeded(e)) {
          console.error('(!!!)', 'Storage full: Nothing saved');
        }
      };

      //console.warn('(✓) UserStore.stop:  STATE', state, encoded, localStorageOptions.name);

    };

    // GetBack to initialState
    store.dispatch(replaceState(initialState));
    localStorageOptions.name = "unknown";
    localStorageOptions.started = false;

  };


  return {
    start: start,
    stop: stop,
    clear: clear,
    clear_all: clear_all,
    setSignin: setSignin,
    getOptions: getOptions,
    getConsole: getConsole,
    getStarted: getStarted,
    setConsole: setConsole
  };

})();
