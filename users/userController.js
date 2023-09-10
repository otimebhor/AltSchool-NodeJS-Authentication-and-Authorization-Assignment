const fs = require("fs");

const createUser = (req, res) => {
  const userDb = fs.readFileSync("./users/users.json");
  const userObj = JSON.parse(userDb);
  const user = req.body;
  user.api_key = `${user.username}_${user.password}`;

  if (user.username === "success") {
    user.user_type = "admin";
  } else {
    user.user_type = "user";
  }

  userObj.push(user);

  fs.writeFile("./users/users.json", JSON.stringify(userObj), (err) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(user);
  });
};

module.exports = { createUser };
