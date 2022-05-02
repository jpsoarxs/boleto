function getDate(boleto: string, isConvenio: boolean) {
    boleto = boleto.replace(/( |\.|-)/g, '');

    const codDate = isConvenio ? parseInt(boleto.slice(0, 4)) : parseInt(boleto.slice(33, 37));
    const date = new Date('1997-10-07');

    date.setTime(date.getTime() + (codDate * 24 * 60 * 60 * 1000));

    const currentDate = ("0" + (date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()

    return currentDate
}

function getAmount(boleto: string, isConvenio: boolean) {
    boleto = boleto.replace(/( |\.|-)/g, '');
    const amount = isConvenio ? boleto.slice(4, 11) + boleto.slice(12, 16) : boleto.slice(37, 47);
    var valor = parseFloat(amount).toString()

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
    boleto = boleto.replace(/( |\.|-)/g, '');
    const barCode = boleto.substr(0, 4) +
        boleto.substr(32, 15) +
        boleto.substr(4, 5) +
        boleto.substr(10, 10) +
        boleto.substr(21, 10);

    return barCode
}

export default { getDate, getAmount, getBarCode };