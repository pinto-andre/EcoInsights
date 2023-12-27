const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Oops! You forgot to enter your email."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Hey there! Don't forget to set a password."],
    },
    username: {
      type: String,
      required: [true, "Uh-oh! You have to choose a username to get started."],
    },
    first_Name: {
      type: String,
      required: [true, "Hold on! We need your first name."]
    },
    surname: {
      type: String,
      required: [true, "Wait! your surname is missing"]
    },
    favourite_On_Nature: {
      type: String,
      enum: ["Animals", "Plants"]
    },
    favouriteSeason: {
      type: String,
      enum: ["Winter", "Spring", "Summer", "Autumn"]
    },
    profile_Image: {
      type: String,
      default: function(){
        switch (favourite_On_Nature) {
          case "Animals":
            return "https://img.freepik.com/premium-photo/closeup-otter-drawing-front-view-white-background_899449-63774.jpg"
          
          case "Plants":
            return "https://img.freepik.com/free-vector/plant-growing_78370-263.jpg"
        
          default: 
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGjt2yc1eucAzdqAa7ThZTYxtpMXXem3J16Q&usqp=CAU"
        }
      }
    },
    continent: {
      
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
