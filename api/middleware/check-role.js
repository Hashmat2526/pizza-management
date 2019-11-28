module.exports = (req, res, next) => {
    try {
        console.log("admin auth details request ")
        const { isAdmin } = req.userData;
        console.log(isAdmin)
        if (!isAdmin) {
            return res.status(401).json({
                message: 'Sorry you"re not authorized'
            })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
    next();
}