function getDate(boleto: string) {
    boleto = boleto.replace(/( |\.)/g, '');

    const codDate = parseInt(boleto.slice(33, 37));
    const date = new Date('10/07/1997');

    date.setTime(date.getTime() + (codDate * 24 * 60 * 60 * 1000));

    const currentDate = ("0" + (date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()

    return isValidDate(currentDate) ? currentDate : 'Data não encontrada';
}

function getAmount(boleto: string) {
    boleto = boleto.replace(/( |\.)/g, '');

    const codAmount: string = boleto.slice(37, 47);
    var valor = parseFloat(codAmount).toString()

    let currentAmount

    if (valor.length == 2) {
        currentAmount = parseFloat("0." + valor);
    } else if (valor.length == 1) {
        currentAmount = parseFloat("0.0" + valor)
    } else {
        currentAmount = parseFloat(valor.substring(0, valor.length - 2) + "." + valor.substring(valor.length - 2, valor.length))
    }

    return currentAmount || 'Valor não encontrado';
}

function getBarCode(boleto: string) {
    const barCode = boleto.substr(0, 4) +
        boleto.substr(32, 15) +
        boleto.substr(4, 5) +
        boleto.substr(10, 10) +
        boleto.substr(21, 10);

    return barCode
}

function isValidDate(dateObject: string) {
    return new Date(dateObject).toString() !== 'Invalid Date';
}

export default { getDate, getAmount, getBarCode };