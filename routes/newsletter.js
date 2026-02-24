const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.redirect("/contact?error=newsletter");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "📬 New Newsletter Subscriber",
      html: `
        <h2>New Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
      `
    });

    res.redirect("/contact?success=newsletter");

  } catch (err) {
    console.log(err);
    res.redirect("/contact?error=newsletter");
  }
});

module.exports = router;