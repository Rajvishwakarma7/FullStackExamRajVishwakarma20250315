import apiClient from "./apiClient";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const placeOrder = async (cartItems) => {
  try {
    const response = await apiClient.post(
      "/orders/place",
      { items: cartItems },
      { headers: getAuthHeaders() }
    );

    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const response = await apiClient.get("/orders", {
      headers: getAuthHeaders(),
    });

    if (
      response &&
      response.status == 200 &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      return { status: "ok", orders: response.data };
    } else {
      return { status: "" };
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { status: "" };
  }
};
