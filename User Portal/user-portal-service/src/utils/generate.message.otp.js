const generateCustomMessage = (sender, receiver, otp) => {
    return {
        from: sender,
        to: receiver,
        subject: "Reset Password - Your OTP",
        text: `Your one time password is: ${otp}`,
        html: `<p>Your one time password is: <h2>${otp}</h2></p>`
    }
}

const generateTransporter = (auth) => {
    return {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: auth
    }
}

module.exports = {generateCustomMessage, generateTransporter}