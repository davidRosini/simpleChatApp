const express = require('express');
const app = express();

app.disable('x-powered-by');
argv.port = 3000;

//set the template engine ejs
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));

//routes
app.get('/', (request, response) => {
    response.render('index')
});

//listen on port 3000
server.listen(argv.port);

const io = require('socket.io') (server);

//listen on every connection
io.on('connect', (socket) => {

    console.log('New user conected!');

    //default username
    socket.username = 'Anonymous';

    //listen on change_username
    socket.on('change_username', (data) => {
        console.log('User name changed ' + socket.username + ' to ' + data.username);
        socket.username = data.username;
    });

    //listen on new_message
    socket.on('new_message', (data) => {

        //broadcast the new message
        console.log('New messagem from: ' + socket.username + ', message: ' + data.message);
        io.sockets.emit('new_message', { message : data.message, username : socket.username });
    })

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username : socket.username });
    });
});
