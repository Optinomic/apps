function main(token) {
    helpers.callAPI("GET", "/users", null, null, function(resp) {
        console.log(resp.responseText);
    });
}
