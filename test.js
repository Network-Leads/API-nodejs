const NetworkLeads = require('./lib/NetworkLeads')("MY_KEY");

NetworkLeads.Resources.System.notify({
    msg: 'Hi There',
    title:"aaa",
    type:"1"
}).then(data => {console.log(data)}).catch(error => console.error(error));