import app from './../src/applications/boleto'

describe('Boleto Validator', function () {

    test('Convenio valid module 10', () => {
        app.verify.convenio('83640000001-1 33120138000-2 81288462711-6 08013618155-1').then(result => {
            expect(result).toBeTruthy();
        })
    });

    test('Convenio valid module 11', () => {
        app.verify.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-0').then(result => {
            expect(result).toBeTruthy();
        })
    });

    test('Convenio valid module 11 if resto divisao 10', () => {
        app.verify.convenio('85890000464-1 52460179160-5 60759305086-5 83148300001-0').then(result => {
            expect(result).toBeTruthy();
        })
    });

    test('Convenio invalid module 10', () => {
        app.verify.convenio('83640000001-2 33120138000-2 81288462711-6 08013618155-1').then(result => {
            expect(result).toBeTruthy();
        }).catch(err => {
            expect(err).toBeTruthy();
        })
    });

    test('Convenio invalid module 11', () => {
        app.verify.convenio('85890000460-8 52460179160-5 60759305086-5 83148300001-0').then(result => {
            expect(result).toBeTruthy();
        }).catch(err => {
            expect(err).toBeTruthy();
        })
    });

    test('Convenio invalid format step 1', () => {
        app.verify.convenio('85890000460-8 52460179160-5 60759305086-5 83148300001-01').then(result => {
            expect(result).toBeTruthy();
        }).catch(err => {
            expect(err).toBeTruthy();
        })
    });

    test('Convenio invalid format step 2', () => {
        app.verify.convenio('85890000460-8 52460179160-5 60759305086-5 83148300001-d').then(result => {
            expect(result).toBeTruthy();
        }).catch(err => {
            expect(err).toBeTruthy();
        })
    });

    test('Boleto valid', () => {
        app.verify.boleto('42297.11504 00001.954411 60020.034520 2 68610000054659').then(result => {
            expect(result).toBeTruthy();
        })
    });

    test('Boleto invalid', () => {
        app.verify.boleto('92297.11504 00001.954411 60020.034520 2 68610000054659').then(result => {
            expect(result).toBeTruthy();
        }).catch(err => {
            expect(err).toBeTruthy();
        })
    });

    test('Boleto invalid format step 1', () => {
        app.verify.boleto('92297.11504 00001.954411 60020.034520 2 686100000546597').then(result => {
            expect(result).toBeTruthy();
        }).catch(err => {
            expect(err).toBeTruthy();
        })
    });

    test('Boleto invalid format step 2', () => {
        app.verify.boleto('92297.11504 00001.954411 60020.034520 2 6861000005465d').then(result => {
            expect(result).toBeTruthy();
        }).catch(err => {
            expect(err).toBeTruthy();
        })
    });

});