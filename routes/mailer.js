const nodemailer = require('nodemailer');

const config = {
    transporter: {
        host: "demo_server_abc.com",
        port: 465,
        secure: true,
        auth: {
            user: 'info@hiddendomain.com',
            pass: 'your_password'
        },
        logger: true,
        debug: false // include SMTP traffic in the logs
    },
    name: 'Mini Node'
}

module.exports = function (app) {
    app.use('/send_mail', function (req, res) {
        var transporterConfig = Object.assign({
            logger: true,
            debug: false
        },  config.transporter, req.body.transporter);
        if (transporterConfig.host === config.transporter.host){
            res.json({
                status: 'FAIL',
                error: 'Invalid param transporter'
            })
            return ;
        }
        var name = req.body.name || config.name;

        let transporter = nodemailer.createTransport(
            transporterConfig,
            {
                // default message fields
                // sender info
                from: `${name} <${transporterConfig.auth.user}>`,
                headers: {
                    'X-Sender-Server': 'express-nodemailer',
                    'X-Laziness-level': 1000
                }
            }
        );
        var to = req.body.to;
        if (typeof to === "string") {
            to = to.trim();
            if (to.length === 0) {
                res.json({
                    status: 'FAIL',
                    error: 'Invalid param to:' + to
                })
                return;
            }
        }
        else if (to instanceof Array) {
            if (to.length === 0) {
                res.json({
                    status: 'FAIL',
                    error: 'Invalid param, to.length == 0'
                })
            }
            to = to.join(', ');
        }
        else {
            res.json({
                status: 'FAIL',
                error: 'Invalid param to:',
                error_1: JSON.stringify(to)
            });
            return;
        }

        var cc = req.body.cc;
        if (typeof cc == 'string') {
            cc = cc.trim();
        }
        else if (cc instanceof Array) {
            cc = cc.join(', ');
        }

        var bcc = req.body.bcc;
        if (typeof bcc == 'string') {
            bcc = bcc.trim();
        }
        else if (cc instanceof Array) {
            bcc = bcc.join(', ');
        }


        let message = {
            // Comma separated list of recipients
            to: to,
            // Subject of the message
            subject: req.body.subject,
            // HTML body
            html: (req.body.html || '<p>Empty message</p><p>')
        };
        if (cc) message.cc = cc;
        if (bcc) message.bcc = bcc;

        var attachedSync = [];
        if (req.body.attachments) {
            message.attachments = req.body.attachments.map(function (item) {
                var attachment = { filename: item.filename };
                if (item.type === 'base64') {
                    attachment.content = Buffer.from(item.content, 'base64')
                }
                else if (item.type === 'url') {
                    attachment.path = encodeURI(item.url);
                }
                return attachment;
            })
        }

        Promise.all(attachedSync).then(function () {
            var downloadError = message.attachments.reduce(function (ac, cr) {
                if (cr.error) {
                    ac.push(cr.name);
                }
                return ac;
            }, []);
            if (downloadError.level > 0) {
                res.json({
                    status: 'FAIL',
                    error: " Can not download files: " + downloadError.json(', ')
                });
            }
            else {
                transporter.sendMail(message, (error, info) => {
                    var resolveData = {};
                    if (error) {
                        resolveData.error = error.message;
                        resolveData.status = "FAIL";
                    }
                    else {
                        resolveData.status = "SUCCESS";
                    }
                    transporter.close();
                    res.json(resolveData);
                });
            }
        });
    });
}