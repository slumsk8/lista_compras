const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
// const mysql = require('mysql2');
const router = express.Router();

app.use(cors());
app.use(express.json());

// funcao para buscar dados no banco
function sqlQuery(sqlQuery, res) {
    const db = new sqlite3.Database('database/lista.db', sqlite3.OPEN_READWRITE, (error) =>{
        if(error){
            return console.error(error.message);
        }
    });
    db.serialize(() => {
        db.all(sqlQuery, function (error,row){
            if(error) res.json(error);
            else res.json(row);            
        });
    });
    db.close();
    //banco de dados Mysql
    // const connection = mysql.createConnection({
    //     host: 'localhost',
    //     port: 3306,
    //     user: 'tiago',
    //     password: '233117',
    //     database: 'list'
    // });
    // connection.query(sqlQuery, function (error, results, fields) {
    //     if (error) res.json(error);
    //     else res.json(results);

    //     connection.end();
    // });
    // console.log('Executou!');
}

router.post('/product', (req, res) => {
    const { description, price, qtd } = req.body;   
    sqlQuery(`INSERT INTO products (description,price,qtd) values ('${description}','${price}','${qtd}')`, res);    
});
router.patch('/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const description = req.body.description.substring(0, 50);
    const price = req.body.description.substring(0, 10);
    const qtd = req.body.description.substring(0, 50);
    sqlQuery(`UPDATE products SET description=${description}', price='${price}', qtd='${qtd}' WHERE id_product=${id})`, res);
    
});
router.get('/', (req, res) => {
    res.json({ msg: 'Funcionando de boas!' });
});
router.get('/products', (req, res) => {
    sqlQuery('SELECT * FROM products', res);
});
router.get('/product/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE id_product=' + parseInt(req.params.id);
    sqlQuery('SELECT * FROM products' + filter, res);
});
router.delete('/product/:id?', (req, res) => {
    sqlQuery('DELETE FROM products WHERE id_product=' + parseInt(req.params.id), res);
});

app.use('/', router);
app.listen(port);
console.log('Api funcionando na porta, ' + port );



