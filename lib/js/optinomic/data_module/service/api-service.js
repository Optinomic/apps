angular.module('optinomicDataModule').factory('apiService', function($http) {
    var ongoing_requests = [];

    var request = function(method, path, query, body) {
        ongoing_requests.push(method + " " + path);

        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        };

        var token = helpers.getToken();
        var apiUrl = helpers.getApiURL();
        headers["X-API-Token"] = token;

        var reqConf = {
            url: apiUrl + path,
            method: method,
            params: query,
            data: body,
            headers: headers,
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        };

        var promise = $http(reqConf);

        var remove_ongoing = function() {
            var i = ongoing_requests.indexOf(method + " " + path);
            ongoing_requests.splice(i, 1);
        };

        promise.success(remove_ongoing);
        promise.error(function(data, status) {
            remove_ongoing();
            if (status === 401) {
                token = 'Error';
            }
        });

        return promise;
    };

    var get = function(path, query) {
        return request("GET", path, query, "");
    };

    var post = function(path, body) {
        return request("POST", path, {}, body);
    };

    var put = function(path, body) {
        return request("PUT", path, {}, body);
    };

    var del = function(path, query) {
        return request("DELETE", path, query, "");
    };

    var patch = function(path, body) {
        return request("PATCH", path, {}, body);
    };

    var isBusy = function() {
        return ongoing_requests.length > 0;
    };

    var getConfig = function() {
        var Config = {
            url: apiUrl
        };

        //console.log('getConfig = ', Config);
        return Config;
    };


    return {
        request: request,
        getConfig: getConfig,
        get: get,
        post: post,
        put: put,
        del: del,
        patch: patch,
        isBusy: isBusy
    };
});
