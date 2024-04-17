import jwt from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { PRIVATE_KEY } from '$env/static/private';

export function verifyToken(token: string) {
    try{
        const decoded = jwt.verify(token ,PRIVATE_KEY)
        return {valid: true, decoded}
    } catch (error) {
        return {valid: false}
    }
} 