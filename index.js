const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs").promises;

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/api/get_user_wish_list", async (req, res) => {
  const userID = req.query.sub_id;
  try {
    const data = await fetch(
      `http://10.21.64.119:8228/get_user_wish_list?sub_id=${userID}`
    );
    res.json(await data.json());
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/send_wishes", async (req, res) => {
  const subID = req.query.sub_id;
  try {
    const data = await fetch(
      `http://10.21.64.119:8228/use_wish?sub_id=${subID}&gift_id=2000&user_id=3&wish_count=1`
    );
    res.json(await data.json());
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/add_coupon", async (req, res) => {
  const userID = req.query.sub_id;
  let coinData;
  try {
    coinData = await fs.readFile(coinDataFile);
    coinData = JSON.parse(coinData);
    if (coinData.totalCoins >= 10) return res.json({ message: "Nope" });
    coinData.totalCoins++;
    await fs.writeFile(coinDataFile, JSON.stringify(coinData, null, 2));
    console.log(coinData);
    const data = await fetch(
      `http://10.21.64.119:8228/add_coupon?sub_id=${userID}&add_count=1`
    );
    res.json(await data.json());
  } catch (error) {
    console.log(error);
  }
});

const coinDataFile = "coinCount.json";

app.get("/api/getLimit", async (req, res) => {
  try {
    let coinData;
    try {
      coinData = await fs.readFile(coinDataFile);
      coinData = JSON.parse(coinData);
    } catch (err) {
      coinData = {
        totalCoins: 0,
        lastResetDate: new Date().toISOString().split("T")[0],
      };
      await fs.writeFile(coinDataFile, JSON.stringify(coinData, null, 2));
    }

    const today = new Date().toISOString().split("T")[0];
    if (coinData.lastResetDate !== today) {
      coinData.totalCoins = 0;
      coinData.lastResetDate = today;
      await fs.writeFile(coinDataFile, JSON.stringify(coinData, null, 2));
    }

    if (coinData.totalCoins < 10) {
      res.status(200).json({ message: "Okay" });
    } else {
      res.status(403).json({ message: "Nope" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
