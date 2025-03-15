import apiClient from "./apiClient";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCartItems = async () => {
  try {
    const response = await apiClient.get("/cart", {
      headers: getAuthHeaders(),
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return { cartItems: [] };
    }
  } catch (error) {
    console.log(error);
    return { cartItems: [] };
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await apiClient.post(
      "/cart/add",
      { productId, quantity },
      { headers: getAuthHeaders() }
    );
    if (response.status === 200) {
      let msg = response.data;
      return { ...msg, item: "added" };
    } else {
      return { item: "notAdded" };
    }
  } catch (error) {
    console.log(error);
    return { item: "notAdded" };
  }
};

export const removeFromCart = async (productId) => {
  const response = await apiClient.post(
    `/cart/remove`,
    { productId },
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const clearCart = async () => {
  const response = await apiClient.delete("/cart/clear", {
    headers: getAuthHeaders(),
  });
  return response.data;
};
