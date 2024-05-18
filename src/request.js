import axios from 'axios'

/** Permite obtener el contenido del archivo db.json */
export const getNotes = () =>
  axios.get('http://localhost:3001/notes').then(res => res.data)