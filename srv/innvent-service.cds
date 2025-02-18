using innvent from '../db/schema';
service innventService @(path:'/innventdata')  {
     @(restrict: [
        { grant: ['READ'], to: 'adminAccess' },
        {grant: ['WRITE']},
        {grant: ['READ'], to: 'evaluatorAccess'},
    ])
    entity Projects as projection on innvent.Projects 
     @(restrict: [
        { grant: ['READ'], to: 'adminAccess' },
         {grant: ['WRITE']}
    ]) 
    entity Scholars as projection on innvent.Scholars;
    entity ScholarSkills  as projection on innvent.ScholarSkills;
    entity Skills as projection on innvent.Skills;    
     @(restrict: [
        { grant: ['WRITE'], to: 'evaluatorAccess' },
        { grant: ['READ'], to: 'adminAccess' },
    ])
    entity SprintData as projection on innvent.SprintData;
}