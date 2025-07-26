import api from "./api.js";


export const getSubjects = async () => {
  try {
    const response = await api.get('asignaturas/');
    return response.data; // Retorna la lista de asignaturas
  } catch (error) {
    throw error.response.data;
  }
};

export const createSubject = async (subjectData) => {
  try {
    const response = await api.post('asignaturas/', subjectData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};