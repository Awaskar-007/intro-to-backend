import { User } from "../src/models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;



        // basic validation

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(409).json({ message: "User already exists" });
        }
        
        // create new user
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });
        res.status(201).json({ message: "User created successfully",
            user: { id: newUser.id, email: newUser.email, username: newUser.username } });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try{
        // checking if user exists
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ 
            email: email.toLowerCase(),
    });

    if (!user) return res.status(400).json({ 
        message: "User not found" 
    });

    // compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) return res.status(400).json({ 
        message: "Invalid credentials" 
    });

    user.loggedIn = true;
    await user.save();

    res.status(200).json({ 
        message: "User logged in successfully",
        user: { id: user.id, email: user.email, username: user.username }
    });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.loggedIn = false;
        await user.save();

        res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export {
    loginUser,
    registerUser,
    logoutUser
};