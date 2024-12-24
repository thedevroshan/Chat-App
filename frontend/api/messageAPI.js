export const SendMessageAPI = async (message, userId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/message/sendmessage/${userId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.message,
          file: message.file,
          time: message.time,
          replied_text: message.replied_text
        }),
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok ? res.ok : false,
      msg: res.msg ? res.msg : "",
      statusCode: response.status ? response.status : "",
      data: res.data?res.data:''
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};


export const GetAllMessagesAPI = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/message/getallmessage/${userId}`,
      {
        method: "GET",
        credentials: "include"
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok ? res.ok : false,
      msg: res.msg ? res.msg : "",
      statusCode: response.status ? response.status : "",
      data: res.data?res.data:''
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};
