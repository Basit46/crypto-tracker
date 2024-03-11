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

const fetchDetails2 = async () => {
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

    const formattedTable1 = `
10% High
----------------------
Coin | Price | ATH | 90 Days change %
--------------------------------------------
${changes.percent10
  .map(
    (row) =>
      `${row.coin.name} | ${row.coin.current_price} | ${
        row.coin.ath
      } | ${row.percent.toFixed(2)}%`
  )
  .join("\n")}
`;

    bot.sendMessage("821331693", formattedTable1, { parse_mode: "Markdown" });

    const formattedTable2 = `
20% High
----------------------
Coin | Price | ATH | 90 Days change %
--------------------------------------------
${changes.percent20
  .map(
    (row) =>
      `${row.coin.name} | ${row.coin.current_price} | ${
        row.coin.ath
      } | ${row.percent.toFixed(2)}%`
  )
  .join("\n")}
`;

    bot.sendMessage("821331693", formattedTable2, { parse_mode: "Markdown" });

    const formattedTable3 = `
    30% High
----------------------
Coin | Price | ATH | 90 Days change %
--------------------------------------------
${changes.percent30
  .map(
    (row) =>
      `${row.coin.name} | ${row.coin.current_price} | ${
        row.coin.ath
      } | ${row.percent.toFixed(2)}%`
  )
  .join("\n")}
`;

    bot.sendMessage("821331693", formattedTable3, { parse_mode: "Markdown" });

    const formattedTable4 = `
    40% High
----------------------
Coin | Price | ATH | 90 Days change %
--------------------------------------------
${changes.percent40
  .map(
    (row) =>
      `${row.coin.name} | ${row.coin.current_price} | ${
        row.coin.ath
      } | ${row.percent.toFixed(2)}%`
  )
  .join("\n")}
`;

    bot.sendMessage("821331693", formattedTable4, { parse_mode: "Markdown" });

    const formattedTable5 = `
10% Dip
----------------------
Coin | Price | ATH | 90 Days change %
--------------------------------------------
${nchanges.percent10
  .map(
    (row) =>
      `${row.coin.name} | ${row.coin.current_price} | ${
        row.coin.ath
      } | ${row.percent.toFixed(2)}%`
  )
  .join("\n")}
`;

    bot.sendMessage("821331693", formattedTable5, { parse_mode: "Markdown" });

    const formattedTable6 = `
20% Dip
----------------------
Coin | Price | ATH | 90 Days change %
--------------------------------------------
${nchanges.percent20
  .map(
    (row) =>
      `${row.coin.name} | ${row.coin.current_price} | ${
        row.coin.ath
      } | ${row.percent.toFixed(2)}%`
  )
  .join("\n")}
`;

    bot.sendMessage("821331693", formattedTable6, { parse_mode: "Markdown" });

    const formattedTable7 = `
30% Dip
----------------------
Coin | Price | ATH | 90 Days change %
--------------------------------------------
${nchanges.percent30
  .map(
    (row) =>
      `${row.coin.name} | ${row.coin.current_price} | ${
        row.coin.ath
      } | ${row.percent.toFixed(2)}%`
  )
  .join("\n")}
`;

    bot.sendMessage("821331693", formattedTable7, { parse_mode: "Markdown" });

    const formattedTable8 = `
40% Dip
----------------------
Coin | Price | ATH | 90 Days change %
--------------------------------------------
${nchanges.percent40
  .map(
    (row) =>
      `${row.coin.name} | ${row.coin.current_price} | ${
        row.coin.ath
      } | ${row.percent.toFixed(2)}%`
  )
  .join("\n")}
`;

    bot.sendMessage("821331693", formattedTable8, { parse_mode: "Markdown" });

    return { changes, nchanges };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

fetchDetails2();

setInterval(fetchDetails2, 120000);

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
