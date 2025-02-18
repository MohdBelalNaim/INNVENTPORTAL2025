sap.ui.define(
  [
    "innventproject/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  function (BaseController, JSONModel, MessageToast) {
    "use strict";
    let controller, view;
    return BaseController.extend(
      "innventproject.controller.StudentRegistration",
      {
        onInit: function () {
          controller = this;
          view = controller.getView();
          this.getView().setModel(
            this.getOwnerComponent().getModel("innventModel")
          );
          this.getRouter()
            .getRoute("StudentRegistration")
            .attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched() {
          controller.registerStudent();
        },

        addSkill: function () {
          let newRow = {
            skill: "C++",
            level: "Beginner",
            state: "None",
            stateText: "",
          };
          let model = view.getModel("student");
          let itemList = model.getProperty("/skills");
          itemList.push(newRow);
          model.setProperty("/skills", itemList);
          controller.verifySkills();
        },

        deleteSkill: function () {
          let oItems = view.byId("skillTable").getSelectedContextPaths();
          let skillList;
          const model = view.getModel("student");
          view.byId("skillTable").removeSelections();

          if (oItems.length == 0) {
            sap.m.MessageToast.show("Select row(s) to delete");
            return;
          }
          oItems.sort();

          for (let i = oItems.length - 1; i >= 0; i--) {
            // Path /landscapes/0
            let aPathParts = oItems[i].split("/");
            let iIndex = aPathParts[aPathParts.length - 1];
            skillList = model.getProperty("/skills");
            skillList.splice(iIndex, 1);
            model.setProperty("/skills", skillList);
          }
          this.verifySkills();
        },

        registerStudent: function () {
          let Model = this.getView().getModel("innventModel");
          let oThat = this;
          Model.read("/Skills", {
            success: function (oData) {
              var data = oData.results;
              // Or if the response has only a single object:
              // var data = oData;
              oThat.getView().setModel(
                new JSONModel({
                  batch: "2YA",
                  detailsBtn: false,
                  registerBtn: false,
                  batchList: [
                    {
                      key: "2YA",
                    },
                    {
                      key: "2YB",
                    },
                    {
                      key: "DS",
                    },
                    {
                      key: "4Y",
                    },
                  ],
                  skills: [],
                  levels: [
                    {
                      key: "Beginner",
                    },
                    {
                      key: "Intermediate",
                    },
                    {
                      key: "Expert",
                    },
                  ],
                  skillList: data,
                }),
                "student"
              );

              // console.log(controller.getModel('student').getData());
            },
            error: function (oError) {
              console.error(
                "An error occurred while trying to read data",
                oError
              );
            },
          });
        },

        validateDetails: function () {
          let studentModel = controller.getModel("student").getData();
          let res = true;

          if (
            studentModel.inumber &&
            studentModel.inumber.length === 7 &&
            studentModel.inumber.toUpperCase().startsWith("I")
          ) {
            view.byId("inumber").setValueState("None");
            view.byId("inumber").setValueStateText("");
          } else if (studentModel.hasOwnProperty("inumber")) {
            res = false;
            view.byId("inumber").setValueState("Error");
            view
              .byId("inumber")
              .setValueStateText("Enter I Number - ex. I123456");
          }

          if (studentModel.name && studentModel.name.length > 0) {
            view.byId("name").setValueState("None");
            view.byId("name").setValueStateText("");
          } else if (studentModel.hasOwnProperty("name")) {
            res = false;
            view.byId("name").setValueState("Error");
            view.byId("name").setValueStateText("Name can not be blank");
          }

          if (
            studentModel.email &&
            studentModel.email.toLowerCase().endsWith("@sap.com") &&
            studentModel.email.length >= 1 + 8
          ) {
            view.byId("email").setValueState("None");
            view.byId("email").setValueStateText("");
          } else if (studentModel.hasOwnProperty("email")) {
            res = false;
            view.byId("email").setValueState("Error");
            view.byId("email").setValueStateText("Please use SAP email only");
          }

          if (
            studentModel.mobile &&
            studentModel.mobile.length === 10 &&
            Number(studentModel.mobile)
          ) {
            view.byId("mobile").setValueState("None");
            view.byId("mobile").setValueStateText("");
          } else if (studentModel.hasOwnProperty("mobile")) {
            res = false;
            view.byId("mobile").setValueState("Error");
            view
              .byId("mobile")
              .setValueStateText("Please enter 10 digit mobile number");
          }

          studentModel.detailsBtn = res;
          controller.getModel("student").refresh();
        },

        verifySkills: function () {
          let set = new Set();
          let student = controller.getModel("student").getData();
          let skills = student.skills;
          let flag = true;
          controller.validateDetails();
          for (let i in skills) {
            let skill = skills[i].skill;
            if (set.has(skill)) {
              flag = false;
              skills[i].state = "Error";
              skills[i].stateText = "Skill already chosen above";
            } else {
              set.add(skill);
              skills[i].state = "None";
              skills[i].stateText = "";
            }
          }
          student.registerBtn = flag;
          controller.getModel("student").refresh();
        },

        onRegister: async function () {
          let data = view.getModel("student").getData();
          let oScholarModel = this.getView().getModel("innventModel");

          let key_list = Object.keys(data);

          if (
            !key_list.includes("inumber") ||
            !key_list.includes("name") ||
            !key_list.includes("email") ||
            !key_list.includes("batch")
          ) {
            MessageToast.show("All Personal Details should be Filled");
            return;
          }

          if (!data["detailsBtn"]) {
            MessageToast.show("Error in Personal Details");
            return;
          }

          if (data["skills"].length === 0) {
            MessageToast.show("Atleast 1 Skill should be added");
            return;
          }

          if (!data["registerBtn"]) {
            MessageToast.show("Error in Skills");
            return;
          }

          // Create scholar data
          let scholarData = {
            inumber: data.inumber,
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            batch: data.batch,
            skills: JSON.stringify(data["skills"]),
          };

          try {
            // First create the scholar
            const scholarResponse = await new Promise((resolve, reject) => {
              oScholarModel.create("/Scholars", scholarData, {
                success: resolve,
                error: reject,
              });
            });

            // Then create skills one by one
            const skillPromises = data.skills.map((skillItem) => {
              return new Promise((resolve, reject) => {
                const skillData = {
                  scholar_id: {
                    inumber: scholarResponse.inumber,
                  },
                  skill_id: {
                    skill_id: parseInt(skillItem.skill),
                  },
                  level: skillItem.level,
                };

                oScholarModel.create("/ScholarSkills", skillData, {
                  success: resolve,
                  error: reject,
                });
              });
            });

            // Wait for all skills to be created
            await Promise.all(skillPromises);

            // Clear the form
            let oModel = this.getView().getModel("student");
            let oData = oModel.getData();

            delete oData.inumber;
            delete oData.name;
            delete oData.email;
            delete oData.mobile;
            oData.batch = "2YA";
            oData.skills = [];

            oModel.setData(oData);

            // Show success message
            MessageToast.show("Registered successfully.");
            this.byId("StudentSuccess").setVisible(true);
            this.byId("student-register").setVisible(false);
          } catch (error) {
            // Handle any errors that occurred during the process
            console.error("Error during registration:", error);
            MessageToast.show(
              "Error occurred during registration. Please try again."
            );
          }
        },

        onClickCancel: function () {
          if (controller.registerDialog) {
            controller.registerDialog.destroy();
            controller.registerDialog = null;
          }
        },
      }
    );
  }
);
