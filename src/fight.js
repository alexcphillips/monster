const { hitMessage } = require("./msg");
const { sleep, getRandom } = require("./utils");
const { Enemy } = require("./db");

const randomEncounter = async (hero, quantity = 1) => {
  try {
    //return array of random enemy object(s)
    let encounter = [];
    let enemies = await Enemy.find({});
    for (let count = 0; count < quantity; count++) {
      encounter.push(enemies[getRandom(enemies.length)]);
    }
    await sleep(1000);
    console.log(`\n${hero.name} encountered a ${enemies[0].name}!\n`);
    console.log(encounter);
    return encounter;
  } catch (err) {
    console.log(err);
  }
};

const isDead = (character) => {
  return character.hp <= 0 && character;
};

const deathCheck = async (defender, attacker) => {
  const deadChar = isDead(defender) || isDead(attacker);
  if (!deadChar) return;
  await sleep(1000);
  deadChar.isHero
    ? console.log("You died!")
    : console.log(`You killed the ${deadChar.name}!`);
  return deadChar;
};

function compareSpeed(a, b) {
  return a.spd - b.spd;
}

const getTurnOrder = (hero, enemy) => {
  //returns array of highest speed value to lowest
  let turnOrder = [hero, enemy];
  return turnOrder.sort(compareSpeed).reverse();
};

const heroTurn = () => {
  const { result, numbers } = numberedOptions("Fight", "Items", "Run");
  question({ q: result, acceptableOptions: [...numbers] });
  const questionOpts = {
    what,
    acceptableOptions
  };
  let choice = question(questionOpts);
  if (!choiceValidator(choice, acceptableOptions)) {
    console.log(`Invalid input. ${acceptableOptions.join(", ")} only`);
    heroTurn();
  }
  return choice;
};

const battleRound = async (turnOrder) => {
  const [attacker, defender] = turnOrder;
  defender.hp -= attacker.atk;
  const deadChar = await deathCheck(defender, attacker);
  if (deadChar) {
    return deadChar;
  }
  await hitMessage(defender, attacker);
  turnOrder.reverse();
  return;
};

const fight = async (hero) => {
  let deadChar;
  while (!deadChar || (deadChar && !deadChar.isHero)) {
    deadChar = undefined;
    let enemy = await randomEncounter(hero);
    console.log(hero);
    let turnOrder = getTurnOrder(hero, enemy[0]);

    while (!deadChar) {
      deadChar = await battleRound(turnOrder);
    }
  }
};

module.exports = { fight };
