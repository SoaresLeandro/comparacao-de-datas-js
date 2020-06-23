/*
*	Autor: Leandro Soares
*	Script: Comparação de datas
*	Descrição: Esse script recebe uma data de criação de um pedido, e retorna a data atual e 
*	uma data de bloqueio(5 minutos) com base na data de criação do pedido. Se a data atual for menor
* 	ou igual a data de bloqueio, o reenvio do pedido fica bloqueado, se não, o pedido é liberado
*	para reenvio.
* 	
*/
$( function () {

	time();
	
});

function time() {
	
	/* Esta função aciona as funções que retornam a data atual e a data final, passando a data do pedido
	como parãmetro da função 'getDataAtual' */
	let dataDoPedido = "23/06/2020 09:00:10";

	let dataAtual = getDataAtual();
	let dataFinal = getDataFinal(dataDoPedido);

	$(".data-inicial").html(dataDoPedido);
	$(".data-final").html(dataFinal);
	
}

function getDataAtual()
{
	/* Esta função recupera a data atual e insere no campo data-atual na tela, atualizando a cada segundo. */
	setInterval( () => {
		data = new Date();		
		let dataAtual = data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
		$(".data-atual").html(dataAtual);
		return dataAtual;
	}, 1000);
}

function getDataFinal(dataDoPedido)
{
	/* Esta função recebe a data do pedido, separa ela em cada elemento de data, transforma em timestamp e
	retorna a data final */
	data = new Date();

	let dataDoPedidoTimestamp = getTimestamp(dataDoPedido);
	let dataFuturaTimestamp = (dataDoPedidoTimestamp + (5 * 60 * 1000));

	let dataFutura = new Date(dataFuturaTimestamp);	
	let dataFinal = dataFutura.getDate() + "/" + (dataFutura.getMonth()) + "/" + dataFutura.getFullYear() + " " + dataFutura.getHours() + ":" + dataFutura.getMinutes() + ":" + dataFutura.getSeconds();

	return dataFinal;
}

$("#reenviarPedido").on("click", () => {

	/* Esta função recupera as datas: autal e final, transforma em timestamp e faz a comparação entre elas */
	let dataAtualString = $(".data-atual").html();
	let dataFinalString = $(".data-final").html();
	
	let dataAtualTimeStamp = getTimestamp(dataAtualString);
	let dataFinalTimeStamp = getTimestamp(dataFinalString);
	
	if(dataAtualTimeStamp >= dataFinalTimeStamp){
		$(".retorno").html("O pedido pode ser reenviado.");
		$(".retorno").removeClass("danger");
		$(".retorno").addClass("success");
		setTimeout( () => {
			$(".retorno").html("");
			$(".retorno").removeClass("success");
		}, 3000);
	} else {
		$(".retorno").html("Erro. Esse pedido não pode ser reenviado.");
		$(".retorno").removeClass("success");
		$(".retorno").addClass("danger");
		setTimeout( () => {
			$(".retorno").html("");
			$(".retorno").removeClass("danger");
		}, 3000);
	}
});

function getTimestamp(dataString)
{
	/* Esta função recebe uma data e retorna o seu formato em timestamp */
	data = new Date();

	let dataS= dataString.split(" ");
	let dataP = dataS[0].split("/");
	data.setDate(dataP[0]);
	data.setMonth(dataP[1]);
	data.setFullYear(dataP[2]);

	let horaP = dataS[1].split(":");
	data.setHours(horaP[0]);
	data.setMinutes(horaP[1]);
	data.setSeconds(horaP[2]);

	return data.getTime();
}