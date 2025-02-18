/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "innventproject/model/models",
        "sap/m/IllustrationPool"
    ],
    function (UIComponent, Device, models, IllustrationPool) {
        "use strict";

        return UIComponent.extend("innventproject.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model                
                this.setModel(models.createDeviceModel(), "device");
                var oTntSet = {
                    setFamily: "tnt",
                    setURI: sap.ui.require.toUrl("sap/tnt/themes/base/illustrations")
                };
                IllustrationPool.registerIllustrationSet(oTntSet, false);
            }
        });
    }
);