const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
var cors = require('cors')


const db = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6423936',
    password: 'kix53FFrJY',
    database: 'sql6423936'
})
var port = process.env.PORT || 5000;
db.connect((err)=> {
    if(err) {
        throw err
    }
    console.log('Mysql Connected');
});

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post('/transaction', (req,res)=> {

    let data = {description: req.body.description , 'type':  req.body.type, amount: req.body.amount}
    let sql = 'INSERT INTO transactions SET ?'
    let query = db.query(sql,data,(err,result)=> {
        if(err) throw err;
        res.send(result)
    })
})
app.put('/transaction', (req,res)=> {
    
    let sql = `UPDATE transactions SET description = '${req.body.description}', type = '${req.body.type}', amount = ${req.body.amount} WHERE id = ${req.body.id}`
    let query = db.query(sql,(err,result)=> {
        if(err) throw err;
        res.send(result)
    })
})
app.get('/transaction', (req,res)=> {

    let sql = `SELECT * FROM transactions ORDER BY created_at desc`;
    let countsql = `SELECT COUNT(*) as total FROM transactions`
    db.query(countsql, (err,countresult)=> {
        let total = countresult[0].total
        let query = db.query(sql,(err,result)=> {
            if(err) throw err;
            let xxx = { total, result }
            res.send(xxx)
        })
    })
})
app.get('/transactionxxx', (req,res)=> {

    res.send('test')
})



app.delete('/transaction', (req,res)=> {

    let sql = `DELETE FROM transactions WHERE id=${req.body.id}`;
    let query = db.query(sql,(err,result)=> {
        if(err) throw err;
        res.send(result)
    })
})

app.listen(port, ()=> {
    console.log('server start 3000');
})