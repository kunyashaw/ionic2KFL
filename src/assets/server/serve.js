const http = require('http');
const express = require('express');
const pool = require('./pool');
const qs = require('querystring');
var app = express();
http.createServer(app).listen(8080);
app.use(express.static('kaifanle'));
app.use((req, res, next) => {
  if (req.method === 'POST') {
    req.on('data', (buf) => {
      req.body = qs.parse(decodeURI(buf.toString()));
      next()
    })
  } else next();
});
app.get('/', (req, res) => {
  res.redirect('kaifanle.html')
});
app.get('/main', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      res.json({
        code: 500,
        msg: '服务器没连上'
      });
      conn.release()
    } else {
      conn.query('select * from kf_dish', (err, result) => {
        if (err) {
          res.json({
            code: 501,
            msg: '查询失败'
          })
          conn.release()
        } else {
          res.json(result);
          conn.release()
        }
      })
    }
  })
});
app.post('/search', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query('select * from kf_dish where name like "%' + req.body.name + '%"', (err, result) => {
      if (result.length) {
        res.json(result);
        conn.release();
      } else {
        res.json({
          code: 404,
          msg: '没发现资源'
        });
        conn.release();
      }
    })
  });
});
app.post('/detail', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query("select * from kf_dish where did=?", [req.body.id], (err, result) => {
      res.json(result);
      conn.release()
    })
  })
});
app.post('/order_add', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query('insert into kf_order values(null,?,?,?,?,?,?)', [req.body.phone, req.body.name, req.body.sex, new Date().getTime(), req.body.area], (err, result) => {
      if (err) {
        res.json({
          code: 500,
          msg: '服务器炸了'
        });
        conn.release()
      } else {
        res.json({
          code: 200,
          msg: ''
        });
        conn.release()
      }
    })
  })
});
