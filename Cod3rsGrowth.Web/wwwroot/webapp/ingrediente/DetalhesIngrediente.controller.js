sap.ui.define([
    "coders-growth/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "coders-growth/model/Formatter",
    "sap/m/MessageBox"
], function(BaseController, JSONModel, Formatter, MessageBox) {
    'use strict';

    const URL_API = "https://localhost:7224/api/Ingredientes";
    const NOME_DO_MODELO = "ingrediente";
    const ROTA_DETALHES = "appDetalhesIngrediente";
    const CHAVE_VIEW_CADASTRAR_INGREDIENTE = "appCadastroIngrediente";
    const PRORIEDADE_ID = "id";
    const ARGUMENTOS_DE_PARAMETRO = "arguments";

    return BaseController.extend("coders-growth.ingrediente.DetalhesIngrediente", {
        formatter: Formatter,
        
        onInit(){
            this._aoCoincidirRota();
        },

        aoClicarIrParaCadastro() {
            this._processarAcao(() => {
                this.getRouter().navTo(CHAVE_VIEW_CADASTRAR_INGREDIENTE, {}, true);
            })
        },

        aoClicarIrParaCadastroParaEditar(oEvent) {
            this._processarAcao(() => {
                const oItem = oEvent.getSource();
                this.getRouter().navTo(CHAVE_VIEW_CADASTRAR_INGREDIENTE, {
                    id: window.encodeURIComponent(oItem.getBindingContext(NOME_DO_MODELO).getProperty(PRORIEDADE_ID))
                }, true);
            })
        },

        _aoCoincidirRota() {
            this._processarAcao(() => {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute(ROTA_DETALHES).attachPatternMatched(this._obterPorId, this);
            });
        },

        _obterPorId(oEvent) {
            this._processarAcao(() => {
                const id = oEvent.getParameter(ARGUMENTOS_DE_PARAMETRO).id;
                const barraInvertida = "/";
                const query = URL_API + barraInvertida + id;
                let sucesso = true;
                fetch(query)
                    .then(resp => {
                        if (!resp.ok) 
                            sucesso = false;
                        return resp.json();
                    })
                    .then(data => {
                        sucesso ? this.getView().setModel(new JSONModel(data), NOME_DO_MODELO) 
                        : this._erroNaRequisicaoDaApi(data);
                    })
                    .catch((err) => MessageBox.error(err.message));
            })
        },
    })
});