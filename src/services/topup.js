import axios from "axios";

const token = localStorage.getItem("token");

export const topUpBalance = async (amount) => {
  let data = JSON.stringify({
    top_up_amount: amount,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BASE_URL}/topup`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const response = await axios.request(config);
  return response.data;
};
