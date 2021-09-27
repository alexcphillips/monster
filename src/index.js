const { fight } = require("./fight");
const { namePrompt, playAgain } = require("./msg");
require("./routes");
const { hero } = require("./hero");
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

const init = async () => {
  const { db } = require("./db");

  await db();
  start();
};
const start = async (name) => {
  const newHero = { ...hero };
  if (!name) {
    name = namePrompt();
    if (!name) {
      throw new Error("namePrompt didnt return a name");
    }
  }
  newHero.name = name;
  await fight(newHero);
  if (playAgain()) {
    console.log(`${name} was revived`);
    start(name);
  } else {
    console.log(`And ${name}'s soul was turned to ashes...`);
  }
};

init();
