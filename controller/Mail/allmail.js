const { inbox } = require('./maillist');

const getMailboxEmails = (mailboxName, req, res) => {
    inbox(mailboxName, (err, messages) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: `Failed to fetch emails from ${mailboxName}`,
                error: err
            });
            return;
        }
        else if (messages.length === 0) {
            res.status(406).json({
                success: false,
                message: `${mailboxName} is empty`,
                data: messages
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `Succcessfully listed emails from ${mailboxName}`,
                data: messages
            });
        }

    });
};

const getAllMail = (req, res) => {
    getMailboxEmails('[Gmail]/All Mail', req, res);
};

const getInbox = (req, res) => {
    getMailboxEmails('INBOX', req, res);
};

const getSentMail = (req, res) => {
    getMailboxEmails('[Gmail]/Sent Mail', req, res);
};

const getDeletedMail = (req, res) => {
    getMailboxEmails('[Gmail]/Trash', req, res);
};

module.exports = { getAllMail, getInbox, getSentMail, getDeletedMail };
