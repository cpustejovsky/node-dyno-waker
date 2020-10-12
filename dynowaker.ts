import axios from "axios";
import moment from "moment";
import "moment-timezone";

const isWakeTime = () => {
  let now = moment().tz("America/New_York");
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

const wakeDyno = async (urlPrefix: string) => {
  try {
    await axios.get(`https://${urlPrefix}.herokuapp.com/`);
    console.log(`hit ${urlPrefix}`);
  } catch (error) {
    console.log(error);
    console.log("waiting ~5s and trying again");
    setTimeout(wakeDyno, 5000, urlPrefix);
  }
};

async function asyncForEach(
  array: string[],
  callback: (arg0: string) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}

export default async function dynoWaker(...args: string[]) {
  if (isWakeTime()) {
    console.log(
      `Hitting dynos at ${moment().tz("America/New_York").format("h:mm A")}`
    );
    await asyncForEach(args, wakeDyno);
    setTimeout(dynoWaker, 1000 * 60 * 30, ...args);
    console.log(
      `Finished hitting dynos at ${moment()
        .tz("America/New_York")
        .format("h:mm A")}`
    );
  } else {
    console.log(
      `going to sleep for 30 minutes since it's ${moment()
        .tz("America/New_York")
        .format("h:mm A")}`
    );
    setTimeout(dynoWaker, 1000 * 60 * 30, ...args);
  }
}
