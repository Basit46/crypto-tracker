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

app.get("/", async (req, res) => {
  try {
    const { changes, nchanges } = await fetchDetails();
    res.json({ message: "Hello from the server!", changes, nchanges });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const fetchDetails = async () => {
  let changes = {
    percent10: [],
    percent20: [],
    percent30: [],
    percent40: [],
  };
  let nchanges = {
    percent10: [],
    percent20: [],
    percent30: [],
    percent40: [],
  };

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
      {
        method: "GET",
        headers: {
          "x-cg-demo-api-key": "CG-fn1QNCfAnMAB4yccJY3J5raa",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();

    const getData1 = async () => {
      for (const coin of data.slice(0, 25)) {
        const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=90&interval=daily&precision=2`;

        try {
          const chartResponse = await fetch(url, {
            method: "GET",
            headers: {
              "x-cg-demo-api-key": "CG-fn1QNCfAnMAB4yccJY3J5raa",
            },
          });

          if (!chartResponse.ok) {
            throw new Error(
              `Network response was not ok: ${chartResponse.status}`
            );
          }

          const chartData = await chartResponse.json();

          let pprice = chartData.prices[0][1];
          let nprice = chartData.prices[chartData.prices.length - 1][1];

          let percent = ((nprice - pprice) / pprice) * 100;

          switch (true) {
            case percent > 10 && percent < 20:
              changes.percent10.push({
                coin: coin,
                percent: percent,
                nprice: nprice,
              });
              break;
            case percent > 20 && percent < 30:
              changes.percent20.push({
                coin: coin,
                percent: percent,
                nprice: nprice,
              });
              break;
            case percent > 30 && percent < 40:
              changes.percent30.push({
                coin: coin,
                percent: percent,
                nprice: nprice,
              });
              break;
            case percent > 40:
              changes.percent40.push({
                coin: coin,
                percent: percent,
                nprice: nprice,
              });
              break;
            case percent > -20 && percent <= -10:
              nchanges.percent10.push({
                coin: coin,
                percent: percent,
                nprice: nprice,
              });
              break;
            case percent > -30 && percent <= -20:
              nchanges.percent20.push({
                coin: coin,
                percent: percent,
                nprice: nprice,
              });
              break;
            case percent > -40 && percent <= -30:
              nchanges.percent30.push({
                coin: coin,
                percent: percent,
                nprice: nprice,
              });
              break;
            case percent <= -40:
              nchanges.percent20.push({
                coin: coin,
                percent: percent,
                nprice: nprice,
              });
              break;
            default:
              // Handle the default case if needed
              break;
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    await getData1();

    return { changes, nchanges };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// fetchDetails();

// setInterval(() => {
//   fetchDetails();
// }, 30 * 60 * 1000); // 30 minutes interval

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
