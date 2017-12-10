<!--
 Copyright 2017 | optinomic-redux-store | Optinomic GmbH.
 http://www.optinomic.com/
-->

__opapp_include(../lib/polymer2/store/_initialState.js)
__opapp_include(../lib/polymer2/store/_reducer.js)
__opapp_include(../lib/polymer2/store/_session.js)
__opapp_include(../lib/polymer2/store/_user_store.js)
__opapp_include(../lib/polymer2/store/_actions.js)
__opapp_include(../lib/polymer2/store/_api_helpers.js)
__opapp_include(../lib/polymer2/store/_helpers.js)
__opapp_include(../lib/polymer2/behaviors/behavior-app.html)


// ----------------------------
//  Redux Store
// ----------------------------

const store = Redux.createStore(
    reducer,
    Redux.applyMiddleware(ReduxThunk.default)
);

const ReduxBehavior = PolymerRedux(store);

UserStore.start();
