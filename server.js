const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const Joi = require('joi');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();

// Load environment variables
dotenv.config();

// Configure rate limiter
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 2, // limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again after a minute',
    standardHeaders: true,
    legacyHeaders: false,
});


// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contact form validation schema
const contactSchema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    phone: Joi.string().pattern(/^[0-9+\-\s()]*$/).min(10).max(15),
    subject: Joi.string().required().min(3).max(100),
    message: Joi.string().required().min(10).max(1000)
});

// Validation middleware
const validateContact = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
        return res.status(200).render('partials/htmx-contact-form', { 
            success: false,
            error: error.details[0].message,
            formData: req.body,
            layout: false
        });
    }
    next();
};

// Newsletter validation schema
const newsletterSchema = Joi.object({
    email: Joi.string().required().email()
});

// Newsletter validation middleware
const validateNewsletter = (req, res, next) => {
    const { error } = newsletterSchema.validate(req.body);
    if (error) {
        return res.status(200).render('partials/htmx-newsletters-form', { 
            success: false,
            error: error.details[0].message,
            formData: req.body,
            layout: false
        });
    }
    next();
};

// Function to find a free port
function findFreePort(startPort) {
    return new Promise((resolve, reject) => {
        const net = require('net');
        const server = net.createServer();
        
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                // Port is in use, try the next one
                findFreePort(startPort + 1).then(resolve).catch(reject);
            } else {
                reject(err);
            }
        });

        server.listen(startPort, () => {
            server.close(() => {
                resolve(startPort);
            });
        });
    });
}

// Set Handlebars as the view engine
app.engine('hbs', exphbs.engine({ 
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        eq: function (v1, v2) {
            return v1 === v2;
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to pass environment variables to all routes
app.use((req, res, next) => {
    res.locals.companyAddress = process.env.COMPANY_ADDRESS;
    res.locals.companyEmail = process.env.COMPANY_EMAIL;
    res.locals.companyPhone = process.env.COMPANY_PHONE;
    res.locals.facebookUrl = process.env.FACEBOOK_URL;
    res.locals.twitterUrl = process.env.TWITTER_URL;
    res.locals.linkedinUrl = process.env.LINKEDIN_URL;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Portfolio
app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});

// Telemarketing routes
app.get('/telemarketing/customer-support', (req, res) => {
    res.render('telemarketing/customer-support');
});

app.get('/telemarketing/lead-generation', (req, res) => {
    res.render('telemarketing/lead-generation');
});

app.get('/telemarketing/outbound-calls', (req, res) => {
    res.render('telemarketing/outbound-calls');
});

app.get('/telemarketing/email-marketing', (req, res) => {
    res.render('telemarketing/email-marketing');
});

app.get('/telemarketing/seo', (req, res) => {
    res.render('telemarketing/seo');
});

// Web services routes
app.get('/web/custom-development', (req, res) => {
    res.render('web/custom-development');
});

app.get('/web/e-commerce', (req, res) => {
    res.render('web/e-commerce');
});

app.get('/web/web-design', (req, res) => {
    res.render('web/web-design');
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        subject: req.query?.subject
    });
});

app.post('/contact', limiter, validateContact, async (req, res) => {
    res.render('partials/htmx-contact-form', { 
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        layout: false,
        subject: req.query?.subject
    });
});

// Newsletters
app.post('/newsletter', limiter, validateNewsletter, async (req, res) => {
    res.render('partials/htmx-newsletters-form', { 
        success: true,
        message: 'Thank you for subscribing to our newsletter!',
        layout: false
    });
});

// Start server with a free port
findFreePort(3000)
    .then(port => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
    }); 