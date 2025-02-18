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

        return Controller.extend("innventproject.controller.Projectdata", {
            onInit: function () {
                this.getView().setModel(this.getOwnerComponent().getModel("innventModel"));
                var oModel, oTable;
                var oData = new JSONModel;
                this.getView().setModel(oData, "tempData");
                oTable = this.getView().byId("ID").getTable();
                oTable.attachRowSelectionChange(this.onTableSelection, this);
            },

            // opens the create project fragment
            onCreateProject: function () {
                Fragment.load({
                    name: "innventproject.view.fragment.AddProjectDialog",
                    controller: this
                }).then(function (oFragment) {
                    this.AddProjectDialog = oFragment;
                    this.getView().addDependent(this.AddProjectDialog);
                    this.AddProjectDialog.setEscapeHandler(function () {
                        this.onCloseEditDialog();
                    }.bind(this));
                    this.AddProjectDialog.open();
                }.bind(this));

            },

            //function to check if the value is a number 
            isNumber: function (value) {
                if (isNaN(value)) {
                    return false
                }
                else {
                    return true
                }
            },
            
            // function used to add project based on users entered data
            onAddDialog: function () {
                var oThat = this;
                var oData = this.getView().getModel("tempData");
                console.log(oData);
                console.log(isNaN(oData.oData["overallefforts"]));
                if (this.hasEmptyValue(oData.oData)) {
                    MessageBox.error("Fields cannot be empty");
                }
                else if (isNaN(oData.oData["overallefforts"])) {
                    MessageBox.error("Overall Efforts Should be Numeric");
                }
                else {
                    var oTableModel = this.getView().getModel("innventModel");
                    oTableModel.create("/Projects", oData.oData, {
                        success: function () {
                            sap.m.MessageToast.show("Project Added successfully.");
                            oThat.onCloseAddDialog()

                        }, error: function (oError) {
                            console.log(oError);
                            oTableModel.refresh();
                        }
                    });
                }
            },

            //function to open Edit fragment
            onProjectEdit: function (oEvent) {
                var oindex = this.getView().byId("ID").getTable().getSelectedIndex(); 
                var opath = this.getView().byId("ID").getTable().getContextByIndex(oindex).sPath;

                Fragment.load({
                    name: "innventproject.view.fragment.EditProjectDialog",
                    controller: this
                }).then(function (oFragment) {
                    this.oEditDialog = oFragment;
                    oFragment.bindObject(opath);
                    this.getView().addDependent(this.oEditDialog);
                    this.oEditDialog.setEscapeHandler(function () {
                        this.onCloseEditDialog();
                    }.bind(this));
                    this.oEditDialog.open();
                }.bind(this));
            },

            //reset the temporary data 
            resettempData: function () {
                var oData = new JSONModel;
                this.getView().setModel(oData, "tempData");
            },

            //function to close Edit fragment
            onCloseEditDialog: function () {
                this.resettempData();
                this.oEditDialog.close();
                this.oEditDialog.destroy();
                this.oEditDialog = null;
            },

            //function to close Add Project fragment
            onCloseAddDialog: function () {
                this.resettempData();
                this.AddProjectDialog.close();
                this.AddProjectDialog.destroy();
                this.AddProjectDialog = null;

            },

            //function is used to load the temporary data when input filed is changed during Edit Project functionality
            onFieldChangeEdit: function (oEvent) {
                var sEditedValue = oEvent.getParameter("newValue");
                var path = oEvent.getSource()._getBindingContext().sPath;
                var id = oEvent.getSource().mBindingInfos.value.binding.sPath;
                var oNewData = {};
                oNewData[id] = sEditedValue;
                var oData = this.getView().getModel("tempData");
                oData.setProperty("/" + id, sEditedValue);

                console.log(this.getView().getModel("tempData"));
            },

            //function is used to load the temporary data when input filed is changed during Add Project functionality
            onFieldChangeAdd: function (oEvent) {
                var newValue = oEvent.getParameter("newValue");
                var id = oEvent.getParameter("id");
                var oNewData = {};
                oNewData[id] = newValue;
                var oData = this.getView().getModel("tempData");
                oData.setProperty("/" + id, newValue);
            },

            //function to enable and disable the edit button based on whether row is selected or not
            onTableSelection: function (oEvent) {
                var aSelectedItems = this.getView().byId("ID").getTable().getSelectedIndices();
                this.getView().byId("btnEdit").setEnabled(aSelectedItems.length > 0);
            },  

            // function to delete a project from the table
            onDeleteDialog: function (oEvent) {

                var oThat = this;
                var oindex = this.getView().byId("ID").getTable().getSelectedIndex(); 
                var opath = this.getView().byId("ID").getTable().getContextByIndex(oindex).sPath;
                var oDataModel = this.getView().getModel("innventModel");
                sap.m.MessageBox.warning("Are you sure you want to delete this row?", {
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function (sAction) {
                        if (sAction == "YES") {
                            oDataModel.remove(opath, {
                                success: function (oData, response) {
                                    // Success message
                                    sap.m.MessageToast.show("Project deleted successfully.");
                                    // this.onCloseDialog();
                                    oThat.onCloseEditDialog();
                                },
                                error: function (oError) {
                                    // Error message
                                    sap.m.MessageToast.show("Error deleting source.");
                                }
                            });
                        }
                    }
                });
            },

            //checks is the input field in the form is empty
            hasEmptyValue: function (data) {
                for (var key in data) {
                    if (data[key] == "") {
                        return true
                    }
                }
                return false
            },

            checkOverallEfforts: function(data){
                for (var key in data) {
                    if (key == "overallefforts") {
                        if(isNaN(data[key])){
                            return true
                        }
                    }
                }
                return false
            },
        
            //function to save once edit has been completed
            onSaveDialog: function (oEvent) {
                var oThat = this;
                var oData = this.getView().getModel("tempData");
                if (this.hasEmptyValue(oData.oData)) {
                    MessageBox.error("Fields cannot be empty");
                }
                else if (this.checkOverallEfforts(oData.oData)) {
                    MessageBox.error("Overall Efforts Should be Numeric");
                }
                else {
                    var oindex = this.getView().byId("ID").getTable().getSelectedIndex(); 
                    var opath = this.getView().byId("ID").getTable().getContextByIndex(oindex).sPath;
                    var oTableModel = this.getView().getModel("innventModel");
                    sap.m.MessageBox.warning("Are you sure you want to edit ?", {
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        onClose: function (sAction) {
                            if (sAction == "YES") {
                                oTableModel.update(opath, oData.oData, {
                                    merge: true,
                                    success: function () {
                                        sap.m.MessageToast.show("Item edited successfully.");
                                        oThat.onCloseEditDialog();

                                    }, error: function (oError) {
                                        MessageBox.error("Area cannot be 0");
                                        oTableModel.refresh();
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    });
