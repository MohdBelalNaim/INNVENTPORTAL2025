sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageBox'
], function (Controller, MessageBox) {
    "use strict";
    return Controller.extend("innventproject.controller.BaseController", {
        /*** Convenience method for accessing the router.
         * @public
         * @returns {sap.ui.core.routing.Router} the router for this component*/
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        /*** Convenience method for getting the view model by name.
         * @public
         * @param {string} [sName] the model name
         * @returns {sap.ui.model.Model} the model instance*/
        getModel: function (sName) {
            return this.getView().getModel(sName);
        },
        /*** Convenience method for setting the view model.
         * @public
         * @param {sap.ui.model.Model} oModel the model instance
         * @param {string} sName the model name
         * @returns {sap.ui.mvc.View} the view instance*/
        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },
        navTo: function (to, data) {
            let prevRoute = this.getRouter().oHashChanger.hash;
            if ((prevRoute === "" && to === "home") || prevRoute === to) {
                sap.ui.core.BusyIndicator.hide();
            } else {
                this.checkSideExpanded(to);
                this.getRouter().navTo(to, data);
            }
        },

    });
});