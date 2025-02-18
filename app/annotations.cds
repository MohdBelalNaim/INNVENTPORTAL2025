using innventService as service from '../srv/innvent-service';
using from '../db/schema';

// Annotate service.Customers with title
// annotate service.Projects with @title : '{i18n>Customer}';

// Annotate service.Incidents with UI.LineItem
annotate service.Projects with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : projectname,
            Label : '{i18n>Project Name}',
        },
        {
            $Type : 'UI.DataField',
            Value : problemstatement,
            Label : '{i18n>Problem Statement}',
        },
        {
            $Type : 'UI.DataField',
            Value : overallefforts,
            Label : '{i18n>Overall Efforts}',
        },
        {
            $Type : 'UI.DataField',
            Value : technologies,
            Label : '{i18n>Technologies}',
        },
        {
            $Type : 'UI.DataField',
            Value : setup,
            Label : '{i18n>Setup}',
        },
        {
            $Type : 'UI.DataField',
            Value : prerequisites,
            Label : '{i18n>Prerequisites}',
        },
        {
            $Type : 'UI.DataField',
            Value : expectedDeliverables,
            Label : '{i18n>Expected Deliverables}',
        },
        {
            $Type : 'UI.DataField',
            Value : sapbenefits,
            Label : '{i18n>SAP Benefits}',
        },
        {
            $Type : 'UI.DataField',
            Value : lobHead,
            Label : '{i18n>LOB Head}',
        },
        {
            $Type : 'UI.DataField',
            Value : lobName,
            Label : '{i18n>LOB Name}',
        },
        {
            $Type : 'UI.DataField',
            Value : mentorName,
            Label : '{i18n>Mentor Name}',
        },
        {
            $Type : 'UI.DataField',
            Value : projectOwnerName,
            Label : '{i18n>Project Owner Name}',
        },
    ]
);


annotate service.SprintData with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : sprintround,
            Label : '{i18n>Sprint Round}',
        },  
        {
            $Type : 'UI.DataField',
            Value : projectname.projectname, 
            Label : '{i18n>Project Name}',
        },
        {
            $Type : 'UI.DataField',
            Value : problemStatement,
            Label : '{i18n>Problem Statement}',
        },
        {
            $Type : 'UI.DataField',
            Value : presentationPoints,
            Label : '{i18n>Presentation Points}',
        },
        {
            $Type : 'UI.DataField',
            Value : solutionSpace,
            Label : '{i18n>Solution Space}',
        },
        {
            $Type : 'UI.DataField',
            Value : execution,
            Label : '{i18n>Execution}',
        },
        {
            $Type : 'UI.DataField',
            Value : approachToSolveProblem,
            Label : '{i18n>Approach to Solve Problem}',
        },
        {
            $Type : 'UI.DataField',
            Value : comments,
            Label : '{i18n>Comments}',
        },
    ]
);
