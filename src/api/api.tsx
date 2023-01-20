import { QueryFunctionContext } from "react-query";
import { postDoneUrl } from "./urls";

const checkResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error("Fetch request failed");
  }
};

export const fetcher = async (queryFunctionContext: QueryFunctionContext) => {
  const url = queryFunctionContext.queryKey.toString();

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  checkResponse(response);

  return response.json();
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
