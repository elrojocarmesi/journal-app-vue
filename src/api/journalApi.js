import axios from "axios"

const journalApi = axios.create({
  baseURL: "https://andpizzafusiontable-default-rtdb.firebaseio.com",
})

export default journalApi
