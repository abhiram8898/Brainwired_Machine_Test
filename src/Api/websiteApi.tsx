import { api } from "./api";

export async function getFullData() {
    const [, data] = await api.get(`users`, true);
    return data;
  }