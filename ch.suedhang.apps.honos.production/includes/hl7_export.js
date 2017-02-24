const fs = require("fs");

function add_leading_zero(x) {
  if(x < 10) {
    return '0' + x.toString();
  } else {
    return x.toString();
  }
}

function format_date(d) {
  return d.getUTCFullYear().toString() +
    add_leading_zero(d.getUTCMonth() + 1) +
    add_leading_zero(d.getUTCDate()) +
    add_leading_zero(d.getUTCHours()) +
    add_leading_zero(d.getUTCMinutes());
}

function main(token) {
  var path = "/modules/ch.suedhang.apps.honos.production/run_view/honos_view";
  var params = { direct: "True", format: "csv", delimiter: "," };
  helpers.callAPI("POST", path, {}, params, function(req) {
    if(req.status == 200) {
      if(req.responseText.length > 1) {
        var now = new Date();
        var filepath = "/tmp/" + format_date(now);
        fs.writeFileSync(filepath, req.responseText);
        console.log("Exported in " + filepath);
      }
    } else {
      console.error(req.status, req.responseText);
      throw "";
    }
  });
}
