const Hapi = require('@hapi/hapi');
const Routes = require('./routes');

const init = async() => {
  const Server = Hapi.server({
  port : 8000,
  host : 'localhost',
  });
  
  Server.route(Routes);
  
  await Server.start();
  console.log('Server telah aktif');
}

init();