const extractId = (req, res, next) => {
    const authHeader = req.headers.authorization

    const id = Number(authHeader.split(" ")[1])

    req.userId = id

    next()
}

export default extractId