// Function get publick and digital key pairs
export const fetchKeyPairs = async () => {
  const res = await fetch("http://localhost:5000/users/keyGeneration");
  const resData = await res.json();

  if (!res.ok) {
    resData.message = "Failed to fetch keypairs!";
    return resData.message;
  }
  return resData;
};

export const startRegister = async (data) => {
  const res = await fetch("http://localhost:5000/users/register", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();

  if (!res.ok || res.status !== 250) {
    return resData.message;
  }
  return resData;
};

export const verifySign = async (data) => {
  const res = await fetch("http://localhost:5000/users/verify", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();

  if (!res.ok) {
    resData.message = "Digital Signature verification failed!";
    return resData.message;
  }

  return resData;
};

export const verifyEmail = async (data) => {
  const res = await fetch("http://localhost:5000/users/verifyotp", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
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
  const res = await fetch("http://localhost:5000/users/login", {
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

export const completeProfile = async (data, authHeader) => {
  const formData = new FormData();
  formData.append("userId", data.userId);
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("dob", data.dob);
  formData.append("bank", data.bank);
  formData.append("upipin", data.upipin);
  formData.append("image", data.image);

  const res = await fetch("http://localhost:5000/users/completeProfile", {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  });

  const resData = await res.json();

  if (res.status === 422 || res.status === 500) {
    throw Error(resData.message);
  }

  return resData;
};

export const fetchUser = async (userId, authHeader, email) => {
  let url;
  if (userId === null) {
    url = "http://localhost:5000/users/getProfileDetailsUsingEmail/" + email;
  }
  if (email === null) {
    url = "http://localhost:5000/users/getProfileDetails/" + userId;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: authHeader,
    },
  });

  const resData = await res.json();

  if (res.status !== 200) {
    throw Error(resData.message);
  }

  return resData;
};
