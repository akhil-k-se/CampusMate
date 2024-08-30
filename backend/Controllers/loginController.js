const jwt = require('jsonwebtoken');

const loginUser = async (Model, req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await Model.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.loginStudent = (req, res) => loginUser(Student, req, res);
exports.loginAdmin = (req, res) => loginUser(Admin, req, res);
exports.loginAdministrator = (req, res) => loginUser(Administrator, req, res);
