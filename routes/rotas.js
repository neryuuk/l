module.exports = function(app, db){
  var mongoose = require('mongoose');
  var Produto = require('./../models/produto');
  db.on('error', console.error.bind(console, 'Erro de conexão:'));
  db.once('open', function(){
    console.log('Conexão ao banco efetuada com sucesso.');
  });

// home da l-oja
  app.get('/', function(req, res){
    res.render('index.ejs');
  });

  app.route('/cadastrar/produtos')
// form de cadastro de produtos
    .get(function(req, res){
      res.render('cadastrar-produtos.ejs', {submit: 'new'});
    })

// dados submetidos para cadastro via post
    .post(function(req, res){
      var dados = req.body;
      var stat = 'ok'
      // convertendo preco para um valor numerico com 2 casas
      dados.preco = Number(dados.preco).toFixed(2);
      var novo = new Produto(dados);
      // salvando dados do formulario no banco
      novo.save(function(err, novo){
        if(err){
          stat = 'err';
          return console.error(err);
        };
      });
      res.render('cadastrar-produtos.ejs', {submit: stat});
    })

// listagem de produtos
  app.get('/produtos', function(req, res){
    Produto.find(function(err, produtos){
      if(err) return console.error(err);
      res.render('produtos.ejs',
        {produtos: produtos, categoria: ''});
    });
  });

// listagem de produtos da categoria escolhida
  app.get('/produtos/*', function(req, res){
    // recuperando a categoria buscada
    // após /produtos/
    var cat = req.url.split('/');
    cat = cat[cat.length - 1];
    Produto.find({categ: cat}, function(err, produtos){
      if(err) return console.error(err);
      res.render('produtos.ejs',
        {produtos: produtos, categoria: cat});
    });
  });

// 404
  app.use(function(req, res, next){
    // http status code 404 - Não encontrado
    res.status(404);

    // carrega pagina de 404 personalizada
    res.render('404.ejs');
  })
};
