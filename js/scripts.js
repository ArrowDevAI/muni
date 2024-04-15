

//alert ('Welcome to Muni.');

//Need to define Handicap and Best Course Algorithm 

//Course arrays : 
let coursesRepo = (function (){
  let courseFredArray = [
    { name: "Hole 1", Par: 4 },
    { name: "Hole 2", Par: 5 },
    { name: "Hole 3", Par: 3 },
    { name: "Hole 4", Par: 4 },
    { name: "Hole 5", Par: 4 },
    { name: "Hole 6", Par: 3 },
    { name: "Hole 7", Par: 4 },
    { name: "Hole 8", Par: 4 },
    { name: "Hole 9", Par: 5 },
    { name: "Hole 10", Par: 4 },
    { name: "Hole 11", Par: 3 },
    { name: "Hole 12", Par: 5 },
    { name: "Hole 13", Par: 4 },
    { name: "Hole 14", Par: 5 },
    { name: "Hole 15", Par: 3 },
    { name: "Hole 16", Par: 4 },
    { name: "Hole 17", Par: 4 },
    { name: "Hole 18", Par: 4 },
  ];
  let courseElrioArray = [
    { name: "Hole 1", Par: 4 },
    { name: "Hole 2", Par: 4 },
    { name: "Hole 3", Par: 4 },
    { name: "Hole 4", Par: 3 },
    { name: "Hole 5", Par: 4 },
    { name: "Hole 6", Par: 3 },
    { name: "Hole 7", Par: 4 },
    { name: "Hole 8", Par: 4 },
    { name: "Hole 9", Par: 5 },
    { name: "Hole 10", Par: 4 },
    { name: "Hole 11", Par: 4 },
    { name: "Hole 12", Par: 4 },
    { name: "Hole 13", Par: 3 },
    { name: "Hole 14", Par: 4 },
    { name: "Hole 15", Par: 4 },
    { name: "Hole 16", Par: 4 },
    { name: "Hole 17", Par: 3 },
    { name: "Hole 18", Par: 5 },
  ];
  let courseRandolphArray = [
    { name: "Hole 1", Par: 4 },
    { name: "Hole 2", Par: 4 },
    { name: "Hole 3", Par: 5 },
    { name: "Hole 4", Par: 4 },
    { name: "Hole 5", Par: 4 },
    { name: "Hole 6", Par: 3 },
    { name: "Hole 7", Par: 4 },
    { name: "Hole 8", Par: 3 },
    { name: "Hole 9", Par: 5 },
    { name: "Hole 10", Par: 4 },
    { name: "Hole 11", Par: 3 },
    { name: "Hole 12", Par: 4 },
    { name: "Hole 13", Par: 5 },
    { name: "Hole 14", Par: 4 },
    { name: "Hole 15", Par: 3 },
    { name: "Hole 16", Par: 5 },
    { name: "Hole 17", Par: 4 },
    { name: "Hole 18", Par: 4 },
  ];
  let courseDelArray = [
    { name: "Hole 1", Par: 4 },
    { name: "Hole 2", Par: 3 },
    { name: "Hole 3", Par: 5 },
    { name: "Hole 4", Par: 4 },
    { name: "Hole 5", Par: 3 },
    { name: "Hole 6", Par: 5 },
    { name: "Hole 7", Par: 4 },
    { name: "Hole 8", Par: 4 },
    { name: "Hole 9", Par: 3 },
    { name: "Hole 10", Par: 4 },
    { name: "Hole 11", Par: 3 },
    { name: "Hole 12", Par: 4 },
    { name: "Hole 13", Par: 5 },
    { name: "Hole 14", Par: 4 },
    { name: "Hole 15", Par: 4 },
    { name: "Hole 16", Par: 4 },
    { name: "Hole 17", Par: 3 },
    { name: "Hole 18", Par: 4 },
  ];
  let courseSilverbellArray = [
    { name: "Hole 1", Par: 4 },
    { name: "Hole 2", Par: 5 },
    { name: "Hole 3", Par: 3 },
    { name: "Hole 4", Par: 4 },
    { name: "Hole 5", Par: 4 },
    { name: "Hole 6", Par: 3 },
    { name: "Hole 7", Par: 5 },
    { name: "Hole 8", Par: 4 },
    { name: "Hole 9", Par: 3 },
    { name: "Hole 10", Par: 4 },
    { name: "Hole 11", Par: 4 },
    { name: "Hole 12", Par: 3 },
    { name: "Hole 13", Par: 4 },
    { name: "Hole 14", Par: 4 },
    { name: "Hole 15", Par: 4 },
    { name: "Hole 16", Par: 3 },
    { name: "Hole 17", Par: 4 },
    { name: "Hole 18", Par: 5 },
  ];

let courses = [{name: "El Rio", holes:courseElrioArray}, 
{name: "Randolph North", holes: courseRandolphArray}, 
{name: "Fred Enke", holes: courseFredArray},
{name: "Del Urich", holes: courseDelArray},
{name: "Silverbell", holes: courseSilverbellArray}];


function getCourses(){
return courses;
}
function addCourse(newCourse){
  courses.push(newCourse)
}
function addListItem(course) {
let courseList= document.querySelector(".courseList")
let listCourse = document.createElement("li");
let button= document.createElement("button");
button.innerText=course.name
button.classList.add('button-class');
listCourse.appendChild(button);
courseList.appendChild(listCourse);
}

return {
  addCourse: addCourse,
  getCourses:getCourses,
  addListItem:addListItem
}
})();


coursesRepo.getCourses().forEach (function(course){
coursesRepo.addListItem(course)
 });


function handicapPercentages(list) {
  let handicapList = [];

  list.forEach(function(player) {
    if (player.handicap < 8) {
      handicapList.push(player.name + "'s in a group of 5% that break 80");
    } else if (player.handicap >= 8 && player.handicap < 18) {
      handicapList.push(player.name + "'s in a group of 25% that break 90");
    } else if (player.handicap >= 18 && player.handicap < 28) {
      handicapList.push(player.name + "'s in a group of 50% that break 100");
    }
  });

  return handicapList;
}



(maleGolfersRepo.getMaleGolfers()).forEach (function(golfer){
});



(femaleGolfersRepo.getFemaleGolfers()).forEach(function(golfer){

});


