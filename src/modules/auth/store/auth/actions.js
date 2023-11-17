//export const myAction = async ({ commit }) => {}

import authApi from "@/api/authApi"

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user
  try {
    const { data } = await authApi.post("accounts:signUp", {
      email,
      password,
      returnSecureToken: true,
    })

    console.log(data)

    return { ok: true }
  } catch (error) {
    console.log(error.response)
    return { OK: false, message: "..." }
  }
}
