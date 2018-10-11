import { Auth } from "aws-amplify";

const fakeHttpRequest = (username, password) => {
  return new Promise((resolve) => resolve({ user_name: 'Israel' }))
}

export const login = async (username, password) => {
  try {
    await Auth.signIn(username, password);
    return true
  } catch (e) {
    console.error('Error', e, e.message);
    return false
  }
}
