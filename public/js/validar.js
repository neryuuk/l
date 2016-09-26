var nomes = {
  'nome':'Nome',
  'desc':'Descrição',
  'preco':'Preço',
  'categ':'Categoria'};

function erro(id, msg=''){
  var elem = document.getElementById(id);
  var erro = document.getElementById('erro_'+id);

  if(msg.length){
    elem.classList.remove('valid');
    elem.classList.add('erro');
    erro.classList.add('show');
    erro.innerHTML = msg;
  } else {
    elem.classList.remove('erro');
    elem.classList.add('valid');
    erro.classList.remove('show');
    erro.innerHTML = '';
  }
};

function vazio(id){
  var elem = document.getElementById(id);

  if (elem.value.length == 0) {
    erro(id, 'O campo <em>'+nomes[id]+'</em> é obrigatório');
    return false; }

  erro(id);
  return true;
};

function positivo(id){
  var elem = document.getElementById(id);
  console.log(elem.validity.valid, elem.value)
  if (!elem.validity.valid)
    erro(id, 'O <em>'+nomes[id]+'</em> deve seguir o formato \'0.00\'');
  else if (Number(elem.value) <= 0)
    erro(id, 'O <em>'+nomes[id]+'</em> deve maior que 0');
  else
    erro(id);
};

function validar(id){
  vazio(id);
  if(id == 'preco'){
    positivo(id);
  };
  var validos = document.getElementsByClassName('valid');
  var button = document.getElementById('cadastro');
  if(validos.length == '4'){
    button.classList.remove('disabled');
    button.disabled = false;
  } else {
    button.classList.add('disabled');
    button.disabled = true;
  }
};
