const express = require("express");
const app = express();
var cors = require('cors')
let fetch = require('node-fetch')
let { NFTStorage } = require('nft.storage');
let { Blob } = require("node:buffer");
const port = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyZmE2M0QxRUViY2ExOTZCOUY2NkExNGZmRWIzMzE1RUUzNUEwMzkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzY5MzQ2NTEyNSwibmFtZSI6InByb2ZpbGUtYWkifQ.wN7a7xp9wY6qzwScPsmF-FbJSd1krNgR4XhAINJQ1WA'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
}))

app.post("/api", async (req, res) => {
  console.log('url', req.body['selectedImage'])
  const asdasdasd = await fetch(req.body['selectedImage']);
  const data = await asdasdasd.blob();
  const client = new NFTStorage({ token: apiKey });
  const cidString = await client.storeBlob(data);

  console.log('url', cidString)
  const jsonStr = JSON.stringify({
    "name": req.body['name'],
    "description": req.body['prompt'],
    "image": `ipfs://${cidString}`
  });
  console.log('jsonStr', JSON.stringify(jsonStr))
  const bytes = new TextEncoder().encode(jsonStr);
  const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8"
  });
  const cidString2 = await client.storeBlob(blob)

  console.log("final", cidString2)
  console.log(cidString2)
  res.send({ ipfsUri: `ipfs://${cidString2}`});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
