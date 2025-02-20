
const { validationResult } = require('express-validator');


module.exports.chatWithAi = async function (req, res, next) {
    try {
        // Validate input fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { message } = req.body;

        console.log(message);
        
    } catch (error) {
        console.error('Error registering user:', error);
        // General server error
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
