const { default: mongoose } = require("mongoose");

const userModel = mongoose.Schema( { 
    name: {
        type: String,
        required: [true, "Name is required"]
    },  
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    }
}, {
    timestamps: true
});

userModel.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    if (this.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }

    next();
});

module.exports = mongoose.model("User", userModel);

module.exports = mongoose.model("User", userModel)