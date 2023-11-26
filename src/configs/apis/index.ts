import axios from "axios";
import { loadLanguageApp, loadToken } from "../localStorage";
import { BASE_URL } from "../../constants/urls";

export async function getData(url: string, id?: number, data?: any) {
  const accessToken = await loadToken();
  const language = await loadLanguageApp();

  const response = await axios.get(`${url}${id ? `${id}` : ""}`, {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${accessToken}`,
      Language: language === "ar" ? language : "",
    },
    params: data,
    timeout: 3000,
  });
  return response;
}

export async function postData(url: string, data: any) {
  const accessToken = await loadToken();
  const language = await loadLanguageApp();

  const response = await axios.post(url, data, {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${accessToken ? "Bearer" : ""} ${
        accessToken ? accessToken : ""
      }`,
      Language: language ? language : "en",
    },
    timeout: 3000,
  });
  return response;
}

export async function deleteData(url: string, id: number) {
  const accessToken = await loadToken();

  const response = await axios.delete(`${url}${id}`, {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${accessToken ? "Bearer" : ""} ${
        accessToken ? accessToken : ""
      }`,
    },
    timeout: 3000,
  });
  return response;
}
