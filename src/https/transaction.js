export const genreateSignature = async (data, authHeader) => {
  const res = await fetch(
    "http://localhost:5000/transaction/generateSignature",
    {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const resData = await res.json();

  if (res.status !== 201) {
    throw Error(resData.message);
  }

  return resData;
};

export const makeTransaction = async (data, authHeader) => {
  let url;
  if (data.acNo) {
    url = "http://localhost:5000/transaction/makeTranscationUsingAccNo";
  }

  if (data.phone) {
    url = "http://localhost:5000/transaction/makeTranscationUsingPhoneNo";
  }

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: authHeader,
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (res.status !== 201) {
    throw Error(resData.message);
  }

  return resData;
};

export const getTransaction = async (userId, authHeader, type) => {
  let url;
  if (type === "sent") {
    url = "http://localhost:5000/transaction/getHistorySent/";
  }

  if(type === "receive"){
    url = "http://localhost:5000/transaction/getHistoryReceive/"
  }
  
  const res = await fetch(url + userId, {
    method: "GET",
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
