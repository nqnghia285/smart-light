import cookie from "cookie";

export function cookieParse(str: string | undefined, option?: cookie.CookieParseOptions | undefined) {
    if (str !== undefined) {
        return cookie.parse(str, option);
    } else {
        return undefined;
    }
}

export function cookieSerialize(name: string | undefined, value: string | undefined, option?: cookie.CookieSerializeOptions | undefined) {
    if (name !== undefined && value !== undefined) {
        return cookie.serialize(name, value, option);
    } else {
        return undefined;
    }
}
