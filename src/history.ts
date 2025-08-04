import client from "./client"

export const saveToHistory = async(userId: number, method: string, path: string, status: number, ip: string, userAgent: string) => {
    await client.history.create({
        data: {
            userId: 1,
            method: method,
            path: path,
            status: status,
            ip: ip,
            userAgent: userAgent,
        }
    })
}

export const getHistory = async() => {
    const history = await client.history.findMany({
        include: {
            user: true
        }
    });
    return history;
}