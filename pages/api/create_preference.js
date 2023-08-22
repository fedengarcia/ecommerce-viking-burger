// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: process.env.ACCESS_TOKEN_PROD //DEV or PROD
});
// {
// 	"collector_id": 202809963,
// 	"items": [
// 	  {
// 		"title": "Dummy Item",
// 		"description": "Multicolor Item",
// 		"currency_id": "$",
// 		"quantity": 1,
// 		"unit_price": 10
// 	  }
// 	],
// 	"payer": {
// 	  "phone": {},
// 	  "identification": {},
// 	  "address": {}
// 	},
// 	"back_urls": {},
// 	"payment_methods": {
// 	  "excluded_payment_methods": [
// 		{}
// 	  ],
// 	  "excluded_payment_types": [
// 		{}
// 	  ]
// 	},
// 	"client_id": 6295877106812064,
// 	"marketplace": "MP-MKT-6295877106812064",
// 	"marketplace_fee": 0,
// 	"shipments": {
// 	  "receiver_address": {}
// 	},
// 	"statement_descriptor": "MERCADOPAGO",
// 	"date_created": "2018-02-02T19:22:23.535Z",
// 	"id": "202809963-920c288b-4ebb-40be-966f-700250fa5370",
// 	"init_point": "https://www.mercadopago.com/mla/checkout/start?pref_id=202809963-920c288b-4ebb-40be-966f-700250fa5370",
// 	"sandbox_init_point": "https://sandbox.mercadopago.com/mla/checkout/pay?pref_id=202809963-920c288b-4ebb-40be-966f-700250fa5370",
// 	"metadata": {}
//   }

export default function create_preference(req, res) {
	const newItemsArray = () => {
		let itemsCopy = req.body.items 
		req.body.items.forEach((element,index) => {
			itemsCopy[index].title = (element.adicionales && element.adicionales.length !== 0) ? element.title + ' & adicionales' : element.title
		})
		return itemsCopy
	};
	const items = newItemsArray()

	return new Promise((resolve, reject) => {
		let preference = {
			items: items,
			payer: req.body.payer,
			back_urls: {
				"success": `https://vikingspage.vercel.app/StatusCompra?keyword=success&idCompra=${req.body.id}&pago=mp`,
				"failure": `https://vikingspage.vercel.app/StatusCompra?keyword=failure&idCompra=${req.body.id}`,
			},
			payment_methods: {
				"excluded_payment_types": [
					{
						"id": "credit_card"
					}]
			},
			auto_return: "approved",
		};
		
		mercadopago.preferences.create(preference)
		.then(function (response) {
			res.statusCode = 200
			res.setHeader('Content-type','application/json')
			res.json({
				id: response.body.id,
				redirect: response.body.init_point
			});
			resolve();

		}).catch(function (error) {
			console.log("TU ERROR ------------>",error)
			res.json(error);
			res.status(405).end();
			resolve();
		});

	});
}