var ApiHelpers = (function() {

  this.token = "";

  var setToken = function(token) {
    this.token = token;
  };

  var getToken = function() {
    return this.token;
  };

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


  var shouldCallNow = function(path) {

    path = path || "undefined";
    return_value = false;
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

      if (duration > apiCalls.update_older_x_seconds) {
        return_value = true;
        reason = duration + " is older then: " + apiCalls.update_older_x_seconds;
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


    return return_value;

  };

  var callAPI = function(method, path, query, body, callback) {

    var req = new XMLHttpRequest();

    //console.log('(?) callAPI  :: ', method, Config.apiUrl, path, query, body);

    req.open(method, Config.apiUrl + path + "?" + encodeParams(query), true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("X-API-Token", this.token);

    req.onreadystatechange = function(e) {
      if (req.readyState == 4) {
        callback(req);
      }
    };
    req.send(encodeParams(body));
  };

  return {
    setToken: setToken,
    getToken: getToken,
    callAPI: callAPI,
    shouldCallNow: shouldCallNow
  };

})();
