const express = require("express");
const router = express.Router()

const mongooseMdl = require("../data/db")

router.get("/", async (req, res) => {
    res.render("Signup")
});

router.get("/Login", (req, res) => {
    res.render("Login")
});

router.get("/update", (req, res) => {
    res.render("update")
});

// get data from signup page 
router.post("/", async (req, res) => {

    try {
        let password = req.body.password;
        let fixpassword = req.body.cpassword;

        if (password === fixpassword) {

            let login = await new mongooseMdl({

                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: password,
                cpassword: fixpassword

            });

            let register = await login.save();
             res.redirect("/Login")

        }

    } catch (error) {
        // res.status(500).send(error);
        console.log("--" + error);

    };

});

// login check
router.post("/login", async (req, res) => {

    try {
        let loginemail = req.body.logemail;
        let loginpassword = req.body.logpassword;

        const useremail = await mongooseMdl.findOne({ email: loginemail })

        if (useremail.password === loginpassword) {

            res.redirect("Fetch")
        } else {
            res.render("Login")
            // res.send("Invalid login details");
        }

    } catch (error) {
        res.status(400).send("invalid email" + error);
    }

})


router.get("/Fetch", async (req, res) => {
    mongooseMdl.find({}).then((value) => {
        res.render('Fetch', { userName: value });

    }).catch((error) => {
        res.send(error)
    })
});

router.get("/Update/:id", async (req, res) => {
    let { id } = req.params;
    await mongooseMdl.findById(id).then((value) => {
        if (value == null) {
            res.redirect("/")
        } else {
            res.render("Update", { user: value });
        }

    }).catch((error) => {

        res.redirect("/Login")
    })

})

// update user data 
router.post("/update/:id", async (req, res) => {
    let id = req.params.id;
    const newpassword = req.body.password;
    const newcpassword = req.body.cpassword;

    if (newpassword === newcpassword) {
        await mongooseMdl.findByIdAndUpdate(id, {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.newpassword,
            password: req.body.newcpassword


        }).then((value) => { }).catch((err) => { })
        res.redirect("/Fetch")

    } else {
        res.send("not match password")
    }

})


router.get("/delete/:id", async (req, res) => {
    let { id } = req.params;
    await mongooseMdl.findByIdAndDelete(id).then((value) => {
        console.log(value);
    }).catch((err) => {
        console.log("--" + err);

    })
    res.redirect("/Fetch")
})

module.exports = router;