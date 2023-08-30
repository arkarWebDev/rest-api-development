const fs = require("fs");

exports.unlink = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) throw err;
    console.log("unlink!");
  });
};
