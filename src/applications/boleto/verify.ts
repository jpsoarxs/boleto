import getBoleto from './data'

function boleto(boleto: string) {
    return new Promise((resolve, reject) => {
        boleto = boleto.replace(/( |\.|-)/g, '');

        if (!/^[0-9]{47}$/.test(boleto)) {
            reject(new Error('O formato do boleto é invalido'));
        }

        let blocos: string[] = []

        blocos[0] = boleto.slice(0, 10);
        blocos[1] = boleto.slice(10, 21);
        blocos[2] = boleto.slice(21, 32);

        let isValid: boolean[] = []

        blocos.forEach((bloco) => {
            const result = modulo10(bloco);

            if (result == parseInt(bloco[bloco.length - 1])) {
                isValid.push(true)
            } else { reject(new Error('Não foi possivel validar os dados desse boleto')) }
        })

        const barCode = getBoleto.getBarCode(boleto)

        if (boletoModulo11(barCode) === parseInt(barCode.slice(4, 5))) {
            isValid.push(true)
        } else { reject(new Error('Não foi possivel validar o código de barra do boleto')) }

        resolve(isValid.length === 4);
    });
}

function convenio(barCode: string) {
    return new Promise((resolve, reject) => {
        barCode = barCode.replace(/( |\.|-)/g, '');

        if (!/^[0-9]{48}$/.test(barCode)) {
            reject(new Error('O formato do código de barra é invalido'))
        }

        let blocks: string[] = []

        blocks[0] = barCode.slice(0, 12);
        blocks[1] = barCode.slice(12, 24);
        blocks[2] = barCode.slice(24, 36);
        blocks[3] = barCode.slice(36, 48);

        const isM10 = ['6', '7'].indexOf(barCode[2]) !== -1

        blocks.forEach((block) => {
            if (isM10) {
                const result = modulo10(block);

                if (result == parseInt(block[block.length - 1])) {
                    resolve(true)
                } else { reject(new Error('Não foi possivel validar os dados desse boleto')) }
            } else {
                const result = convenioModulo11(block);

                if (result == parseInt(block[block.length - 1])) {
                    resolve(true)
                } else { reject(new Error('Não foi possivel validar o código de barra do boleto')) }
            }
        })
    })
}

function modulo10(bloco: string) {
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

function convenioModulo11(barCode: string) {
    const convertToListInt = barCode.split('').map(i => parseInt(i));

    convertToListInt.reverse().shift()

    let total = 0

    convertToListInt.forEach((value: number, index: number) => {
        total += value * (2 + (index >= 8 ? index - 8 : index))
    })

    let rest = total % 11;
    let result

    if (rest === 0 || rest === 1) {
        result = 0
    } else if (rest === 10) {
        result = 1
    } else {
        result = (Math.ceil(total / 11) * 11) - total;
    }

    return result
}

function boletoModulo11(barCode: string) {
    const formatedBarCode = barCode.slice(0, 4) + barCode.slice(5, 44)
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

export default { boleto, convenio };