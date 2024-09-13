import * as Test from "../../model/test.mjs"; // Import everything as an object

export const getTests = (req, res) => {
  Test.getTests((err, tests) => {
    if (err) {
      return res.status(500).send("Error fetching tests");
    }
    return res.render("dashboardFormateur/tests/test", {
      tests: tests,
      title: "Tests",
    });
  });
};
