const Imap = require('node-imap');
const inspect = require('util').inspect;

const inbox = (mailboxName, callback) => {
    const imap = new Imap({
        user: process.env.USERMAIL,
        password: process.env.PASS,
        host: process.env.HOSTMAIL,
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
    });

    function openInbox(cb) {
        imap.openBox(mailboxName, true, cb);
    }

    imap.once('ready', function () {
        openInbox(function (err, box) {
            if (err) {

                imap.end();
                callback(err, []);    
                return;
            }

            imap.search(['ALL'], function (err, results) {
                if (err) {
                    imap.end();
                    callback(err, []);    
                   return;
                }

                if (results.length === 0) {
                    imap.end();
                    callback(null, []);
                    return;
                }

                var f = imap.fetch(results, {
                    bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
                    struct: true
                });

                let messages = [];

                f.on('message', function (msg, seqno) {
                    console.log('Message #%d', seqno);
                    var prefix = '(#' + seqno + ') ';
                    let message = {
                        headers: null,
                        body: ''
                    };
                    msg.on('body', function (stream, info) {
                        var buffer = '';
                        stream.on('data', function (chunk) {
                            buffer += chunk.toString('utf8');
                        });
                        stream.once('end', function () {
                            if (info.which === 'TEXT') {
                                const combinedRegex = /(<style[^>]*>[\s\S]*?<\/style>)|(<[^>]+>[\s\S]*?<\/[^>]+>)/g;
                                const extractedParts = buffer.toString().match(combinedRegex);
                                if (extractedParts) {
                                    // console.log('Extracted Parts:', extractedParts);
                                    const bodyContent = extractedParts.join('');
                                    // console.log('Body Content:', bodyContent);

                                    message.body = bodyContent;
                                }

                            } else {
                                message.headers = Imap.parseHeader(buffer);

                            }
                        });
                    });
                    msg.once('end', function () {
                        messages.push(message);
                    });
                });

                f.once('error', function (err) {
                    callback(err, null);
                    imap.end();
                });

                f.once('end', function () {
                    callback(null, messages);
                    imap.end();
                });
            });
        });
    });

    imap.once('error', function (err) {
        callback(err, null);
    });

    imap.once('end', function () {
        console.log('Connection ended');
    });

    imap.connect();
}

module.exports = { inbox };



