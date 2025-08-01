export const checkValidData = (email, password, name) => {

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    const isNamevalid = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(name)

    if(!isEmailValid) return "Email ID is not valid"
    if(!isPasswordValid) return "Passsword is not valid"
    if(!isNamevalid) return "Name is not valid"

    return null;
}