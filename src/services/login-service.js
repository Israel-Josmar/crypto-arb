const fakeHttpRequest = (username, password) => {
  return new Promise((resolve) => resolve({ user_name: 'Israel' }))
}

export const login = async (username, password) => {
  return await fakeHttpRequest(username, password)
}
