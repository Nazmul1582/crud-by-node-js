const isAuthenticated = (req, res, next) =>{
    let username = 'admin';
    let password = 12345;
    let {user, pass } = req.query;
    if(user == username && pass == password){
        console.log('Welcome');
        next()
    }else{
        res.send('<h1>You are not an authenticated</h1>')
    }
}

module.exports = isAuthenticated;