import { User } from '../models/user.model.js';

export const createUser = async (req, res) => {
    try {
        const { username, email, userId } = req.body; 
        const newUser = new User({ username, email, password: 'defaultPassword123', userId });
        await newUser.save();
        console.log('Creating user:', newUser);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', details: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().exec();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
};

export const updateUser = async (req, res) => {
    try {
        console.log('Updating user:');
        const userId = req.params.id; 
        const updateData = req.body;

        const updatedUser = await User.findOneAndUpdate({ userId: userId }, updateData, { new: true }).exec();

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; 

        const deletedUser = await User.findOneAndDelete({ userId });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.', deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

export const getUsersByRole = async (req, res) => {
    try {
        const role = req.params.role;
        const users = await User.find({ role }).exec();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found with this role' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users by role' });
    }
};
