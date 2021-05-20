
exports.profile = async (req, res, next) => {
    res.status(200)
    .json({
        success: true,
        data : "access granted",
        user: req.user
    })
}