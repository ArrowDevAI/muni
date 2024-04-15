

//alert ('Welcome to Muni.');

//Need to define Handicap and Best Course Algorithm 

//Course arrays : 


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


courseRepo.getCourses().forEach (function(course){
courseRepo.addListItem(course)
 });


let maleGolfersRepo = (function (){
  
  let maleGolfers = [
  { name: "Tommy", handicap: 24, bestCourse: "Silverbell" },
  { name: "Kyle", handicap: 7, bestCourse: "Randolph North" },
  { name: "Jeff", handicap: 11, bestCourse: "Dell Urich" },
  { name: "Trevor", handicap: 22, bestCourse: "Fred Enke" },
  { name: "Charlie", handicap: 15, bestCourse: "El Rio" },
  { name: "Justin", handicap: 20, bestCourse: "Randolph North" }
  ];
function getMaleGolfers (){
return maleGolfers;
}
function add(golfer) {
maleGolfers.push (golfer);
}
return {
  getMaleGolfers: getMaleGolfers,
  add: add
}

})()

let femaleGolfersRepo= (function() {

let femaleGolfers = [
  { name: "Sofia", handicap: 24, besCourse: "Silverbell" },
  { name: "Rachel", handicap: 7, bestCourse: "Randolph North" },
  { name: "Emily", handicap: 11, bestCourse: "Dell Urich" },
  { name: "Tracy", handicap: 22, bestCourse: "Fred Enke" },
];
 function getFemaleGolfers(){
  return femaleGolfers;
 }
 function add (golfer) {
  femaleGolfers.push (golfer);
 }

return {
  add: add,
  getFemaleGolfers: getFemaleGolfers
} 
})();


//functions will need to be generated from these variable with a return of the highest score logged, respectively

let fredScore = 20
let randolphScore = 68
let delScore = 63
let silverbellScore = 65
let elrioScore = 78

function lowestScore(par, course) {
  if (isNaN(course)) {
    return ('No Scores Posted Today');
  }
  else if (course > par) {
    return "Lowest Score: +" + (course - par);
  }
  else if (course === par) {
    return "Lowest Score: Even Par"
  }
  else if ((course < par) && (course !== ''))//this is a chained condiion when "fredscore" is not ' '
  {
    return "Lowest Score: " + (course - par);
  }
  if (course === '') {
    return "No Scores Posted Today"
  }
}

let fredLow = lowestScore(72, fredScore)
let elrioLow = lowestScore(70, elrioScore)
let delLow = lowestScore(70, delScore)
let randolphLow = lowestScore(72, randolphScore)
let silverbellLow = lowestScore(70, silverbellScore)
/*console.log (fredLow)
  console.log (randolphLow)
  console.log (silverbellLow)
  console.log (delLow)
  console.log (elrioLow) */

/* femaleGolfers.forEach(function (user) {
console.log(user.name + ' has a handicap of ' + user.handicap);
});  /*In this forEach() method the anonymous funtion is iterated over each item in the array there can only be one
  parameter and in this case it is "user"*/ 


function handicapPercentages(list) {
  let messages = [];

  list.forEach(function(player) {
    if (player.handicap < 8) {
      messages.push(player.name + "'s in a group of 5% that break 80");
    } else if (player.handicap >= 8 && player.handicap < 18) {
      messages.push(player.name + "'s in a group of 25% that break 90");
    } else if (player.handicap >= 18 && player.handicap < 28) {
      messages.push(player.name + "'s in a group of 50% that break 100");
    }
  });

  return messages;
}



(maleGolfersRepo.getMaleGolfers()).forEach (function(golfer) {
  //console.log(golfer)
});



(femaleGolfersRepo.getFemaleGolfers()).forEach(function(golfer){
  //console.log (golfer)
});

