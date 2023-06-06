let veiculos = [];

function registrarEntrada() {
    let placa = document.getElementById("placa").value;
    let modelo = document.getElementById("modelo").value;
    let cor = document.getElementById("cor").value;
    let horaEntrada = new Date();
    let veiculo = { placa, modelo, cor, horaEntrada };
    veiculos.push(veiculo);
    document.getElementById("entradaForm").reset();
}

function registrarSaida() {
    let placa = document.getElementById("placaSaida").value;
    let veiculo = veiculos.find(v => v.placa === placa);
    if (veiculo) {
        let horaSaida = new Date();
        let tempoPermanencia = Math.floor((horaSaida - veiculo.horaEntrada) / (1000 * 60 * 60));
        let valorAPagar = calcularValorAP(tempoPermanencia);
        let output = document.getElementById("output");
        output.innerHTML = "";
        output.innerHTML += "Placa do Veículo: " + veiculo.placa + "<br>";
        output.innerHTML += "Modelo do Veículo: " + veiculo.modelo + "<br>";
        output.innerHTML += "Cor do Veículo: " + veiculo.cor + "<br>";
        output.innerHTML += "Tempo de Permanência: " + tempoPermanencia + " horas<br>";
        output.innerHTML += "Valor a Pagar: R$" + valorAPagar.toFixed(2);
        // Remover o veículo do array de veículos
        veiculos = veiculos.filter(v => v.placa !== veiculo.placa);
        document.getElementById("saidaForm").reset();
    } else {
        document.getElementById("output").innerHTML = "Veículo não encontrado";
    }
}

// Função para calcular o valor a ser pago com base no tempo de permanência
function calcularValorAP(tempoPermanencia) {
    let precoPorHora = parseFloat(document.getElementById("precoPorHora").value);
    let precoPorDia = parseFloat(document.getElementById("precoPorDia").value);
    let precoPeriodoEspecifico = parseFloat(document.getElementById("precoPeriodoEspecifico").value);

    if (tempoPermanencia <= 1) {
        return precoPorHora;
    } else if (tempoPermanencia <= 24) {
        return precoPorDia;
    } else {
        return precoPeriodoEspecifico;
    }
}