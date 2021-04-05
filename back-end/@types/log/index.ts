export default function log(message: any, option?: any): void {
    if (option !== undefined) {
        console.log(message, option);
    } else {
        console.log(message);
    }
}
