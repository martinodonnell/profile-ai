import { NFTStorage } from 'nft.storage';
import { apiKey } from '../env'

// https://github.com/nftstorage/nft.storage/issues/1902#issuecomment-1154011687
// https://github.com/nftstorage/nft.storage/blob/main/examples/client/browser/storeFromUrl.html
export async function createNftFromUrl(name, description, url) {
  const res = await fetch(url);
  //   console.log(res);
  const data = await res.blob();
  //   console.log(data);
  //   const image = new File([data], "image.png", { type: "image/png" });
  //   console.log(image);

  const client = new NFTStorage({ token: apiKey });
  //   const metadata = await client.store({
  //     image,
  //     name: name,
  //     description: description,
  //     originalUrl: url,
  //   });
  const cidString = await client.storeBlob(data);
  //   console.log(metadata);
  return `ipfs://${cidString}`;
}

// let imageUrl =
//   "https://oaidalleapiprodscus.blob.core.windows.net/private/org-HOSkiZGfyJeiuj3jOvsiJ2Lg/user-Kvuaup7JzD9jWvgR4FX732fB/img-1Cm18iwJwhgoEb2LLtsaAcDO.png?st=2022-11-05T22%3A16%3A03Z&se=2022-11-06T00%3A16%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-05T02%3A25%3A05Z&ske=2022-11-06T02%3A25%3A05Z&sks=b&skv=2021-08-06&sig=AUY%2BubXWCHn7WVjnuWKeLio9AtF4hCMPq6ya5rJguxA%3D";
// let imageUrl = "https://static.thenounproject.com/png/4778723-200.png";

// createNftFromUrl("test", "This is a test 1", imageUrl).then(console.log);
