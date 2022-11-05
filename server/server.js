const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.send({ users: ["user 1", "user 2", "user 3"] });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
