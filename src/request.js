import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

/** Permite obtener el contenido del archivo db.json */
export const getNotes = () =>
  axios.get(baseUrl).then(res => res.data)

/** Permite sincronizar el servidor para que los datos agregados se almacenen en el servidor. */
export const createNote = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)

/** Permite sincronizar el servidor para que los datos que cambiaron se almacenen actualizados en el servidor.  */
export const updateNote = updatedNote =>
  axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)