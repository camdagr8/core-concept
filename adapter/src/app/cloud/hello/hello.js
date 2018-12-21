Parse.Cloud.define('hello', (req, res) => {
    res.success({
        msg: "Hey Guys!"
    });
});
