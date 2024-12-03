export const GetUserInfoAPI = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/getuserinfo`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok,
      msg: res.msg,
      statusCode: response.status,
      data: res.data
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};

export const GetUserServersAPI = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/getallservers`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok,
      msg: res.msg,
      statusCode: response.status,
      data: res.data
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};

export const IsLoggedInAPI = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/isloggedin`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok,
      msg: res.msg,
      statusCode: response.status,
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};

export const ForgotPasswordAPI = async (username_or_email) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/forgotpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username_or_email,
        }),
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok,
      msg: res.msg,
      statusCode: response.status,
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};

export const ResetPasswordAPI = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/resetpassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: formData.otp,
          password: formData.password,
          confirm_password: formData.confirm_password,
        }),
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok,
      msg: res.msg,
      statusCode: response.status,
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};
