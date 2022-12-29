document.addEventListener('keypress', function(e){
    if(e.which == 13){
        consultaCEP();
    }
}, false);


function consultaCEP(){
    var $cep = document.getElementById("cep").value.replace(/\D/g, '');
    var url = 'https://viacep.com.br/ws/' + $cep + '/json/';
    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.onerror = function (e){
        document.getElementById('return').innerHTML = 'API Offline ou CEP Invalido!';
    }

    request.onload = () =>{
        var response = JSON.parse(request.responseText);

        if (response.erro === true){
            document.getElementById('return').innerHTML = 'CEP Não Encontrado';
        }else {
            var numeroCEP = response['cep'];
            var nomeRua = response['logradouro'];
            var nomeBairro = response['bairro'];
            var nomeCidade = response['localidade']
            var nomeEstado = response['uf']
            document.getElementById('numeroCEP').value = numeroCEP;
            document.getElementById('nomeRua').value = nomeRua;
            document.getElementById('nomeBairro').value = nomeBairro;
            document.getElementById('nomeCidade').value = nomeCidade;
            document.getElementById('nomeEstado').value = nomeEstado;
        }
    }
    request.send();
}