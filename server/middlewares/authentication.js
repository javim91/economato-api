const jwt = require('jsonwebtoken');

// TOKEN VERIFICATION

let verifyToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El token no es válido'
                }
            });
        }

        req.user = decoded.user;
        next();

    });

};

// VERIFY ADMIN ROLE
let verifyAdminRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });

    }
};



module.exports = {
    verifyToken,
    verifyAdminRole
}