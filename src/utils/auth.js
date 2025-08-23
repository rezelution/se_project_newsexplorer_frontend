const FAKE_USERS_KEY = "fakeUsers";

function getStoredUsers() {
  const users = localStorage.getItem(FAKE_USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUserToStorage(newUser) {
  const users = getStoredUsers();
  users.push(newUser);
  localStorage.setItem(FAKE_USERS_KEY, JSON.stringify(users));
}

export const register = (email, password, userName) => {
  return new Promise((resolve, reject) => {
    const users = getStoredUsers();

    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      reject(new Error("Email is already registered"));
      return;
    }

    const usernameExists = users.some(
      (user) => user.userName.toLowerCase() === userName.toLowerCase()
    );
    if (usernameExists) {
      reject(new Error("Username is already taken"));
      return;
    }

    const newUser = { email, password, userName };
    saveUserToStorage(newUser);
    resolve({ data: newUser });
  });
};

export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    const users = getStoredUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      resolve({ token: "fake-jwt-token", user });
    } else {
      reject(new Error("Invalid email or password"));
    }
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "fake-jwt-token") {
      const users = getStoredUsers();
      const latestUser = users[users.length - 1];
      resolve({ data: latestUser });
    } else {
      reject(new Error("Invalid token"));
    }
  });
};
