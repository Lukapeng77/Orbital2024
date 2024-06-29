
const isLoggedIn = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const loginUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  console.log(user);
};

const logoutUser = () => {
  localStorage.removeItem("user");
};

export { loginUser, isLoggedIn, logoutUser };
