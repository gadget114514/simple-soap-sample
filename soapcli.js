var soap = require('soap');

var args = {
  InParam: {
    firstName: 'pepe'
  }
};

soap.createClient(
  'http://127.0.0.1:51515/HelloService?wsdl' ,
  {},
  function(err, client) {
    console.log("client=", (client));

    client.Hello_Service.Hello_Port.sayHello(
      args,
      function(err, result) { // , envelope, soapHeader) {
	console.log('Result: \n' + JSON.stringify(result));
      }
    );
  }
);
