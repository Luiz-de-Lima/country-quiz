import axios from "axios";

const BaseUrl = "https://restcountries.com/v3.1/all";

export const api = {
  getCountry: async () => {
    const json = await axios.get(BaseUrl);
    const response = json.data;
    return response;
  },
};
