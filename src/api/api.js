const FIREBASE_DOMAIN = "https://react-http-a246f-default-rtdb.firebaseio.com";
const ALL_ITEMS = "tr-numbers";

export async function getAllItems() {
  try {
    let data = [];
    const response = await fetch(`${FIREBASE_DOMAIN}/${ALL_ITEMS}.json`);
    const result = await response.json();

    Object.keys(result).forEach((key) => {
      data.push({ key, ...result[key] });
    });

    return data;
  } catch (err) {
    return err;
  }
}

export async function getTrackingInfo(trNumber) {
  if (!trNumber) {
    return { message: "No tracking number found" };
  }
  try {
    const response = await fetch(`http://localhost:5000/${trNumber}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Can't get details. Error code: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function submitToDatabase(data) {
  const response = await fetch(`${FIREBASE_DOMAIN}/${ALL_ITEMS}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function deleteFromDatabase(id) {
  console.log(id);
  const response = await fetch(`${FIREBASE_DOMAIN}/${ALL_ITEMS}/${id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // body: data,
  });

  return response.json();
}

export async function addTrackingInfo(id, data) {
  const myData = JSON.stringify(data);

  const response = await fetch(
    `${FIREBASE_DOMAIN}/${ALL_ITEMS}/${id}/trackingInfo.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: myData,
    }
  );

  return response.json();
}
