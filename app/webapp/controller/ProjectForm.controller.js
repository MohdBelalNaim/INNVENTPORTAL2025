sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Token",
	"sap/ui/model/json/JSONModel"
], function (
	Controller, Token, JSONModel
) {
	"use strict";

	return Controller.extend("innventproject.controller.ProjectForm", {

		onInit: function () {
			this.getView().setModel(this.getOwnerComponent().getModel("innventModel"));
			var oView = this.getView();
			oView.setModel(
				new JSONModel({
					projectname: "",
					problemstatement: "",
					mentorName: "",
					projectOwnerName: "",
					lobHead: "",
					lobName: "",
					overallefforts: "",
					technologies: "",
					setup: "",
					prerequisites: "",
					expectedDeliverables: "",
					sapbenefits: ""
				}),
				"projectForm"
			);
			// var oMultiInput = oView.byId("Tech");

			// var fnValidator = function (args) {
			// 	var text = args.text;

			// 	return new Token({
			// 		key: text,
			// 		text: text
			// 	});
			// };

			// oMultiInput.addValidator(fnValidator);

		},

		onSubmit: function () {

			let model = this.getView().getModel("projectForm");
			let data = model.getData();
			console.log(data);


			var oThat = this;
			var oData = this.getView().getModel("projectForm");
			console.log(oData);
			let that = this
			if (isNaN(oData.oData["overallefforts"])) {
				MessageBox.error("Overall Efforts Should be Numeric");
			} else {
				var oTableModel = this.getView().getModel("innventModel");
				oTableModel.create("/Projects", oData.oData, {
					success: function () {
						that.byId("ProjectSuccess").setVisible(true);
        				that.byId("_IDGenPage1").setVisible(false);
						// sap.m.MessageToast.show("Project Added successfully.");

					},
					error: function (oError) {
						console.log(oError);
						oTableModel.refresh();
					}
				});
			}
			
		},

		tokenUpdate: function (oEvent) {
			var sType = oEvent.getParameter("type"),
				aAddedTokens = oEvent.getParameter("addedTokens"),
				aRemovedTokens = oEvent.getParameter("removedTokens"),
				model = this.getView().getModel("projectForm"),
				items = model.getProperty("/tech");

			switch (sType) {
				// add new context to the data of the model, when new token is being added
				case "added":
					aAddedTokens.forEach(function (oToken) {
						items.push({
							key: oToken.getKey(),
							text: oToken.getText()
						});
					});
					break;
					// remove contexts from the data of the model, when tokens are being removed
				case "removed":
					aRemovedTokens.forEach(function (oToken) {
						items = items.filter(function (oContext) {
							return oContext.key !== oToken.getKey();
						});
					});
					break;
				default:
					break;
			}

			model.setProperty("/tech", items);
		},

		projectInfoValidation: function () {
			var projectName = this.byId("ProjectName").getValue();
			var projectStatement = this.byId("ProjectStatement").getValue();
			var mentorName = this.byId("MentorName").getValue();
			var projectOwnerName = this.byId("ProjectOwnerName").getValue();
			var lobHead = this.byId("LobHead").getValue();
			var lobName = this.byId("LobName").getValue();

			if (projectName.length < 3 || projectStatement.length < 3 || mentorName.length < 3 || projectOwnerName.length < 3 ||
				lobHead.length < 3 || lobName.length < 3) {
				this.byId("ProjectInfo").setValidated(false);
			} else {
				this.byId("ProjectInfo").setValidated(true);
			}
		},

		optionalInfoValidation: function () {
			var overallEffort = parseInt(this.byId("OverallEffort").getValue());

			if (isNaN(overallEffort)) {
				this.byId("OptionalInfoStep").setValidated(false);
			} else {
				this.byId("OptionalInfoStep").setValidated(true);
			}

		},

		conclusionInfoValidate: function () {
			var expectedDeliverables = this.byId("Expected").getValue();
			var benefit = this.byId("Benefit").getValue();
			var button = this.byId("idSubmit");

			if (expectedDeliverables.length > 3 && benefit.length > 3) {
				button.setEnabled(true);
			}
		}

	});
});