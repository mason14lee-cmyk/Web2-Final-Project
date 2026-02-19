const port = 8080; // We'll run the server on port 8080

// IMPORTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// MIDDLEWARE

// allow the app to get data for form submits
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');
// ROUTES
app.get("/blog/:post", (req, res) => {
  console.log("The :post param is set to: " +  req.params.post);
  res.render("blog-post", {
    title: "Some Title",
    description: "Some Description",
    author: "Some Author",
    published: "Some Date",
    content: "Some content..."
  });
});

app.get('/blog', (req, res)=>{
  res.render('blog-list', {
    title: "Blog List"
  });
});

app.get("/blog/:post", (req, res) => {
   res.send("The <b>:post</b> param is set to: " +  req.params.post);
});

app.get('/contact', (req, res) => {
  res.render('contact', {
     title: "Contact Me"
  });
});

app.post('/contact/submit', (req, res) => {
  res.send("<h1>TODO: Handle contact form posts</h1>" + JSON.stringify(req.body));
});

// START THE SERVER
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});