const { hero, enemyList, sleep, getRandom, getTurnOrder, randomDestroyerVerb, randomEncounter, fight, namePrompt } = require('./indexUtils')


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  add level property for enemies and hero
  add xp property for enemies
  enemies give hero xp and level hero up
  levels raise hero base stats
  make enemies drop money like xp but it fills "wallet" and when it's full you cant hold more
  maybe associate enemy levels with levels on a loot table array of objects
  make readline sync table with options such as "continue", "inventory", "shop"
  update random encounter to take level into consideration, a number range around hero level
  //with the level range you will fight crabs at the start instead of white dragons
  make actual turns with readline sync options such as "fight", "run"
  run has higher chance of working when hero has higher hp, low chance when hero has low hp

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


//start from beginning
const start = () => {
  namePrompt()
  fight()
};

start();
