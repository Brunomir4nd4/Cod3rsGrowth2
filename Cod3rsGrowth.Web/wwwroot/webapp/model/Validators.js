sap.ui.define([
], function() {
    'use strict';

    var ehValido;
    return{

        ValidarIngrediente(inputNome, inputQuantidade) {
            ehValido = true;
            this.ValidarQuantidade(inputQuantidade);
            this.ValidarNome(inputNome);

            return ehValido;
        },

        ValidarNome(oInput){
            const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            const mensagemErroNomeVazio = "Nome não informado.";
            const mensagemErroNomeComNumeroOuCaractersEspeciais = "Nome deve possuir apenas letras.";
            
            if (oInput.getValue() === ""){
                oInput.setValueState(sap.ui.core.ValueState.Error);
                oInput.setValueStateText(mensagemErroNomeVazio);
                ehValido = false;
            } 
            else if(regex.test(oInput.getValue())) {
                oInput.setValueState(sap.ui.core.ValueState.Error);
                oInput.setValueStateText(mensagemErroNomeComNumeroOuCaractersEspeciais);
                ehValido = false;
            }
            else {
                oInput.setValueState(sap.ui.core.ValueState.Success);
            }
        },

        ValidarQuantidade(oInput){      
            const regexNumeros = /[0-9]/;      
            const regexCaracters = /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; 
            const menssagemErroQuantidadeVazia = "Quantidade não informada.";
            const mensagemErroQuantidadeComLetrasOuCaractersEspeciais = "Quantidade deve conter apenas números.";
            
            if (oInput.getValue() === ""){
                oInput.setValueState(sap.ui.core.ValueState.Error);
			    oInput.setValueStateText(menssagemErroQuantidadeVazia);
                ehValido = false;
            }
            else if (!regexNumeros.test(oInput.getValue()) | regexCaracters.test(oInput.getValue())){
                oInput.setValueState(sap.ui.core.ValueState.Error);
			    oInput.setValueStateText(mensagemErroQuantidadeComLetrasOuCaractersEspeciais);
                ehValido = false;
            }
            else {
                oInput.setValueState(sap.ui.core.ValueState.Success);
            }
        },
    }
});