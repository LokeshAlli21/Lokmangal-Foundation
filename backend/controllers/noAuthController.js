export const getProfiles = async (req, res, next) => {
    try {
        const { body } = req;
        res.json({
            success: true,
            message: 'Route: /api/no-auth/get-profiles called successfully',
            data: body
        });
    } catch (error) {
        next(error); // Pass to error handler middleware
    }
};
