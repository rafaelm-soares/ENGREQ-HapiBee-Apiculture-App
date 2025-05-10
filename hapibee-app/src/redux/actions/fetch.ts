import { toast } from 'react-toastify';

export const baseURL = process.env.REACT_APP_API_URL;

interface Options {
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "OPTIONS";
  body?: any;
  cache?: RequestCache;
}

function getCookie() {
  const key = "hapibee";
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export default async function fetchApi(
  uri: string,
  options: Options
): Promise<any> {
  const requestOptions: RequestInit = {
    method: options.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: getCookie() || "",
    },
    ...(options.body ? { body: options.body } : ""),
  };

  return fetch(baseURL + uri, requestOptions)
    .then((data) => {
      const status = data.status;
      return data.json().then((data) => {
        let isPostOrPatch = options.method === "POST" || options.method === "PATCH" || options.method === "PUT";
        if (status === 200 || status === 201 || status === 202) {
          console.log(data)
          //Display the message in a toast
          isPostOrPatch && toast.success("Sucesso");
        } else {
          toast.error("Erro");
        }
        return data;
      });
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch here
      console.log("Error in fetch: ", error);
    });
}
