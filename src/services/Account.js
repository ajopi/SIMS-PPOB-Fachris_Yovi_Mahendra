import axios from "axios";
export const updateImage = async (file) => {
  const token = localStorage.getItem("token");
  let data = new FormData();
  data.append("file", file);

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BASE_URL}/profile/image`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const response = await axios.request(config);
  return response;
};

export const updateProfile = async (firstName, lastName) => {
  const token = localStorage.getItem("token");
  let data = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
  });

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BASE_URL}/profile/update`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const response = await axios.request(config);
  return response;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};
