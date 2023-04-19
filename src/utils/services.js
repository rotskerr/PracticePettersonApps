import axios from "axios";
const token = localStorage.getItem("token");

export const getProjectInfoService = async (id) => {
  return axios
    .get(`https://practicepetersonapps.herokuapp.com/api/project/show/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const updateTaskStatusService = async (id, body) => {
  return axios
    .put(
      `https://practicepetersonapps.herokuapp.com/api/note/stage/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
