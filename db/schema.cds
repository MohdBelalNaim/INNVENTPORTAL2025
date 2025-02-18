namespace innvent;

using {
  managed,
  cuid
} from '@sap/cds/common';

entity Projects : managed {
  key projectname          : String;
      problemstatement     : String;
      overallefforts       : Integer;
      setup                : String;
      prerequisites        : String;
      expectedDeliverables : String;
      sapbenefits          : String;
      lobHead              : String;
      lobName              : String;
      mentorName           : String;
      projectOwnerName     : String;
      technologies         : String;
};

entity ProjectFormSkills {
  key projectSkill_id : Integer @cds.auto;
      project_id      : Association to Projects;
      skill_id        : Association to Skills;
}

entity Skills {
  key skill_id : Integer @cds.auto;
      skill    : String;
}

entity Scholars {
  key inumber : String;
      name    : String;
      email   : String;
      skills  : LargeString;
      mobile  : String;
      batch   : String;
}

entity ScholarSkills {
  key scholarSkill_id : Integer @cds.auto;
      scholar_id      : Association to Scholars;
      skill_id        : Association to Skills;

      level           : String enum {
        Beginner;
        Intermediate;
        Expert;
      };
}

entity SprintData: cuid  {
  sprintround            : String;
  projectname            : Association to Projects;
  problemStatement       : Integer;
  presentationPoints     : Integer;
  solutionSpace          : Integer;
  execution              : Integer;
  approachToSolveProblem : Integer;
  comments:String;
}
