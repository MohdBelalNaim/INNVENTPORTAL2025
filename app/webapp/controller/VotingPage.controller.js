sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";

    let controller, view;
    return Controller.extend("innventproject.controller.VotingPage", {
      onInit: function () {
        this.getView().setModel(
          new JSONModel({
            teamName: "",
            teamDescription: "",
            rating: "",
          }),
          "voting"
        );
        controller = this;
        view = controller.getView();
      },

      onSliderChange: function () {
        let model = view.getModel("voting");
        let slider = this.getView().byId("slider");
        let value = slider.getValue();
        model.setProperty("/rating", value);
        console.log(model);
      },

      onVoting: function () {
        let model = view.getModel("voting");
        let data = model.getData();
        console.log(data);
      },
    });
  }
);
