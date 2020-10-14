import axios from "axios";
import moment from "moment";
import "moment-timezone";

const isWakeTime = (timezone: string) => {
  let hr = Number(moment().tz(timezone).format("HH"))
  return hr >= 6 && hr <= 21;
};

const wakeDyno = async(url: string, timezone: string) => {
  try {
    await axios.get(url);
    console.log(`hit ${url} at ${moment().tz(timezone).format("h:mm A")}`);
  } catch (error) {
    console.log(error);
    console.log("waiting ~5s and trying again");
    setTimeout(wakeDyno, 5000, url);
  }
}

const wakeDynos = async (timezone: string, urls: string[]) => {
  if (isWakeTime(timezone)) {
    for (let i = 0; i < urls.length; i++) {
      wakeDyno(urls[i], timezone)
    }
  } else {
    console.log(
      `going to sleep for 30 minutes since it's ${moment()
        .tz(timezone)
        .format("h:mm A")}`
    );
  }
};

export default async function Wake(
  timezone: string = "America/New_York",
  args: string[]
) {
  let urls: string[] = args.map((pre) => `https://${pre}.herokuapp.com/`);
  wakeDynos(timezone, urls);
  setInterval(wakeDynos, 1000 * 60 * 30, timezone, urls);
}
