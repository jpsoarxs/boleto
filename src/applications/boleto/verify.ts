import getBoleto from './data'

function boleto(boleto: string) {
    return new Promise((resolve, reject) => {
        if (!/^[0-9]{47}$/.test(boleto)) {
            reject('O formato do boleto é invalido, por favor reveja os dados informados');
        }

        let blocos = []

        blocos[0] = boleto.slice(0, 10);
        blocos[1] = boleto.slice(10, 21);
        blocos[2] = boleto.slice(21, 32);

        let isValid: boolean[] = []

        blocos.forEach((bloco) => {
            const result = boletoModulo10(bloco);

            if (result == parseInt(bloco[bloco.length - 1])) {
                isValid.push(true)
            } else { reject('Não foi possivel validar as linhas digitaveis do boleto') }
        })

        const barCode = getBoleto.getBarCode(boleto)

        if (boletoModulo11(barCode) === parseInt(barCode.slice(4, 5))) {
            isValid.push(true)
        } else { reject('Não foi possivel validar o código de barra do boleto') }

        resolve(isValid.length === 4);
    });
}

function boletoModulo10(bloco: string) {
    const item: string = bloco.slice(0, bloco.length - 1);
    const convertToListInt = item.split('').map(i => parseInt(i));

    convertToListInt.reverse()

    let total = 0

    convertToListInt.forEach((value: number, index: number) => {
        let mult = value * (index % 2 === 0 ? 2 : 1);

        if (mult > 9) {
            const convertToArray = mult.toString().split('').map(i => parseInt(i));
            total += convertToArray.reduce((a, b) => a + b);
        } else {
            total += mult;
        }
    })

    return (Math.ceil(total / 10) * 10) - total;
}

function boletoModulo11(barCod: string) {
    const formatedBarCode = barCod.slice(0, 4) + barCod.slice(5, 44)
    const convertToListInt = formatedBarCode.split('').map(i => parseInt(i));

    convertToListInt.reverse()

    let total = 0
    let peso = 2

    convertToListInt.forEach((value: number) => {
        peso = peso > 9 ? 2 : peso;
        total += value * peso;
        peso += 1
    })

    let digito = 11 - (total % 11);

    digito = digito > 9 ? 0 : digito
    digito = digito == 0 ? 1 : digito

    return digito
}

export default { boleto };