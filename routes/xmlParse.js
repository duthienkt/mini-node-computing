const XMLParser = require('../lib/absol/XML/XML');
module.exports = function (app) {
    app.use('/parse', function (req, res) {
            var text = typeof (req.body) == 'string' ? req.body : req.body.xmlText;
            var startTime = new Date().getTime();
            var result = XMLParser.parse(text);
            var endTime = new Date().getTime();
            if (res) {
                res.send(JSON.stringify({
                    result: result,
                    parseTime: endTime - startTime
                }));
            }
            else
                res.send(JSON.stringify({
                    error: 'Fail to parse'
                }));
        }
    );
}
