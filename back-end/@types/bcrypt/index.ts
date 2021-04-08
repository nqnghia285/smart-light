import bcrypt = require("bcrypt");

export function comparePWD(pwd: string | undefined, hash: any) {
    try {
        return bcrypt.compareSync(pwd, hash);
    } catch (error) {
        console.log(error);
        return false;
    }
}

export function hashPWD(pwd: string | undefined, salt: string = bcrypt.genSaltSync()) {
    try {
        return bcrypt.hashSync(pwd, salt);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
