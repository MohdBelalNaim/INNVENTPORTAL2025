sap.ui.define(
  [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",

  ],
  function(BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("innventproject.controller.App", {
      onInit() {
          try{
            const apiUrl = "/user-api/currentUser"; 
            const oModel = new JSONModel();

            // const oData =  fetch(apiUrl, {
            //   method: "GET"
            // });
            let that = this;
            jQuery.ajax({
              type: "GET",
              url: "/user-api/currentUser",
              success: (data) => {
                try {
                  // Parse the JSON response
                  const jsonData = {
                    adminAccess: data.scopes.some(item=>item.includes('adminAccess')),
                    scholarAccess: data.scopes.some(item=>item.includes('scholarAccess')),
                    evaluatorAccess: data.scopes.some(item=>item.includes('evaluatorAccess'))
                  }

                  if(Object.values(jsonData).every(value => !value)){
                    // that.byId("unauthorizedAccess").setVisible(true);
                    // that.byId("app").setVisible(false);
                  }
                  // else{
                      // Assign the scopes to a model property for UI binding
                      oModel.setData(jsonData);
                      that.getView().setModel(oModel, "visibility");
                  // }
                  
                } catch (error) {
                  console.error("Error parsing response:", error);
                  // Handle errors appropriately, e.g., display an error message to the user
                }
              },
              error: function (error) {
                console.log(error)
            }
            });
          
          } 
          catch (error) {
            console.error("Error retrieving scopes:", error);
            // Handle errors appropriately, e.g., display an error message to the user
          }      
      },
      onItemSelect: function (oEvent) {
        var oItem = oEvent.getParameter('item');
        var sKey = oItem.getKey();
        sap.ui.core.UIComponent.getRouterFor(this).navTo(sKey);

      },
      onSideNavButtonPress: function () {
        var oSideNavigation = this.byId("sideNavigation");
        var bExpanded = oSideNavigation.getExpanded();
        oSideNavigation.setExpanded(!bExpanded);
      }
    });
  }
);