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
      var sql = 'select * from kf_dish limit ' + req.query.start + ",5";
      conn.query(sql, (err, result) => {
        if (err) {
          res.json({
            code: 501,
            msg: '查询失败'
          })
          conn.release()
        } else {
          res.send(req.query.callback + '(' + JSON.stringify(result) + ");");
          conn.release()
        }
      })
    }
  })
});
app.get("/test", function (req, res) {
  var str = req.query.callback + '(' + JSON.stringify({
    "name": "zhangsan"
  }) + ')'; //jsonp
  res.end(str);
});
app.get('/search', (req, res) => {
  var sql = 'select * from kf_dish where name like "%' + req.query.name + '%"';
  console.log(sql);
  pool.getConnection((err, conn) => {
    if (err) {
      res.json({
        code: 500,
        msg: '服务器没连上'
      });
      conn.release()
    } else {
      conn.query(sql, (err, result) => {

        if (err) {
          console.log('error');
          res.json({
            code: 501,
            msg: '查询失败'
          })
          conn.release()
        } else {
          console.log('result', result);
          res.send(req.query.callback + '(' + JSON.stringify(result) + ");");
          conn.release()
        }
      })
    }
  })
});
app.get('/detail', (req, res) => {
  var sql = "select * from kf_dish where did=" + req.query.id;
  console.log(sql);
  pool.getConnection((err, conn) => {
    conn.query(sql, (err, result) => {
      res.send(req.query.callback + '(' + JSON.stringify(result) + ");");
      conn.release()
    })
  })
});
app.get('/order_add', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query('insert into kf_order values(null,?,?,?,?,?,?)', [req.query.user_phone, req.query.user_name, req.query.user_sex, new Date().getTime(), req.query.user_addr, req.query.did],
      (err, result) => {
        console.log(err);
        if (err) {
          res.json({
            code: 500,
            msg: '服务器炸了'
          });
          conn.release()
        } else {

          res.send(req.query.callback + '(' + JSON.stringify({
            oid: result.insertId,
            msg: 'success'
          }) + ");");
          conn.release()
        }
      })
  })
});

app.get('/myOrder', (req, res) => {
  var sql = "select kf_dish.img_sm,kf_dish.did,kf_order.oid,kf_order.user_name,kf_order.order_time,kf_order.addr from kf_dish,kf_order where phone=" + req.query.phone + "&kf_dish.did=kf_order.did";
  console.log(sql);
  pool.getConnection((err, conn) => {
    conn.query(sql, (err, result) => {
      res.send(req.query.callback + '(' + JSON.stringify(result) + ");");
      conn.release()
    })
  })
});
