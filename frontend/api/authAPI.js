// LOGIN API
export const LoginAPI = async (formData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({...formData})
        })

        const res = await response.json()
        const newRes = {
            ok: res.ok,
            msg: res.msg,
            statusCode: response.status
        };
        return newRes
    } catch (error) {
        console.warn('Something Went Wrong. Please try again later.', error)
    }
}

// Register API
export const RegisterAPI = async (formData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({...formData})
        })

        const res = await response.json()
        const newRes = {
            ok: res.ok,
            msg: res.msg,
            statusCode: response.status
        };
        return newRes
    } catch (error) {
        console.warn('Something Went Wrong. Please try again later.', error)
    }
}


// Verify Email API
export const VerfiyEmailAPI = async (otpForm) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/auth/verifyemail`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({...otpForm})
        })

        const res = await response.json()
        const newRes = {
            ok: res.ok,
            msg: res.msg,
            statusCode: response.status
        };
        return newRes
    } catch (error) {
        console.warn('Something Went Wrong. Please try again later.', error)
    }
}

// Resend OTP API
export const ResendOTPAPI = async (email) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/auth/resendotp`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })

        const res = await response.json()
        const newRes = {
            ok: res.ok,
            msg: res.msg,
            statusCode: response.status
        };
        return newRes
    } catch (error) {
        console.warn('Something Went Wrong. Please try again later.', error)
    }
}