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
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&price_change_percentage=30d&precision=2",
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

    data.forEach((coin) => {
      let percent = coin.price_change_percentage_30d_in_currency;
      let nprice = coin.current_price;
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
    });

    return { changes, nchanges };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const fetchDetails2 = async () => {
  let nchanges = {
    percent10: [],
    percent20: [],
    percent30: [],
    percent40: [],
  };

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&price_change_percentage=30d&precision=2",
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

    data.forEach((coin) => {
      let percent = coin.price_change_percentage_30d_in_currency;
      let nprice = coin.current_price;
      switch (true) {
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
          break;
      }
    });

    const formattedTable5 = `
10% Dip
----------------------
Coin | Price | ATH | 30 Days change %
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

    await bot.sendMessage("821331693", formattedTable5, {
      parse_mode: "Markdown",
    });

    const formattedTable6 = `
20% Dip
----------------------
Coin | Price | ATH | 30 Days change %
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

    await bot.sendMessage("821331693", formattedTable6, {
      parse_mode: "Markdown",
    });

    const formattedTable7 = `
30% Dip
----------------------
Coin | Price | ATH | 30 Days change %
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

    await bot.sendMessage("821331693", formattedTable7, {
      parse_mode: "Markdown",
    });

    const formattedTable8 = `
40% Dip
----------------------
Coin | Price | ATH | 30 Days change %
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
    await bot.sendMessage("821331693", formattedTable8, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

fetchDetails2();

setInterval(fetchDetails2, 60000);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
