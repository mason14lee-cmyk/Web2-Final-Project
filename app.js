require('dotenv').config();
const path = require("path");
const port = 8080; // We'll run the server on port 8080
debugger

// IMPORTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {getBlogList, convertMarkdown} = require("./modules/markdown-helpers")
const pathToBlogFolder = __dirname + '/blog/';
const fs = require("fs");
const readingTime = require("reading-time");

// etc...
// MIDDLEWARE
app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  res.locals.current = "";
  next();
});

app.use((req, res, next) => {
  res.locals.current = "";
  next();
});

// Redirect to HTTPS
app.use((req, res, next) => {
   if (process.env.NODE_ENV === 'production') {
      if (req.headers['x-forwarded-proto'] !== 'https')
         // the statement for performing our redirection
         return res.redirect('https://' + req.headers.host + req.url);
      else
         return next();
   }else{
      return next();
   }
});

// allow the app to get data for form submits
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

// ROUTES

const newsletterRoute = require("./routes/newsletter");

app.use(express.urlencoded({ extended: true }));

app.use("/newsletter", newsletterRoute);

app.get("/blog", (req, res) => {
  const posts = getBlogList(pathToBlogFolder);
  res.render("blog-list", { title: "Blog", current: "blog", posts });
});





const blogList = getBlogList(pathToBlogFolder);

app.get('/', (req, res) => {
  const blogList = getBlogList(pathToBlogFolder);
  console.log("homepage bloglist:", blogList)
  res.render('home', {
    title: "My Home Page",
    current: "home",
    posts: blogList.slice(0, 3) // latest 3
  });
});

app.get('/blog', (req, res) => {
  const blogList = getBlogList(pathToBlogFolder);

  res.render('blog-list', {
    title: "Blog",
    current: "blog",
    posts: blogList,
    query: req.query.q || ""
  });
});

app.get("/blog/:post", (req, res) => {
  try {
   const path = require("path");

const pathToFile = path.join(
  pathToBlogFolder,
  req.params.post + ".md"
);

    console.log("Markdown file: " + pathToFile);

    const obj = convertMarkdown(pathToFile);

    res.render('blog-post', {
      title: obj.data.title,
      current: "blog",   // keeps Blog highlighted

      description: obj.data.description,
      author: obj.data.author,
      published: obj.data.published,
      content: obj.html
    });

  } catch (error) {
    console.log(error);
    res.status(404).redirect("/404");
  }
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: "Contact",
    current: "contact",
    errors: {},          // default empty object
    old: {}              // default empty object
  });
});

app.post('/contact/submit', (req, res) => {

  // import the helper functions
  const { isValidContactFormSubmit, sendEmailNotification } = require("./modules/contact-helpers");

  // Destructure form data
  const { firstName, lastName, email, comments } = req.body;

  // Build an errors object
  const errors = {};

  if (!firstName || firstName.trim() === "") errors.firstName = "First name is required";
  if (!lastName || lastName.trim() === "") errors.lastName = "Last name is required";
  
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!comments || comments.trim() === "") errors.comments = "Comments cannot be empty";

  // If there are errors, re-render the contact form with errors + old values
  if (Object.keys(errors).length > 0) {
    return res.render('contact', {
      title: "Contact",
      errors,
      old: { firstName, lastName, email, comments },
      current: "contact"
    });
  }

  // If the form is valid, send the email
  const message = `From: ${firstName} ${lastName}\n
Email: ${email}\n
Message: ${comments}`;

  sendEmailNotification(message, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).render('contact', {
        title: "Contact",
        errors: { send: "There was an error sending your message. Please try again later." },
        old: { firstName, lastName, email, comments },
        current: "contact"
      });
    }

    // Success → render confirmation page
    res.render("default-layout", {
      title: "Contact Confirmation",
      content: "<h2>Thank you for contacting me!</h2><p>I'll get back to you ASAP.</p>"
    });
  });

});


app.get("/404", (req, res) => {
  res.status(404);
  res.render('default-layout', {
     title: "Page Not Found",
     content: "<h1>Sorry!</h1><h3>We can't find the page you're requesting.</h3>"
  });
});

 
app.all('/*path', (req, res) => {
  res.status(404).redirect("/404");
});


// START THE SERVER
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});

