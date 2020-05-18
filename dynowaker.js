const axios = require("axios");
const moment = require("moment");
const tz = require("moment-timezone")

const isWakeTime = () => {
  let now = moment().tz('America/New_York');
  let hoursAM = [6, 7, 8, 9, 10, 11];
  let hoursPM = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let isWakeAM =
    now.format("A") === "AM" &&
    hoursAM.some((el) => el === Number(now.format("hh")));
  let isWakePM =
    now.format("A") === "PM" &&
    hoursPM.some((el) => el === Number(now.format("hh")));

  return isWakeAM || isWakePM;
};

const wakeDyno = async (urlPrefix) => {
  try {
    await axios.get(`https://${urlPrefix}.herokuapp.com/`);
    console.log(`hit ${urlPrefix}`);
  } catch (error) {
    console.log(error);
    console.log("waiting ~5s and trying again");
    setTimeout(wakeDyno(urlPrefix), 5000);
  }
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const dynoWaker = async (...args) => {
  if (isWakeTime()) {
    console.log(`Hitting dynos at ${moment().tz('America/New_York').format("h:mm A")}`);
    await asyncForEach(args, async (arg) => {
      await wakeDyno(arg);
    });
    setTimeout(dynoWaker, 1000 * 60 * 30);
    console.log(`Finished hitting dynos at ${moment().tz('America/New_York').format("h:mm A")}`);
  } else {
    console.log(
      `going to sleep for 30 minutes since it's ${moment().tz('America/New_York').format("h:mm A")}`
    );
    setTimeout(dynoWaker, 1000 * 60 * 30);
  }
};

module.exports = dynoWaker;