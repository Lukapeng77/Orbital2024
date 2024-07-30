let BASE_URL = "http://localhost:3001/";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:3001/";
}

export { BASE_URL };
