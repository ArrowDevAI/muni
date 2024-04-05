

let golfers = [
  { name: "tommy", handicap: 24, besCourse: "Silverbell" },
  { name: "kyle", handicap: 7, bestCourse: "Randolph North" },
  { name: "jeff", handicap: 11, bestCourse: "Del Urich" },
  { name: "trevor", handicap: 22, bestCourse: "Fred Enke" },
  { name: "charlie", handicap: 15, bestCourse: "El Rio" },
  { name: "justin", handicap: 20, bestCourse: "Randolph North" }
];

//alert ('Welcome to Muni.');

//Fred Enke
let lowestscorefred = "Today's Lowest Score on Fred Enke: ";
document.write(lowestscorefred)

let fredscore = ''
let fredpar = 72
if (fredscore == false) {
  document.write('No Scores Posted Today')
}
if (fredscore > fredpar) {
  document.write("+", fredscore - fredpar)
}
else if ((fredscore < fredpar) && (fredscore !== ''))//this is a chained condiion when "fredscore" is not ' '
{
  document.write(fredscore - fredpar)
}

//Randolph North
let lowestscorerandolph = "Today's Lowest Score on Randolph North: ";
document.write(lowestscorerandolph)

let randolphscore = ''
let randolphpar = 72
if (randolphscore == false) {
  document.write('No Scores Posted Today')
}
if (randolphscore > randolphpar) {
  document.write("+", randolphscore - randolphpar)
}
else if ((randolphscore < randolphpar) && (randolphscore !== '')) {
  document.write(randolphscore - randolphpar)};

  
for (let i = 0; i<golfers.length; i++){
  document.write ((golfers[i].name) + " has a handicap of " + (golfers[i].handicap) + " and their best course is " + 
  (golfers[i].bestCourse))
}