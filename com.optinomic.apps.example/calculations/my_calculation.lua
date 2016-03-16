local json = dkjson()

function main(respjson)
  local responses = json.decode(respjson)
  -- Do something
  return json.encode(responses)
end
