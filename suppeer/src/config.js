let BASE_URL = "https://supper-a0aa5662728b.herokuapp.com";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:3001/";
}

export { BASE_URL };
