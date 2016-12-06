function main(token) {
    helpers.callAPI("GET", "/patients", null, null, function(resp) {
        console.log(resp.responseText);
    });
}
