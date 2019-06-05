const express = require('express')
var favicon = require('serve-favicon');
var mysql = require('mysql');

const app = express()
const port = 3000

app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', (request, response) => {
  console.log('Recebendo a requisição!')
  response.send('Hello from Express!')
})

app.get('/hello', (request, response) => {
  console.log('Recebendo a requisição Hello!')
  response.sendFile(__dirname + '/index.html')
})

app.get('/cadastro', (request, response) => {
    console.log('Recebendo a requisição de cadastro!')
    
    var email = request.query.email
    var senha = request.query.senha
    var nome = request.query.nome

    // Banco de Dados
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'admin',
      database : 'pweb2019'
    });
    
    connection.connect();

    var sql = `INSERT INTO usuarios (email, senha, nome) VALUES (${email}, ${senha}, ${nome});`; 

    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        response.send('Não foi possível realizar o cadastro!'); 
      } else {
        connection.end();
        response.send('Usuário cadastrado com sucesso!');
      }
    });
    
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})