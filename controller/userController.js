const userModel = require("../model/User");

exports.getuser = async (req, res) => {
    try {
        const user = await userModel.find();
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
exports.postuser = async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    try {
        const newuser = new userModel({ name, email, password, phone, role });
        await newuser.save();
        res.status(201).json(newuser);
    } catch (error) {
        console.error("error in posting");
        res.status(500).json({ error: 'Server error' });
    }
}

exports.deleteuser = async (req, res) => {
    const id = req.params.id;
    const deleted = await userModel.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ message: "user not found" })
    }
    res.status(204).json({ message: "Record deleted" })
}

exports.updateuser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phone, role } = req.body;

        const updated = await userModel.findByIdAndUpdate(
            id, { name, email, password, phone, role }, { new: true }
        )
        if (!updated) {
            return res.status(404).json({ message: "user not found" })
        }
        res.json(updated)
    } catch (error) {
        console.error("error in posting");
        res.status(500).json({ error: 'Server error' });
    }
}