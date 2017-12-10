var ApiHelpers = (function() {

  var encodeParams = function(obj) {
    var str = [];
    for (var p in obj) {
      if (obj[p] != null && obj[p] != undefined) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  };



  var apiCalls = {
    "update_older_x_seconds": 2,
    "calls": {},
    "requests": {},
    "timestamp": {},
  };


  var shouldCallNow = function(path, update_if_older_x_seconds) {

    return_value = false;
    if (UserStore.getStarted()) {

      update_if_older_x_seconds = update_if_older_x_seconds || apiCalls.update_older_x_seconds;

      path = path || "undefined";
      var reason = null;

      apiCalls.requests[path] = apiCalls.requests[path] + 1 || 1;

      // First Call is always allowed:
      if (apiCalls.requests[path] === 1) {
        return_value = true;
        reason = "first_call";
      };

      // If last request is outdated then = true;
      if (apiCalls.timestamp[path]) {
        var duration = Math.floor((new Date() - Date.parse(apiCalls.timestamp[path])) / 1000);

        if (duration > update_if_older_x_seconds) {
          return_value = true;
          reason = duration + " is older then: " + update_if_older_x_seconds;
          apiCalls.timestamp[path] = apiCalls.timestamp[path] = new Date();
        } else {
          apiCalls.timestamp[path] = apiCalls.timestamp[path] = new Date();
        };

      } else {
        apiCalls.timestamp[path] = apiCalls.timestamp[path] = new Date();
      };

      // Save executed calls:
      if (return_value) {
        apiCalls.calls[path] = apiCalls.calls[path] + 1 || 1;
        // console.warn('(?) callAPI | shouldCallNow :: ', path, return_value, reason, apiCalls);
      };
    };

    return return_value;

  };

  var clearShouldCallNow = function() {
    apiCalls.calls = {};
    apiCalls.requests = {};
    apiCalls.timestamp = {};

    console.warn('clearShouldCallNow CLEAR', apiCalls);
  };

  var createList = function(array, name) {
    array = array || [];
    name = name || null;

    var list_object = {};
    var count = array.length;

    list_object[name + "_count"] = count;
    array.forEach(function(i, iID) {
      list_object[name + iID] = i;
    });

    return list_object;
  };


  var safeAppID = function(app_id) {
    return app_id.split(".").join("_");
  };


  return {
    shouldCallNow: shouldCallNow,
    clearShouldCallNow: clearShouldCallNow,
    createList: createList,
    safeAppID: safeAppID
  };

})();
