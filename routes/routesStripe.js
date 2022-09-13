const { Router } = require("express");

const Stripe = require('stripe')

const router = Router();

const stripe = new Stripe("sk_test_51Lgvm7FNV3brqOrQcBGGJTYhREYOAa3bUfwMh16NYL404FFfC7ALHjIwu2LjdJ5EeznkkdUX4wlRequzhE4EzTMs00hjEt6ZZv")

router.post("/checkout", async (req, res) => {
    const {id, amount} = req.body

   try {
	 await stripe.paymentIntents.create({
	        amount,
	        curency: "USD",
	        description: "shoes",
	        payment_method: id,
	        confirm: true
	    })
	    res.send({message: 'succesfull payment'})
} catch (error) {
	res.json({message: error})
}
  });

router.get("/checkout", async (req, res) => {
   

    res.json({message:"funciona la ruta"})
    
  });

module.exports = router;
