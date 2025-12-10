export const BASE_URL = "http://localhost:8000/api";

const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/user/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return await response.json();
};

const registerUser = async (name, username, dept, password) => {
  const response = await fetch(`${BASE_URL}/user/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, dept, password }),
  });
  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return await response.json();
};

const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/user/sign-out`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return await response.json();
};

export { loginUser, registerUser, logoutUser };
