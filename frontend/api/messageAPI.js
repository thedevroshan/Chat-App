export const SendMessageAPI = async (message, date,userId) => {
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/message/sendmessage/${userId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'message': message,
                'date': date
            })
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
}