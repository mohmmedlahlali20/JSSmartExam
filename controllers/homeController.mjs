// homeController.mjs

export const home = (req, res) => {
    res.render('home', { title: "home page" });
};
