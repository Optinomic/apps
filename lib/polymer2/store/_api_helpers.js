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

  var callAPI = function(method, path, query, body, callback) {

    function isEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
          return false;
      }

      return JSON.stringify(obj) === JSON.stringify({});
    }

    var req = new XMLHttpRequest();

    if (isEmpty(query)) {
      req.open(method, Config.apiUrl + path, true);
    } else {
      req.open(method, Config.apiUrl + path + "?" + encodeParams(query), true);
    };
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //console.log('(?) callAPI path :: ', path);

    if (path !== '/signin') {
      req.setRequestHeader("X-API-Token", Session.getToken());
    };

    // console.log('(?) callAPI  :: ', method, isEmpty(query), Config.apiUrl, path, query, body, Session.getToken());

    req.onreadystatechange = function(e) {
      if (req.readyState == 4) {
        callback(req);
      }
    };

    if ((method === 'POST') && (path === '/modules/hotloaded')) {
      req.send(body);
    } else {
      req.send(encodeParams(body));
    };

  };

  return {
    callAPI: callAPI,
    shouldCallNow: shouldCallNow,
    clearShouldCallNow: clearShouldCallNow,
    createList: createList
  };

})();
