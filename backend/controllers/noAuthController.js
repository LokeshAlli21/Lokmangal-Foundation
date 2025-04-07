export const getProfiles = async (req, res, next) => {
    try {
        console.log(req.body);
        
        const { category } = req.body;

        // Example: Dummy profiles data
        const profiles = [
            { id: 1, name: 'Lokesh', category: 'developer' },
            { id: 2, name: 'Amit', category: 'designer' },
            { id: 3, name: 'Priya', category: 'developer' },
        ];

        // Filter profiles by category from request
        const filteredProfiles = profiles.filter(profile => profile.category === category);

        res.json({
            success: true,
            message: 'Filtered profiles fetched successfully',
            data: filteredProfiles
        });
    } catch (error) {
        next(error);
    }
};
