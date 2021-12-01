// import { JSDOM } from "jsdom";
// import fetch from "node-fetch";

const FIREBASE_DOMAIN = "https://react-http-a246f-default-rtdb.firebaseio.com";

export async function getAllItems() {
  const allItems = "tr-numbers";

  const response = await fetch(`${FIREBASE_DOMAIN}/${allItems}.json`);

  const result = await response.json();

  return result;
}

export async function getTrackingInfo(trNumber) {
  const trStatus = "tr-status";

  const response = await fetch(
    `${FIREBASE_DOMAIN}/${trStatus}/${trNumber}.json`
  );

  const result = await response.json();

  return result;
}

// .then((response) => response.text())
// .then((result) => console.log(result))
// .catch((error) => console.log("error", error));

// export async function testFetch() {
//   const response = await fetch("https://usps.com");
//   const text = await response.text();
//   const dom = await new JSDOM(text);
//   console.log(dom.window.document.querySelector("h1").textContent);
// }

// export async function testFetch() {
//   const response = await fetch("https://reddit.com/");
//   const body = await response.text();
//   console.log(body); // prints a chock full of HTML richness
//   return body;
// }
