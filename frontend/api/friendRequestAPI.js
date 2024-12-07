export const GetAllRequestsAPI = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/friendrequest/requests`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok ? res.ok : false,
      msg: res.msg ? res.msg : "",
      statusCode: response.status ? response.status : "",
      data: res.data ? res.data : "",
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};

export const DeclineFriendRequestAPI = async (requestId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/friendrequest/delete/${requestId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok ? res.ok : false,
      msg: res.msg ? res.msg : "",
      statusCode: response.status ? response.status : "",
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};


export const AcceptFriendRequestAPI = async (requestId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/friendrequest/accept/${requestId}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok ? res.ok : false,
      msg: res.msg ? res.msg : "",
      statusCode: response.status ? response.status : "",
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};
