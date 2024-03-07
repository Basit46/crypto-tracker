const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());

const token = "7053002854:AAEK76BHJDEsz-ycDUSu_DxZZNPKQQNKeCs";
const bot = new TelegramBot(token, { polling: true });

app.use(bodyParser.json());

let alerts = [];
console.log(alerts);

app.post("/addAlert", (req, res) => {
  const data = req.body;

  res.json({ message: "Hello from the server!" });

  // Run the function initially

  let mode = data.mode == "up" ? true : false;
  let change = parseFloat(data.change);
  let time = parseFloat(data.time) * 60;

  alerts.push({ id: data.id, time, mode, change });

  fetchBitcoinMarketChart(data.id, time, mode, change);

  // Set up a recurring interval to check the Bitcoin price every 1 minute
  const interval = setInterval(() => {
    fetchBitcoinMarketChart(data.id, time, mode, change);
  }, 60 * 1000);
});

const coingeckoAPIKey = "CG-fn1QNCfAnMAB4yccJY3J5raa";

const fetchBitcoinMarketChart = async (
  coinId,
  interval,
  isUp,
  percentTarget
) => {
  var currentDate = new Date();
  var currentTimestamp = Math.floor(currentDate.getTime() / 1000);
  var targetTimestamp = currentTimestamp - interval;

  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${targetTimestamp}&to=${currentTimestamp}&precision=2`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": coingeckoAPIKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    let pprice = data.prices[0][1];
    let nprice = data.prices[data.prices.length - 1][1];

    let percent = ((nprice - pprice) / pprice) * 100;

    if (isUp) {
      if (percent > percentTarget) {
        bot.sendMessage(
          "821331693",
          `It is up ${percentTarget} and now ${percent}%`
        );
      } else {
        return;
      }
    } else {
      if (percent < percentTarget) {
        bot.sendMessage(
          "821331693",
          `It is down ${percentTarget} and now ${percent}%`
        );
      } else {
        return;
      }
    }
  } catch (error) {
    console.error("Error fetching Bitcoin market chart data:", error.message);
  }
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
