sap.ui.define([
	"sap/ui/test/Opa5",
    "./integrations/arrangements/Startup",
    "./integrations/pages/tenets/IngredientsListJourney",
    "./integrations/pages/tenets/IngredientRegisterJourney",
    "./integrations/pages/tenets/IngredientDetailsJourney"
], function (Opa5, Startup) {
    "use Strict";

    const NAME_SPACE = "coders-growth.view";
    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: NAME_SPACE,
        autoWait: true
    })
})