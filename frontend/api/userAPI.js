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
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
      data: res.data?res.data:''
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
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
      data: res.data?res.data:''
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
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
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
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
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
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};


export const UpdateProfileAPI = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/updateprofile`,
      {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
        }),
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};


export const RemoveProfilePicAPI = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/remove/profilepic`,
      {
        method: "DELETE",
        credentials: 'include',
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};


export const UploadProfilePicAPI = async (binaryImage) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/change/profilepic`,
      {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        body: binaryImage
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};

export const GetOtherUserInfoAPI = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/getotheruserinfo/${userId}`,
      {
        method: "GET",
        credentials: 'include',
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
      data: res.data?res.data:''
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};

export const GetAllFriendsAPI = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/allfriends/`,
      {
        method: "GET",
        credentials: 'include',
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
      data: res.data?res.data:''
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};

export const SearchAPI = async (username) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/user/search/${username}`,
      {
        method: "GET",
        credentials: 'include',
      }
    );

    const res = await response.json();
    const newRes = {
      ok: res.ok?res.ok:false,
      msg: res.msg?res.msg:'',
      statusCode: response.status?response.status:'',
      data: res.data?res.data:''
    };
    return newRes;
  } catch (error) {
    console.warn("Something went wrong", error);
  }
};


