// import { NFTStorage, File } from "nft.storage";
const { NFTStorage, File } = require("nft.storage");
const fetch = require("node-fetch");

// // DALL-E URL -> File
// // https://stackoverflow.com/a/64025574
// async function getFileFromUrl(url, name) {
//   const response = await fetch(url);
//   const data = await response.blob();
//   console.log(data);
//   return new File([data], name, { type: "image/png" });
// }

// // File -> NFT
// // https://nft.storage/docs/why-nft-storage/#ipfs-and-nftstorage-to-the-rescue
// async function createNftFromFile(name, description, file) {
//   const apiKey =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyZmE2M0QxRUViY2ExOTZCOUY2NkExNGZmRWIzMzE1RUUzNUEwMzkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzY2OTQ2OTUwNywibmFtZSI6InByb2ZpbGUtYWkifQ.aFYesiLlCfxjGx3Saz-dLsdj4kYAgDNaI-Oc1gIs8ks";
//   const client = new NFTStorage({ token: apiKey });
//   const metadata = await client.store({
//     name: name,
//     description: description,
//     image: file,
//   });
//   console.log(metadata);
//   console.log(metadata.url); // ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
//   return metadata;
// }

// async function createNftFromUrl(name, description, url) {
//   let file = await getFileFromUrl(url, "image.png");
//   let metadata = await createNftFromFile(name, description, file);
//   return metadata;
// }

// https://github.com/nftstorage/nft.storage/issues/1902#issuecomment-1154011687
async function createNftFromUrl(name, description, url) {
  const res = await fetch(url);
  const data = await res.blob();
  const image = new File([data], "image.png", { type: "image/png" });

  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyZmE2M0QxRUViY2ExOTZCOUY2NkExNGZmRWIzMzE1RUUzNUEwMzkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzY2OTQ2OTUwNywibmFtZSI6InByb2ZpbGUtYWkifQ.aFYesiLlCfxjGx3Saz-dLsdj4kYAgDNaI-Oc1gIs8ks";
  const client = new NFTStorage({ token: apiKey });
  const metadata = await client.store({
    name: "My NFT",
    description: "Awesome image, very valuable",
    image,
  });
  return metadata;
}

let imageUrl =
  "https://oaidalleapiprodscus.blob.core.windows.net/private/org-HOSkiZGfyJeiuj3jOvsiJ2Lg/user-Kvuaup7JzD9jWvgR4FX732fB/img-kirlrepwo3n22Fb08cIeLI7w.png?st=2022-11-05T17%3A59%3A23Z&se=2022-11-05T19%3A59%3A23Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-05T01%3A53%3A39Z&ske=2022-11-06T01%3A53%3A39Z&sks=b&skv=2021-08-06&sig=mHHIFY3XcHKYxhy1u9XiErUXKYNMnhdE%2BBQiwAIr/y0%3D";

// let file = getFileFromUrl(imageUrl, "image.png", "image/png").then(console.log);

createNftFromUrl("test", "This is a test", imageUrl).then(console.log);
