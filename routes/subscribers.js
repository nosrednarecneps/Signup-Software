const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
require('dotenv').config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const isSendMail = (/true/).test(process.env.SENDMAIL);

function generateVerificationCode(length) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let verificationCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        verificationCode += characters[randomIndex];
    }
    return verificationCode;
}

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findOne({ email: req.body.email });
        if (!subscriber) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.subscriber = subscriber;
    next();
}

//testing function for verification code
async function sendMail(req, res, next) {
    let verificationCode;
    if (isSendMail === true) {
        verificationCode = generateVerificationCode(4);
        res.verificationCode = verificationCode;
    }
    else {
        console.log("Verification code could not be sent");
    }
    next();
}

//final function for verification code
/*
async function sendMail(req, res, next) {
    let verificationCode;
    if (isSendMail === true) {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: email,
                pass: password
            }
        }); 
        verificationCode = generateVerificationCode(4);
        const info = await transporter.sendMail({
            from: email,
            to: req.body.email,
            subject: "Email Verification",
            text: "Your verification code is " + verificationCode
        }); 
        res.verificationCode = verificationCode;
        console.log("Email sent: %s", info.messageId);
    }
    else {
        console.log("Verification code could not be sent");
    }
    next();
}
*/

//Login
router.post('/login', getSubscriber, async (req, res) => {
    try {
        if (await bcrypt.compare(req.body.password, res.subscriber.password)) {
            res.status(201).json({ message: 'Login Successful' });
        } else {
            res.status(400).json({ message: 'Login Failed' });
        }
    } catch (err) {
        res.status(500).send();
    }
})

//Register
router.post('/register', sendMail, async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const subscriber = new Subscriber({ 
            email: req.body.email, 
            password: hashedPassword,
            verificationCode: res.verificationCode
        });
        const userExist = await Subscriber.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        else if (isSendMail === true) {
            await subscriber.save();
            res.status(201).json({ message: 'User created' });
        }
        else {
            return res.status(500).json( { message: 'Verification code could not be processed'})
        }
    } catch (err) {
        res.status(400).send();
    }
})

//Verify
router.patch('/register/verify', getSubscriber, async (req, res) => {
    try {
        if (req.body.verificationCode === res.subscriber.verificationCode && res.subscriber.verified === false && (await bcrypt.compare(req.body.password, res.subscriber.password))) {
            res.subscriber.verified = true;
            await res.subscriber.save()
            res.status(201).json({ message: 'Verification Successful' });
        } else {
            res.status(400).json({ message: 'Verification Failed' });
        }
    } catch (err) {
        res.status(400).send();
    }
})

//Update password
router.patch('/account/update-password', getSubscriber, async (req, res) => {
    try {
        if (await bcrypt.compare(req.body.password, res.subscriber.password)) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
            res.subscriber.password = hashedPassword;
            await res.subscriber.save()
            res.status(201).json({ message: 'Password updated' });
        } else {
            res.status(400).send();
        }
    } catch (err) {
        res.status(500).send();
    }
});

//Update email
router.patch('/account/update-email', getSubscriber, async (req, res) => {
    try {
        if (await bcrypt.compare(req.body.password, res.subscriber.password)) {
            res.subscriber.email = req.body.newEmail;
            await res.subscriber.save()
            res.status(201).json({ message: 'Email updated' });
        } else {
            res.status(400).send();
        }
    } catch (err) {
        res.status(500).send();
    }
});

//Delete account
router.delete('/account/delete', getSubscriber, async (req, res) => {
    try {
        if (await bcrypt.compare(req.body.password, res.subscriber.password)) {
            await Subscriber.deleteOne({email: req.body.email});
            res.status(201).json({ message: 'Deletion Successful' });
        } else {
            res.status(400).json({ message: 'Deletion Failed' });
        }
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;