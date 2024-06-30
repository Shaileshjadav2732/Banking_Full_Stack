const startRegister = async (data) => {
  const res = await fetch("http://localhost:3000/api/v1/users/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
}

export const verifyEmail = async (data) => {
  const res = fetch("http://localhost:3000/api/v1/users/verifyotp", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  if (res.status !== 200) {
    return resData.message;
  }

  return resData;
};

export const login = async (data) => {
  const res = await fetch("http://localhost:3000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (res.status === 422 || res.status === 500) {
    throw Error(resData.message);
  }

  return resData;
};