const axios = require('axios');
const PORT = 3007;

module.exports.getProduct = function (req, res) {

    axios({
        url: `http://localhost:${PORT}/api/products/getproduct?id=${req.query.id}`,
        method: 'GET',
    }).then(
        response => {
            
            // let imageBlob = new Blob([new Uint8Array(response.data.image.data)], {
				// type: "image/jpeg"
			// });
// 
			// let image = URL.createObjectURL(imageBlob);

            res.render('product.pug', Object.assign(response.data, {}));

        },
        err => {
            console.log('Ошибка ' + err.message);
            res.json(
                err.response.data
            )
        }
    ).catch(
        err => {
            console.log('Ошибка ' + err.message);
        }
    )
   
};

