

//alert ('Welcome to Muni.');
let maleGolfers = [
  { name: "Tommy", handicap: 24, besCourse: "Silverbell" },
  { name: "Kyle", handicap: 7, bestCourse: "Randolph North" },
  { name: "Jeff", handicap: 11, bestCourse: "Dell Urich" },
  { name: "Trevor", handicap: 22, bestCourse: "Fred Enke" },
  { name: "Charlie", handicap: 15, bestCourse: "El Rio" },
  { name: "Justin", handicap: 20, bestCourse: "Randolph North" }
];

let femaleGolfers = [
  { name: "Sofia", handicap: 24, besCourse: "Silverbell" },
  { name: "Rachel", handicap: 7, bestCourse: "Randolph North" },
  { name: "Emily", handicap: 11, bestCourse: "Dell Urich" },
  { name: "Tracy", handicap: 22, bestCourse: "Fred Enke" },

]

function handicapPercentages(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].handicap < 8) {
      document.write(list[i].name + "'s in a group of 5% that break 80");
    } if (list[i].handicap > 8 && list[i].handicap < 18) {
      document.write(list[i].name + "'s in a group of 25% that break 90");
    } if (list[i].handicap < 28 && list[i].handicap > 18) {
      document.write(list[i].name + "'s in a group of 50% that break 100")
    }
  }
}
document.write; handicapPercentages(maleGolfers);
document.write; handicapPercentages(femaleGolfers);

/* FOR THE CODE ABOVE....Initialization (let i=0) ; Condition i<golfers.length ; Action ; i++ which is i=i+1
so...initialization starts the loop, condition is checked, THEN THE {} code runs, the action*/

//LOWEST SCORES PAGE

//Fred Enke these scores will need to be generated from funtions with a return when possible.

let fredScore = 80
let randolphScore=76
let delScore= 68
let silverbellScore= 93
let elrioScore= 100

function lowestScore72(course) {
  let par = 72
  if (course == false) {
    document.write('No Scores Posted Today')
  }
  if (course > par) {
    document.write("+", course - par)
  }
  else if ((course < par) && (course !== ''))//this is a chained condiion when "fredscore" is not ' '
  {
    document.write(course - par)
  }

}
function lowestScore70(course) {
  let par = 70
  if (course == false) {
    document.write('No Scores Posted Today')
  }
  if (course > par) {
    document.write("+", course - par)
  }
  else if ((course < par) && (course !== ''))//this is a chained condiion when "fredscore" is not ' '
  {
    document.write(course - par)
  }

}
document.write ("Lowest score of the day: ") + lowestScore72(fredScore)
document.write ("Lowest score of the day: ") + lowestScore72(randolphScore)
document.write ("Lowest score of the day: ") + lowestScore70(delScore)
document.write ("Lowest score of the day: ") + lowestScore70(silverbellScore)
document.write ("Lowest score of the day: ") + lowestScore70(elrioScore)
