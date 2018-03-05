var fs = require('fs'),
    assert = require('assert'),
    request = require('request'),
    http = require('http'),
    lastReqAddress;
var soap = require('./node-soap');
console.log(soap);

var test = {};
test.server = null;

test.service = {
  Hello_Service: {
    Hello_Port: {
      sayHello: function(args, cb, soapHeader) {
	console.log("sayHello");
	return { greeting: "yeah soap" };
      }
    }
  }
};

var port = 51515;

fs.readFile(__dirname + '/hello.wsdl', 'utf8', function(err, data) {
  console.log("err=", err);
  test.wsdl = data;


  test.server = http.createServer(function(req, res) {
    res.statusCode = 404;
    res.end();
  });

  test.server.listen(port, null, null, function() {
    test.soapServer = soap.listen(test.server, '/HelloService', test.service, test.wsdl);
    test.baseUrl =
      'http://' + test.server.address().address + ":" + test.server.address().port;

    if (test.server.address().address === '0.0.0.0' || test.server.address().address === '::') {
      test.baseUrl =
	'http://127.0.0.1:' + test.server.address().port;
    }
    console.log(test.baseUrl);
  });

}); // readFile
