sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("innventproject.controller.EvaluationData", {
            onInit: function () {
                this.getView().setModel(this.getOwnerComponent().getModel("innventModel"));
                
            }

        });

    });