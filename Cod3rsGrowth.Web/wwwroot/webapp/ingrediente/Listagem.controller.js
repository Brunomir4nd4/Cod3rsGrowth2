sap.ui.define([
    "coders-growth/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "coders-growth/model/Formatter",
    "sap/m/MessageBox"
 ], function (BaseController,JSONModel, Formatter, MessageBox) {
    "use strict";

    const URL_API = "https://localhost:7224/api/Ingredientes";
    const NOME_DO_MODELO = "ingrediente";
    const NOME_DO_MODELO_ENUM = "enum";
    const ID_INPUT_NOME = "filtroNome";
    const ID_INPUT_QUANTIDADE = "filtroQuantidade";
    const ID_INPUT_NATURALIDADE = "filtroNaturalidade";
    const FLAG_PARA_FILTROAGEM_NULA = "Todos";
    const CHAVE_VIEW_CADASTRAR_INGREDIENTE = "appCadastroIngrediente";
    const CHAVE_VIEW_DETALHES_INGREDIENTE = "appDetalhesIngrediente";
    const ROTA_LISTAGEM = "appListagem";
    const PROPRIEDADE_ID = "id";
    
    return BaseController.extend("coders-growth.ingrediente.Listagem", {
        formatter: Formatter,

        onInit(){
            this._aoCoincidirRota();
        },

        aoAlterarFiltrar(){
            this._processarAcao(() => {
                let query = URL_API + "?";
                const filtroNome = this.oView.byId(ID_INPUT_NOME).getValue();
                const filtroQuantidade = this.oView.byId(ID_INPUT_QUANTIDADE).getValue();
                const filtroNaturalidade = this.oView.byId(ID_INPUT_NATURALIDADE).getSelectedItem().getText();
    
                if (filtroNome)
                    query += "Nome="+filtroNome+"&";
                
                if (filtroQuantidade)
                    query += "Quantidade="+filtroQuantidade+"&";
    
                if (filtroNaturalidade != FLAG_PARA_FILTROAGEM_NULA)
                    query += "Naturalidade="+filtroNaturalidade;

                this._carregarDados(query, NOME_DO_MODELO);
            });
        },

        aoClicarIrParaCadastro() {
            this._processarAcao(() => {
                this.getRouter().navTo(CHAVE_VIEW_CADASTRAR_INGREDIENTE, {}, true);
            })
        },

        aoClicarIrParaDetalhes(oEvent) {
            this._processarAcao(() => {
                const oItem = oEvent.getSource();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo(CHAVE_VIEW_DETALHES_INGREDIENTE, {
                    id: window.encodeURIComponent(oItem.getBindingContext(NOME_DO_MODELO).getProperty(PROPRIEDADE_ID))
                });
            })
        },

        _aoCoincidirRota() {
            this._processarAcao(() => {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute(ROTA_LISTAGEM).attachPatternMatched(() => {
                    this._carregarDados(URL_API, NOME_DO_MODELO);
                    this._carregarEnumNaturalidade(URL_API, NOME_DO_MODELO_ENUM);
                }, this);
            });
        },

        _carregarDados(query, nomeDoModelo){
            let sucesso = true;
            fetch(query)
                .then(response => {
                    if (!response.ok) 
                        sucesso = false;
                    return response.json();
                })
                .then((data) => {
                    sucesso ? this.getView().setModel(new JSONModel(data), nomeDoModelo)
                    : this._erroNaRequisicaoDaApi(data);
                })
                .catch((err) => MessageBox.error(err.message));
        },

        _carregarEnumNaturalidade(query, nomeDoModelo) {
            query += "/naturalidade";
            let sucesso = true;
            const campoTodos = "Todos";
            const oSelect = this.getView().byId(ID_INPUT_NATURALIDADE);
            fetch(query)
                .then(response => {
                    if (!response.ok) 
                        sucesso = false;
                    return response.json();
                })
                .then((data) => {
                    const camposDoSelect = data;
                    camposDoSelect.push(campoTodos);

                    sucesso ? this.getView().setModel(new JSONModel({
                        descricao: camposDoSelect.map(function(item) {
                            return { text: item };
                        })
                    }), nomeDoModelo) 
                    : this._erroNaRequisicaoDaApi(data);
                })
                .catch((err) => MessageBox.error(err.message));
            oSelect.setSelectedKey(campoTodos);
        },
    });
});