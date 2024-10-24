const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Paystack Callback URL endpoint
app.post("/paystack/callback", (req, res) => {
  const paymentData = req.body;

  // Verify payment status from Paystack
  if (
    paymentData &&
    paymentData.data &&
    paymentData.event === "charge.success"
  ) {
    const transactionReference = paymentData.data.reference;
    console.log(`Transaction successful: ${transactionReference}`);

    // You can now update your database or take further actions
    res.status(200).send("Payment successful!");
  } else {
    res.status(400).send("Invalid Payment Data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
