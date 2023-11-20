import axios from "axios"

const instance = axios.create({
  baseURL: "/api/", // Replace with your API base URL
  timeout: 10_000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // If token is present add it to request's Authorization Header
    if (localStorage?.getItem("car-token")) {
      try {
        const accessToken = localStorage?.getItem("car-token") || ""
        // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTUwNjgxNjMsInVzZXJfaWQiOiI2NTA4MWZiYjA4ZTVhZWQzMjA2ZDY5OWQiLCJhZGRyZXNzIjoiMHhmMzlGZDZlNTFhYWQ4OEY2RjRjZTZhQjg4MjcyNzljZmZGYjkyMjY2IiwiZXhwaXJhdGlvbl90aW1lIjoxNjk1MDY4MTYzfQ.c7pjzCVSZZ0i-snZkWJosUdFyxMQL8zwmghALZlren0
        if (config.headers)
          config.headers.Authorization = "Bearer " + accessToken
        console.log("config.headers", config.headers)
      } catch (error) {
        console.log({ error })
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// End of Request interceptor

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    console.log({ response })
    if (response && response.data && response.data.code === 1003) {
      window.location.href = "/login"
      localStorage?.removeItem("car-token")
      return Promise.reject("登录失效")
    }

    return response
  },
  (error) => {
    console.log({ error: error })
    if (error.response && error.response.status === 401) {
      localStorage?.removeItem("car-token")
      window.location.href = "/login"
    }
    // Handle response errors here
    return Promise.reject(error)
  }
)
// End of Response interceptor

export default instance
