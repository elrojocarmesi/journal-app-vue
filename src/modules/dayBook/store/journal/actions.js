import journalApi from "@/api/journalApi"

//export const myAction = async ({ commit }) => {}
export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json")

  const entries = []

  if (!data) {
    commit("setEntries", entries)
    return
  }

  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    })
  }
  /// console.log(entries)
  commit("setEntries", entries)
}
export const updateEntry = async ({ commit }, entry) => {
  const { date, text, picture } = entry
  const dataToSave = { date, text, picture }

  const resp = await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
  // console.log(resp)

  commit("updateEntry", { ...entry })
}
export const createEntry = async ({ commit }, entry) => {
  const { date, text, picture } = entry
  const dataToSave = { date, text, picture }

  const { data } = await journalApi.post(`/entries.json`, dataToSave)

  dataToSave.id = data.name

  commit("addEntry", dataToSave)
  return data.name
}

export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`)
  commit("deleteEntry", id)
  return id
}
