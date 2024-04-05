

//alert ('Welcome to Muni.');
let golfers = [
  { name: "Tommy", handicap: 24, besCourse: "Silverbell" },
  { name: "Kyle", handicap: 7, bestCourse: "Randolph North" },
  { name: "Jeff", handicap: 11, bestCourse: "Dell Urich" },
  { name: "Trevor", handicap: 22, bestCourse: "Fred Enke" },
  { name: "Charlie", handicap: 15, bestCourse: "El Rio" },
  { name: "Justin", handicap: 20, bestCourse: "Randolph North" }
];
for (let i = 0; i<golfers.length; i++){
  if (golfers[i].handicap <8 ){
    document.write (golfers[i].name + "'s in a group of 5% that break 80");
  } if (golfers[i].handicap >8 && golfers[i].handicap <18){
  document.write (golfers[i].name + "'s in a group of 25% that break 90");
  } if(golfers[i].handicap <28 &&golfers[i].handicap >18){
    document.write (golfers[i].name + "'s in a group of 50% that break 100")
  }
}

//LOWEST SCORES PAGE

//Fred Enke
let lowestscorefred = "Today's Lowest Score on Fred Enke: ";
(lowestscorefred)

let fredscore = ''
let fredpar = 72
if (fredscore == false) {
('No Scores Posted Today')
}
if (fredscore > fredpar) {
("+", fredscore - fredpar)
}
else if ((fredscore < fredpar) && (fredscore !== ''))//this is a chained condiion when "fredscore" is not ' '
{
(fredscore - fredpar)
}

//Randolph North
let lowestscorerandolph = "Today's Lowest Score on Randolph North: ";
(lowestscorerandolph)

let randolphscore = ''
let randolphpar = 72
if (randolphscore == false) {
('No Scores Posted Today')
}
if (randolphscore > randolphpar) {
("+", randolphscore - randolphpar)
}
else if ((randolphscore < randolphpar) && (randolphscore !== '')) {
(randolphscore - randolphpar)};
  
