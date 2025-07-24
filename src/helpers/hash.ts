import bcrypt, { genSalt, hash, compare } from 'bcrypt'
import { shortUrlModel } from '../models/url';

const saltRounds = 10;
export const hashPassword = async (password: string) => {
    const hashed = await bcrypt.hash(password, saltRounds)

    // console.log('hash: ', hash)
    if (!hashed) return
    return hashed
}

export const comparePassword = (userPassword: string, password: string) => {
    const match = bcrypt.compareSync(password, userPassword)
    // console.log(`userPassword......${userPassword}`);
    // console.log(`password......${password}`);

    // if (!match) throw new Error('something went wrong')
    return match
}

const charSet = "0123456789abcdefghijklmnopqrstuvwxyz";
const shortUrlLength = 6;

/**
 * @description: Hash available -> 36 ^ 6 = 2.176.782.336
 */
export const generateShortHash = async () => {
    let shortURL = "";
    let offset = await shortUrlModel.countDocuments();
    while (offset > 0) {
        shortURL = charSet[offset % charSet.length] + shortURL;
        offset = Math.floor(offset / charSet.length);
    }

    if (shortURL.length < shortUrlLength) {
        return shortURL.padStart(shortUrlLength, charSet[0]);
    }
    return shortURL;
};
