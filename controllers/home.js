module.exports.getHome = function (req, res) {
    
    //if (!req.session.isAdmin === true) return res.redirect('/');
    
    res.render('home.pug', {
        header: 'Hello'
    });
};