const readlineSync = require("readline-sync");
const { getRandom, sleep } = require("./utils");
const { hero } = require("./hero");

if (!hero) {
  throw new Error("Hero is not defined");
}
const isaacCheck = (name, insist) => {
  if (insist) {
    console.log("Okay, if you're sure...");
    hero.name = name;
    return;
  }
  if (name.toLowerCase().trim() === "isaac") {
    console.log("Name too weak! Try again.");
    namePrompt(true);
  }
};

const namePrompt = (insist) => {
  const initName = question({
    q: "This is the tale of...: ",
    unacceptableOptions: ["isaac", "alex", ""]
  });
  hero.name = !initName
    ? "Noob"
    : initName.toLowerCase() === "alex"
    ? "Isaac's Best Friend"
    : initName;
  isaacCheck(initName, insist);
  return hero.name;
};

const question = (opts) => {
  const { q, acceptableOptions, unacceptableOptions } = opts;
  if (!q) {
    throw new Error(
      `Missing question content in opts. ${JSON.stringify(opts)}`
    );
  }
  let choice = readlineSync.question(q);
  if (acceptableOptions && !acceptableOptions.includes(choice)) {
    console.log("try again");
    return question(opts);
  }
  return choice;
};

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

const numberedOptions = (...options) => {
  let holderArray = [];
  let dashes = "";
  let result;
  let numbers = [];
  for (let i = 1; i < options.length + 1; i++) {
    let numberPart = `\n(${i})`;
    numbers.push(String(i));
    if (i > 1) {
      dashes += "-";
    }
    holderArray.push(`${numberPart}${dashes}> ${options[i - 1]}`);
    result = holderArray.join("");
  }
  result += `\n\nWhat do you do? [${numbers.join(", ")}]: `;
  return { result, numbers };
};

const hitMessage = async (defender, attacker) => {
  await sleep(1000);
  console.log(
    `${attacker.name} hit ${defender.name} for (${attacker.atk})dmg! [${defender.name} has (${defender.hp})hp].\n`
  );
};

const playAgain = () => {
  const choice = question({
    q: "Would you like to play agian? [Y/N]",
    acceptableOptions: ["Y", "N", "y", "n"]
  });
  if (choice.toLowerCase() === "y") {
    return true;
  }
  return false;
};

module.exports = {
  playAgain,
  namePrompt,
  randomDestroyerVerb,
  question,
  numberedOptions,
  hitMessage
};
