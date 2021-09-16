const readlineSync = require("readline-sync");
const enemyList = [
  {
    name: "spider",
    hp: 4,
    atk: 2,
    spd: 3
  },
  // {
  //   name: "noob",
  //   hp: 4,
  //   atk: 2,
  //   spd: 2
  // },
  // {
  //   name: "crab",
  //   hp: 15,
  //   atk: 1,
  //   spd: 1
  // },
  // {
  //   name: "white dragon",
  //   hp: 200,
  //   atk: 20,
  //   spd: 15
  // },
  // {
  //   name: "red dragon",
  //   hp: 160,
  //   atk: 35,
  //   spd: 10
  // },
  // {
  //   name: "green slime",
  //   hp: 6,
  //   atk: 1,
  //   spd: 2
  // },
  // {
  //   name: "blue slime",
  //   hp: 8,
  //   atk: 2,
  //   spd: 2
  // },
  // {
  //   name: "red slime",
  //   hp: 10,
  //   atk: 3,
  //   spd: 3
  // },
  // {
  //   name: "armored slime",
  //   hp: 16,
  //   atk: 4,
  //   spd: 1
  // },
  // {
  //   name: "frenzied slime",
  //   hp: 10,
  //   atk: 5,
  //   spd: 4
  // },
  // {
  //   name: "white dragon",
  //   hp: 200,
  //   atk: 20,
  //   spd: 15
  // },
  // {
  //   name: "skeleton",
  //   hp: 10,
  //   atk: 4,
  //   spd: 3
  // }
];


const hero = {
  isHero: true,
  name: "",
  hp: 10,
  atk: 2,
  spd: 3
};


const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};


const getRandom = (max = 1) => {
  return Math.floor(Math.random() * max);
};


function compareSpeed(a, b) {
  return a.spd - b.spd;
}


const getTurnOrder = (hero, enemy) => {
  //returns array of highest speed value to lowest
  let turnOrder = [hero, enemy];
  return turnOrder.sort(compareSpeed).reverse();
}


const randomDestroyerVerb = () => {
  const words = [
    "plundered",
    "slapped",
    "bonked",
    "clobbered",
    "squished",
    "squandered"
  ];
  return words[getRandom(words.length)];
};


const randomEncounter = async (quantity = 1) => {
  //return array of random enemy object(s)
  let count = 0;
  let enemies = [];

  while(count < quantity) {
    enemies.push({...enemyList[getRandom(enemyList.length)]});
    count++;
  }
  await sleep(1000);
  console.log(`\n${hero.name} encountered a ${enemies[0].name}!\n`);
  return enemies;
};


const hitMessage = async (defender, attacker) => {
  await sleep(1000)
  console.log(`${attacker.name} hit ${defender.name} for (${attacker.atk})dmg! [${defender.name} has (${defender.hp})hp].\n` )
}


const deathCheck = async (defender, attacker) => {
  let heroDied = false;
  let enemyDied = false;


  if(defender.isHero && defender.hp <= 0) {
    await sleep(1000);
    console.log(`${defender.name} was ${randomDestroyerVerb()} by ${attacker.name}! [${defender.name} has (0)hp].\n`)
    console.log('You Died!')

    heroDied = true;
    return { heroDied, enemyDied };

  }
  if(defender.hp <= 0) {
    await sleep(1000);
    console.log(`    < ${attacker.name} killed the ${defender.name}! >`)

    enemyDied = true;
    return { heroDied, enemyDied };
  }
  return { heroDied, enemyDied }
}


const battleRound = async (turnOrder) => {
  const [ attacker, defender ] = turnOrder;
  defender.hp -= attacker.atk;
  let { heroDied, enemyDied } = await deathCheck(defender, attacker);
  if(heroDied || enemyDied) {
    return { heroDied, enemyDied };
  }

  await hitMessage(defender, attacker);
  turnOrder.reverse();
  return {};
}


const fight = async () => {
  //sort enemies into array by speed and save to turns variable
  let heroDied = false;

  while(!heroDied) {
    await sleep(2000)
    let enemy = await randomEncounter();
    let turnOrder = getTurnOrder(hero, enemy[0]);
    let enemyDied = false;

    while(!enemyDied && !heroDied) {
      ({ heroDied, enemyDied } = await battleRound(turnOrder));
    }
  }
}


const namePrompt = () => {
   const initName = '~~~'//readlineSync.question("This is the tale of...: ");
  hero.name = !initName ? 'Noob' : initName.toLowerCase() === 'alex' ? 'Isaac\'s Best Friend' : initName
}

module.exports = { hero, enemyList, sleep, getRandom, getTurnOrder, randomDestroyerVerb, randomEncounter, fight, namePrompt };
