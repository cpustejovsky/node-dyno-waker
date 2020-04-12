const axios = require("axios");
const moment = require("moment");

const isWakeTime = () => {
  let now = moment();
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

const dynoWaker = async () => {
  if (isWakeTime()) {
    console.log(`Hitting dynos at ${moment().format("h:mm A")}`);
    try {
      await axios.get("https://cpustejovsky-estuary.herokuapp.com/");
      console.log("hit estuary");
    } catch (error) {
      console.log(error);
      dynoWaker();
    }
    try {
      await axios.get("https://life-together-calculator.herokuapp.com/");
      console.log("hit life together");
    } catch (error) {
      console.log(error);
      dynoWaker();
    }
    try {
      await axios.get("https://bears-and-bear-markets.herokuapp.com/");
      console.log("hit bears and bear markets");
    } catch (error) {
      console.log(error);
      dynoWaker();
    }
    setTimeout(dynoWaker, 1000 * 60 * 59);
  } else {
    console.log(
      `going to sleep for 59 minutes since it's ${moment().format("h:mm A")}`
    );
    setTimeout(dynoWaker, 1000 * 60 * 59);
  }
};

dynoWaker();
