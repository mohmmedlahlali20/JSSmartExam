import * as Test from "../../model/test.mjs"; 

export const getTests = async (req, res) => {
  try {
    const tests = await Test.getTests()
    res.render("dashboardFormateur/tests/test", {
      tests: tests,
      title: "Tests",
    });
  } catch (err) {
    console.error("Error fetching tests:", err);
    res.status(500).send("Error fetching tests");
  }
};
