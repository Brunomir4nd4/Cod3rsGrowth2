sap.ui.define([
	"sap/ui/test/opaQunit",
	"coders-growth/tests/integrations/pages/IngredientsList"
], function (opaTest) {
		"use strict";

		const INPUT_OLHO = "Olho";
		const INPUT_PO = "Pó";
		const INPUT_15 = 15;

		QUnit.module("Listagem");

		opaTest("Deve aparecer os ingredientes cotendo Olho no nome", function (Given, When, Then) {
			Given.iStartMyApp();

			//Actions
			When.naPaginaDeListagemDosIngredientes.aoInserirOlhoNoInputNome(INPUT_OLHO);

			// Assertions
			Then.naPaginaDeListagemDosIngredientes.aListaDeveConterItensComNomeOlho();
			
			// Cleanup
			Then.iTeardownMyApp();
		});

		opaTest("Clicar no botão OverWorld deve apresentar somentes os itens do OverWorld", function (Given, When, Then) {
			Given.iStartMyApp();

			When.naPaginaDeListagemDosIngredientes.aoClicarAbrirSelect();
			When.naPaginaDeListagemDosIngredientes.aoClicarNoBotaoOverWorld();
			Then.naPaginaDeListagemDosIngredientes.aTabelaDeveConterItensDoOverWorld();
		});

		opaTest("Clicar no botão Nether deve apresetar somente os itens do Nether", function (Given, When, Then) {
			
			When.naPaginaDeListagemDosIngredientes.aoClicarAbrirSelect();
			When.naPaginaDeListagemDosIngredientes.aoClicarNoBotaoNether();

			Then.naPaginaDeListagemDosIngredientes.aTabelaDeveConterItensDoNether();
		});

		opaTest("Clicar no botão TheEnd deve apresetar somente os itens do TheEnd", function (Given, When, Then) {
			
			When.naPaginaDeListagemDosIngredientes.aoClicarAbrirSelect();
			When.naPaginaDeListagemDosIngredientes.aoClicarNoBotaoTheEnd();

			Then.naPaginaDeListagemDosIngredientes.aTabelaDeveConterItemDoTheEnd();
		});

		opaTest("Deve apresentar os ingredientes contendo Pó no nome e com quantidade igual a 15", function (Given, When, Then) {
			//Actions
			When.naPaginaDeListagemDosIngredientes.aoClicarAbrirSelect();
			When.naPaginaDeListagemDosIngredientes.aoClicarNoBotaoTodos();
			When.naPaginaDeListagemDosIngredientes.aoInserirPoNoInputNome(INPUT_PO);
			When.naPaginaDeListagemDosIngredientes.aoInserir15NoInputQuantidade(INPUT_15);

			// Assertions
			Then.naPaginaDeListagemDosIngredientes.aTabelaDeveConterItensComNomePoEQuantidade15();
			
			// Cleanup
			Then.iTeardownMyApp();
		});
	}
);