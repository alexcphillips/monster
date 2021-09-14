const readlineSync = require("readline-sync");
const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const hero = {
  name: "",
  hp: 10,
  atk: 2,
  spd: 3
};

const enemies = [
  {
    name: "spider",
    hp: 4,
    atk: 2,
    spd: 1
  },
  {
    name: "crab",
    hp: 15,
    atk: 1,
    spd: 1
  },
  {
    name: "white dragon",
    hp: 200,
    atk: 20,
    spd: 15
  }
];

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

const getRandom = (max = 1) => {
  return Math.floor(Math.random() * max);
};

// const encounter = (name, quantity = "a") => {
//   let count = 0;
//   let newEncounter = [];
//   while (count < quantity) {
//     newEncounter.push(enemies.find((enemy) => enemy.name === name));
//     count++;
//   } //encounter specific

//   quantity = quantity === 1 ? "a" : quantity;
//   let plural = quantity > 1 ? "s" : "";
//   console.log(newEncounter);
//   console.log(`fighting ${quantity} ${name}${plural}!`);
// };

const randomEncounter = () => {
  const enemy = enemies[getRandom(enemies.length)];
  return enemy;
};

const start = async () => {
  hero.name = readlineSync.question("This is the tale of...: ");
  const enemy = randomEncounter();
  let { name: hName, hp: hHP, atk: hATK, spd: hSPD } = hero;
  let { name: eName, hp: eHP, atk: eATK, spd: eSPD } = enemy;
  await sleep(1000);

  console.log(`\nEncountered a ${enemy.name}!`);
  await sleep(1000);
  let heroDied = false;
  let enemyDied = false;
  while (!heroDied) {
    console.log("\n");

    //hero hits enemy
    eHP -= hATK;
    if (eHP <= 0) {
      console.log(
        `${eName} was hit by ${hName} for (${hATK}) damage ~0 hp remaining`
      );
      break;
    }
    console.log(
      `${eName} was hit by ${hName} for (${hATK}) dmg. ~${eHP} hp remaining\n`
    );
    await sleep(1000);

    //enemy hits hero
    hHP -= eATK;
    if (hHP <= 0) {
      console.log(
        `${hName} was ${randomDestroyerVerb()} by ${eName} for ${eATK}dmg. ~0 hp remaining\n${hName} died to the ${eName}.\n`
      );
      break;
    }
    console.log(
      `${hName} was ${randomDestroyerVerb()} by ${eName} for ${eATK} damage. ~${hHP} hp remaining/n ${hName} killed the ${eName}`
    );
    await sleep(1000);
  }
};

start();
