sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";

    return Controller.extend("innventproject.controller.Overview", {
        
        // Event handler for when a project is pressed in the list
        onProjectPress: function(oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext();
            var sProjectName = oContext.getProperty("name");
            MessageToast.show("Selected Project: " + sProjectName);
            
            // Add navigation logic here if needed
        },
        
        // Event handler for when the "Create New Project" button is pressed
        onCreateNewProjectPress: function() {
            MessageToast.show("Create New Project Button Pressed");
            
            // Add logic to navigate to the create project page or open a dialog for creating a new project
        }
        
        // Add any additional event handlers or methods as needed
        
    });
});
