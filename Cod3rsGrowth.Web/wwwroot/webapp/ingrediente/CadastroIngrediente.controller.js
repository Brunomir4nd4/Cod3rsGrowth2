sap.ui.define([
    "coders-growth/controller/BaseController",
    "coders-growth/model/Formatter",
    "coders-growth/model/Validators",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
], function (BaseController, Formatter, Validators, MessageBox, JSONModel) {
    "use strict";

    const URL_API = "https://localhost:7224/api/Ingredientes";    
    const ID_INPUT_NOME = "inputNome";
    const ID_INPUT_QUANTIDADE = "inputQuantidade";
    const ID_INPUT_NATURALIDADE = "inputNaturalidade";
    const ROTA_CADASTRO = "appCadastroIngrediente";
    const REQUISICAO_POST = "POST";
    const REQUISICAO_PATCH = "PATCH";
    const ARGUMENTOS_DE_PARAMETRO = "arguments";
    const ID_MENSSAGE_STRIP_SECESSO = "successMessageStrip";
    const ID_MENSSAGE_STRIP_ERRO = "errorMessageStrip";
    const ID_BOTAO_SALVAR = "saveButton";
    const NOME_DO_MODELO_ENUM = "enum";
    var PARAMETRO_ID;

    return BaseController.extend("coders-growth.ingrediente.CadastroIngrediente", {
        onInit(){
            this._aoCoincidirRota();
        },

        aoAlterarNome(){
            this._processarAcao(() =>{
                const inputNome = this.getView().byId(ID_INPUT_NOME);       
                Validators.ValidarNome(inputNome, inputNome.getValue());
            });
        },
        
        aoAlterarQuantidade(){
            this._processarAcao(() => {
                const inputQuantidade = this.getView().byId(ID_INPUT_QUANTIDADE);
                Validators.ValidarQuantidade(inputQuantidade, inputQuantidade.getValue());
            });
        },

        aoClicarCadastrarIngrediente(){
            this._processarAcao(() =>{
                const inputNome = this.getView().byId(ID_INPUT_NOME);
                const inputQuantidade = this.getView().byId(ID_INPUT_QUANTIDADE);
                const naturalidade = this.getView().byId(ID_INPUT_NATURALIDADE).getSelectedItem().getText();
                const nome = inputNome.getValue();
                const quantidade = inputQuantidade.getValue();
                const ehValido = Validators.ValidarIngrediente(inputNome, inputQuantidade);
                const visivel = true;
                const naoVisivel = false;    

                if (ehValido) {
                    const oIngrediente = {
                        Nome: nome,
                        Quantidade: quantidade,
                        Naturalidade: Formatter.formatarStringDoEnum(naturalidade)
                    };
                
                    if (PARAMETRO_ID !== undefined) {
                        oIngrediente.Id = PARAMETRO_ID;
                        this._requistarApi(URL_API, oIngrediente, REQUISICAO_PATCH);
                    } else {
                        this._requistarApi(URL_API, oIngrediente, REQUISICAO_POST);
                    }
                } else {
                    this.getView().byId(ID_MENSSAGE_STRIP_ERRO).setVisible(visivel);
                    this.getView().byId(ID_MENSSAGE_STRIP_SECESSO).setVisible(naoVisivel);
                }
            });
        },

        _aoCoincidirRota() {
            this._processarAcao(() => {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute(ROTA_CADASTRO).attachPatternMatched((oEvent) => {
                    this._limparResquisiosDeCadastro();
                    this._regatarParamentroUrl(oEvent);
                    this._carregarEnumNaturalidade(URL_API, NOME_DO_MODELO_ENUM);
                    this._obterPorId(URL_API);
                }, this);
            });
        },

        _limparResquisiosDeCadastro() {
            this._processarAcao(() => {
                const iconSave = "sap-icon://save";
                const keyOverWorld = "OverWorld";
                const SEM_VALORES = "";
                const inputNome = this.getView().byId(ID_INPUT_NOME);
                const inputQuantidade = this.getView().byId(ID_INPUT_QUANTIDADE);
                const inputNaturalidade = this.getView().byId(ID_INPUT_NATURALIDADE);
                const naoVisivel = false;
    
                this.getView().byId(ID_MENSSAGE_STRIP_SECESSO).setVisible(naoVisivel);
                this.getView().byId(ID_MENSSAGE_STRIP_ERRO).setVisible(naoVisivel);
                this.getView().byId(ID_BOTAO_SALVAR).setIcon(iconSave);
                inputNome.setValueState(sap.ui.core.ValueState.None);
                inputQuantidade.setValueState(sap.ui.core.ValueState.None);
                inputNome.setValue(SEM_VALORES);
                inputQuantidade.setValue(SEM_VALORES);
                inputNaturalidade.getItems().map((item) => {
                    if (item.getKey() === keyOverWorld){
                        inputNaturalidade.setSelectedItem(item);
                    }
                });
            })
        },

        _regatarParamentroUrl(oEvent){
            this._processarAcao(() => {
                PARAMETRO_ID = oEvent.getParameter(ARGUMENTOS_DE_PARAMETRO).id;
            })
        },

        _obterPorId(urlApi) {
            this._processarAcao(() => {
                let sucesso = true;
                if (PARAMETRO_ID){
                    let query = urlApi + "/" + PARAMETRO_ID;
                    fetch(query)
                        .then(resp => {
                            if (!resp.ok)
                                sucesso = false;
                            return resp.json();
                        })
                        .then(data => {
                            sucesso ? this._inserirDadosDeEdicao(data)
                            : this._erroNaRequisicaoDaApi(data);
                        })
                        .catch((err) => MessageBox.error(err.message));
                }
            })
        },

        _inserirDadosDeEdicao(ingrediente){
            this._processarAcao(() => {
                const oSelect = this.getView().byId(ID_INPUT_NATURALIDADE);
                this.getView().byId(ID_INPUT_NOME).setValue(ingrediente.nome);
                this.getView().byId(ID_INPUT_QUANTIDADE).setValue(ingrediente.quantidade);
                oSelect.getItems().map((item) => {
                    if (item.getKey() == Formatter.formatarValorInteiroDoEnum(ingrediente.naturalidade)){
                        oSelect.setSelectedItem(item);
                    }
                });
            })
        },
        
        _requistarApi(urlApi, ingrediente, metodoDaRequisicao){
            this._processarAcao(() => {
                let sucesso = true;
                const iconComplete = "sap-icon://complete";
                const visivel = true;
                const naoVisivel = false;
                fetch(urlApi, {
                    method: metodoDaRequisicao,
                    body: JSON.stringify(ingrediente),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => {
                    if (!response.ok) 
                        sucesso = false;
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    if (sucesso){
                        this.getView().byId(ID_BOTAO_SALVAR).setIcon(iconComplete);
                        this.getView().byId(ID_MENSSAGE_STRIP_SECESSO).setVisible(visivel);
                        this.getView().byId(ID_MENSSAGE_STRIP_ERRO).setVisible(naoVisivel);
                    } else 
                        this._erroNaRequisicaoDaApi(data);
                })
                .catch(err => MessageBox.error(err.message));
            })
        },

        _carregarEnumNaturalidade(query, nomeDoModelo) {
            query += "/naturalidade";
            let sucesso = true;
            fetch(query)
                .then(response => {
                    if (!response.ok) 
                        sucesso = false;
                    return response.json();
                })
                .then((data) => {
                    sucesso ? this.getView().setModel(new JSONModel({
                        descricao: data.map(function(item) {
                            return { text: item };
                        })
                    }), nomeDoModelo) 
                    : this._erroNaRequisicaoDaApi(data);
                })
                .catch((err) => MessageBox.error(err.message));
        },
    }) 
});