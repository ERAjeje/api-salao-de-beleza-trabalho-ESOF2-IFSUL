
export const getHeaderAuthorization = (value) => {
    const [basic, hash] = value.split(' ');
    const credentials = Buffer.from(hash, 'base64').toString();
    const [email, password] = credentials.split(':');
    return [ email, password ];
}