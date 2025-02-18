sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
  ], function (Controller, MessageToast, JSONModel) {
    "use strict";
  
    return Controller.extend("innventproject.controller.Scoring", {
      onInit: function () {
        this.getView().setModel(this.getOwnerComponent().getModel("innventModel"));

        this.getOwnerComponent().getRouter().getRoute("Scoring").attachPatternMatched(this._onObjectMatched, this);
        
        // Create a JSON model for the view
        var oModel = new JSONModel({
          projectname: "",
          sprintround: "",
          problemStatement: 0,
          presentationPoints: 0,
          solutionSpace: 0,
          execution: 0,
          approachToSolveProblem:0,
          comments:""
        });
  
        this.getView().setModel(oModel,"sprintData");

      },

      _onObjectMatched() {
        this.getProjectName();
      },

      getProjectName:function(){

        this.byId("projectName").setSelectedKey("");
        this.byId("sprintSelection").setSelectedKey("");
        this.byId("startEvaluationButton").setEnabled(false);
        let Model=this.getView().getModel("innventModel");
        let oThat=this;
        Model.read("/Projects", {
          success: function(oData) {
              var data = oData.results;
              console.log(data);
              // Or if the response has only a single object:
              // var data = oData;

              var oModel = new sap.ui.model.json.JSONModel();

              // Set the data to your JSON model
              oModel.setData(data);

              // Assign the model to your UI5 control
              oThat.getView().setModel(oModel, "projectModel");


          }
        });

      },

      onSelectionChange: function(oEvent){
        const oMultiComboBox = oEvent.getSource();
        if (this.byId("projectName").getSelectedKey()!=='' && this.byId("sprintSelection").getSelectedKey()!=='') {
            this.byId("startEvaluationButton").setEnabled(true);
        }
      },

      onStartEvaluation: async function () {
        let sprintModel=this.getView().getModel("sprintData").getData();
        sprintModel.projectname={"projectname":this.byId("projectName").getSelectedKey()};
        sprintModel.sprintround=this.byId("sprintSelection").getSelectedKey();
        this.getView().getModel("sprintData").setData(sprintModel);

       

        
        if (!this.valueHelpDialog) {
          this.valueHelpDialog = sap.ui.xmlfragment(this.getView().getId(),
              "innventproject.view.fragment.ScoringForm", this);
          this.getView().addDependent(this.valueHelpDialog);
      }
      this.valueHelpDialog.open();
      },

      onSubmitDialog: function () {
        
        let sprintModel=this.getView().getModel("sprintData").getData();
        let oThat=this;
        sprintModel.problemStatement=this.byId("ps").getValue();
        sprintModel.presentationPoints=this.byId("pp").getValue();
        sprintModel.solutionSpace=this.byId("ss").getValue();
        sprintModel.execution=this.byId("ex").getValue();
        sprintModel.approachToSolveProblem =this.byId("ap").getValue();
        sprintModel.comments=this.byId("ar").getValue();

        this.getView().getModel("sprintData").setData(sprintModel);

        let oModel=this.getView().getModel("innventModel");

        oModel.create("/SprintData",sprintModel, {

          success: function (oDataResponse) {

            console.log(oDataResponse);
            oThat.byId("projectName").setSelectedKey("");
            oThat.byId("sprintSelection").setSelectedKey("");
          }
        });

        this.valueHelpDialog.destroy();
        this.valueHelpDialog = null;
        this.byId("scoreSuccess").setVisible(true);
        this.byId("Evaluation").setVisible(false);
    },

    onCloseDialog:function(){
      this.valueHelpDialog.destroy();
      this.valueHelpDialog = null;
    }
    });
  });
  