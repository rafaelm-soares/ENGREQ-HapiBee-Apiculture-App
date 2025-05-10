//DOCS
//https://regex101.com/

export function isValidEmail(email: string): boolean {
    let regEx = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
    return regEx.test(String(email).toLowerCase());
}

export function isValidPassword(password: string): boolean {
    //Minimum 8 chars with at least a number, a lower case char, and upper case char and a specia char
    let regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/gi;
    return regEx.test(String(password).toLowerCase());
}

export function isValidUsername(username: string): boolean {
    let regEx = /^([a-zA-Z]+){4,}$/gi;
    return regEx.test(String(username));
}

export function isValidFile(file: File): boolean {
    let regEx = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
    const isValid = regEx.test(String(file.name))
    return isValid;
}
