const XMLParser = require('../lib/absol/XML/XML');
module.exports = function (app) {
    app.use('/parse', function (req, res) {
        if (typeof (req.body) == 'string') {
            var startTime = new Date().getTime();
            var result = XMLParser.parse(req.body);
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
        else {
            res.send(JSON.stringify({
                error: 'Invalid params'
            }));
        }
    });
}
