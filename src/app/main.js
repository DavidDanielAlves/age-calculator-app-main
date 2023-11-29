const inputs = document.querySelectorAll('.container-inputs input');
const msgnsDeErro = document.querySelectorAll('#mensagem-de-erro');
const btSubmit = document.querySelector('#botao-submit');
const novaData = new Date();
const anoAtual = novaData.getFullYear();
const mesAtual = 12;
const diaAtual = 31;

const elementoMsgDeErroDia = msgnsDeErro[0];
const elementoMsgDeErroMes = msgnsDeErro[1];
const elementoMsgDeErroAno = msgnsDeErro[2];

function exibirMensagemErro(elemento, mensagem) {
    elemento.innerHTML = `<span id="mensagem-de-erro">${mensagem}</span>`;
}

function validarCampo(campo, elementoMsgDeErro, mensagemErro) {
    const valorDigitado = campo.value;

    if (valorDigitado === '') {
        campo.classList.add('erro');
        exibirMensagemErro(elementoMsgDeErro, 'required');
        return false;
    } else {
        campo.classList.remove('erro');
        exibirMensagemErro(elementoMsgDeErro, '');
        return true;
    }
}

function validarData(digitado, atual, campo, elementoMsgDeErro, mensagemErro, elementToUpdate) {
    if (digitado > atual) {
        campo.classList.add('erro');
        exibirMensagemErro(elementoMsgDeErro, mensagemErro);
    } else {
        campo.classList.remove('erro');
        exibirMensagemErro(elementoMsgDeErro, '');
        if (digitado !== '') {
            document.getElementById(elementToUpdate).textContent = atual - digitado;
        }
    }
}

function validaDados() {
    const diaDigitado = inputs[0];
    const mesDigitado = inputs[1];
    const anoDigitado = inputs[2];

    const diaValido = validarCampo(diaDigitado, elementoMsgDeErroDia, 'invalid day');
    const mesValido = validarCampo(mesDigitado, elementoMsgDeErroMes, 'invalid month');
    const anoValido = validarCampo(anoDigitado, elementoMsgDeErroAno, 'invalid year');

    if (diaValido) {
        validarData(diaDigitado.value, diaAtual, diaDigitado, elementoMsgDeErroDia, 'invalid day', 'element-days');

    }

    if (mesValido) {
        validarData(mesDigitado.value, mesAtual, mesDigitado, elementoMsgDeErroMes, 'invalid month', 'element-months');

    }

    if (anoValido) {
        validarData(anoDigitado.value, anoAtual, anoDigitado, elementoMsgDeErroAno, 'the year needs to be in the past', 'element-years');

    }

    if (mesValido && diaValido && anoValido) {
        inputs.forEach(input => input.value = '');
    }

}

btSubmit.addEventListener('click', () => {
    validaDados();
});