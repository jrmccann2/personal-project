const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();
let {EMAIL_ADDRESS, EMAIL_PASSWORD} = process.env
const saltRounds = 14;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${EMAIL_ADDRESS}`,
        pass: `${EMAIL_PASSWORD}`
       }
   });

module.exports = {

    register: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const {username, email, password} = req.body;
        const mailOptions = {
            from: 'The And-one Team',
            to: email,
            subject: 'Welcome to And-one Analytics!',
            html: `<p style='font-family: Sans-serif; color: #bada55; background-color: grey; font-size: 14px; text-align: center'>Thank you ${username} for registering with us! Your account is now activated, start adding teams and tracking their improvement.</p>`
          };
        // console.log(username, email, password)

        bcrypt.hash(password, saltRounds, function (err, hash){
            // console.log(hash)

            dbInstance.register_coach([ username, email, hash ])
              .then( (coach) => {
                req.session.user = coach[0]
                transporter.sendMail(mailOptions, (err, info) => {
                    if(err){
                        console.log(err)
                    } else {
                        console.log(info)
                    }
                })
                // console.log(req.session.user);
                res.status(200).send(coach[0])
              })
              .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err)
              });

        })
    
    },
    
    login: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {username, password} = req.body;
        console.log(username, password)

        dbInstance.login_coach([ username ])
            .then( coach => {
                // console.log(coach)
                if(!coach[0]){
                    // Checks if user exists, sends 401 if falsy
                    res.sendStatus(401)
                } else {
                    bcrypt.compare(password, coach[0].p_word, (err, result) => {
                        if (result === true) {
                            // If user exists and passwords match sends 200
                            req.session.user = coach[0]
                            res.status(200).send(coach[0])
                        } else {
                            // If user exists and passwords don't match sends 401
                            res.sendStatus(401)
                        }
                    })
                }
            })
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err)
            });
    },

    coach_session: (req, res, next) => {
        const {user} = req.session
        
        if(user) {
            res.status(200).send(user);
        } else {
            res.sendStatus(401)
        }
    },

    updateEmail: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {coach_id, newEmail} = req.body;

        dbInstance.update_email([coach_id, newEmail])
            .then( () => res.sendStatus(200))
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err)
            })
    },

    signout: (req, res, next) => {
        req.session.destroy();
        res.sendStatus(200)
    }

}