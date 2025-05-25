const extractId = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header' })
    }

    const id = authHeader.split(" ")[1]

    if (!id || id.trim() === '') {
        return res.status(400).json({ error: 'invalid user id' })
    }

    req.userId = id
    next()
}

export default extractId