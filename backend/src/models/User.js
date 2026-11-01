const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        resetPasswordToken: {
            type: String,
            default: "",
        },

        resetPasswordExpires: {
            type: Date,
            default: null,
        },

        profileImage: {
            type: String,
            default: "",
        },

        preferences: {
            theme: {
                type: String,
                default: "light",
            },
        },

        notification: {
            email: {
                type: Boolean,
                default: true,
            },

            taskReminder: {
                type: Boolean,
                default: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);