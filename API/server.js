const app = require('./app'),
c = console.log

app.listen(app.get('port'),()=>
c(`Iniciando app en el puerto ${app.get('port')}`))

