import axios from "axios"

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
  params: {
    key: "AIzaSyCG6PTOyBaA56zD89h83XItdn1wpJ_muRA",
  },
})

export default authApi
