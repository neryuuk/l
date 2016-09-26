// produto.js
// importar requisitos
var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;

// criando schema pro modelo de produto
var produtoSchema = mongoose.Schema({
  nome  : String,
  desc  : String,
  preco : Number,
  categ : String
});

// criando modelo dos produtos
var Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;