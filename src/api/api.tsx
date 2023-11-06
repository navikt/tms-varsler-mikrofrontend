import { postDoneUrl } from "./urls";

export const fetcher = async (path: string) => {
  const response = await fetch(path, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Fetch request failed");
  }

  return await response.json();
};

const postJSON = (url: string, eventObj: { eventId: string }) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventObj),
    })
      .then((response) => response.headers)
      .then((headers) => resolve(headers))
      .catch((e) => reject(e));
  });

export const postDone = (eventObj: { eventId: string }) => {
  postJSON(postDoneUrl, eventObj);
};
