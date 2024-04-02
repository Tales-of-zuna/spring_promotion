const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
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
  const userID = req.query.user_id;
  const giftID = req.query.gift_id;
  const giftCount = req.query.wish_count;
  const subID = req.query.sub_id;
  try {
    const data = await fetch(
      `http://10.21.64.119:8228/use_wish?sub_id=${subID}&gift_id=2000&user_id=${userID}&wish_count=${giftCount}`
    );
    res.json(await data.json());
  } catch (error) {
    console.log(error);
  }
});
