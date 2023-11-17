import axios from "axios"

const uploadImage = async (file) => {
  if (!file) return
  try {
    const frmData = new FormData()
    frmData.append("upload_preset", "sxepi4zh")
    frmData.append("file", file)
    const url = "https://api.cloudinary.com/v1_1/dpbl5ep3b/image/upload"
    const { data } = await axios.post(url, frmData)
    console.log(data)
    return data.secure_url
  } catch (error) {
    console.error("Error al subir la imagen, revisar logs")
    console.error(error)
    return null
  }
}

export default uploadImage
