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

const fetchBitcoinMarketChart = async () => {
  const coingeckoAPIKey = "CG-fn1QNCfAnMAB4yccJY3J5raa";

  const coins_url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

  const options = {
    method: "GET",
    headers: {
      "x-cg-demo-api-key": "CG-fn1QNCfAnMAB4yccJY3J5raa",
    },
  };

  fetch(coins_url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const getData1 = () => {
        data.slice(0, 25).forEach((coin) => {
          var currentDate = new Date();
          var currentTimestamp = Math.floor(currentDate.getTime() / 1000);
          var targetTimestamp = currentTimestamp - 3600;
          const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range?vs_currency=usd&from=${targetTimestamp}&to=${currentTimestamp}&precision=2`;

          fetch(url, {
            method: "GET",
            headers: {
              "x-cg-demo-api-key": "CG-fn1QNCfAnMAB4yccJY3J5raa",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Network response was not ok: ${response.status}`
                );
              }
              return response.json();
            })
            .then((data) => {
              let pprice = data.prices[0][1];
              let nprice = data.prices[data.prices.length - 1][1];

              let percent = ((nprice - pprice) / pprice) * 100;

              if (percent > 0.001) {
                bot.sendMessage(
                  "821331693",
                  `${coin.name} is currently up ${percent}`
                );
                console.log(coin.name, coin.current_price, percent.toFixed(2));
              } else {
                if (percent < 0.001) {
                  bot.sendMessage(
                    "821331693",
                    `${coin.name} is currently down ${percent}`
                  );
                  console.log(
                    coin.name,
                    coin.current_price,
                    percent.toFixed(2)
                  );
                } else {
                  return;
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      };

      getData1();

      const getData2 = () => {
        data.slice(25, 50).forEach((coin) => {
          var currentDate = new Date();
          var currentTimestamp = Math.floor(currentDate.getTime() / 1000);
          var targetTimestamp = currentTimestamp - 3600;
          const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range?vs_currency=usd&from=${targetTimestamp}&to=${currentTimestamp}&precision=2`;

          fetch(url, {
            method: "GET",
            headers: {
              "x-cg-demo-api-key": "CG-fn1QNCfAnMAB4yccJY3J5raa",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Network response was not ok: ${response.status}`
                );
              }
              return response.json();
            })
            .then((data) => {
              let pprice = data.prices[0][1];
              let nprice = data.prices[data.prices.length - 1][1];

              let percent = ((nprice - pprice) / pprice) * 100;

              if (percent > 0.001) {
                bot.sendMessage(
                  "821331693",
                  `${coin.name} is currently up ${percent}`
                );
                console.log(coin.name, coin.current_price, percent.toFixed(2));
              } else {
                if (percent < 0.001) {
                  bot.sendMessage(
                    "821331693",
                    `${coin.name} is currently down ${percent}`
                  );
                  console.log(
                    coin.name,
                    coin.current_price,
                    percent.toFixed(2)
                  );
                } else {
                  return;
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      };

      setTimeout(getData2, 60000);
    })
    .catch((error) => console.error("Fetch error:", error));
};

fetchBitcoinMarketChart();

setInterval(() => {
  fetchBitcoinMarketChart();
}, 20 * 60 * 1000); // 10 minutes interval

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
