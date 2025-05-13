# ConnectLine Project

A modern web application built with Express.js and Handlebars (HBS) template engine, featuring a responsive design powered by Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 📝 Contact form with validation
- 🔄 HTMX integration for dynamic content
- 🏗️ Modular layout system with partials
- 🔒 Environment variable configuration
- 🚀 Development and production ready
- 🌙 Dark mode support
- 🌍 Multi-language support
- 📱 Mobile-friendly interface
- ⚡ Dynamic content with Alpine.js and HTMX
- 📊 Animated sections with AOS (Animate On Scroll)

## Project Structure

```
├── views/
│   ├── layouts/      # Layout templates
│   ├── partials/     # Reusable components
│   ├── telemarketing/# Telemarketing service pages
│   ├── web/         # Web service pages
│   ├── contact.hbs  # Contact page
│   └── index.hbs    # Home page
├── public/          # Static assets
├── server.js        # Main application file
└── package.json     # Project dependencies
```

### Telemarketing Services
- Customer Support
- Lead Generation
- Outbound Calls

### Web Services
- Custom Development
- E-commerce Solutions
- Web Design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd connectsLine
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your configuration.

## Development

Run the development server:
```bash
npm run dev
```

This will start:
- The Express server with nodemon for auto-reloading
- Tailwind CSS in watch mode for style updates

## Production

Start the production server:
```bash
npm start
```

## Environment Variables

Required environment variables:
- `COMPANY_ADDRESS`
- `COMPANY_EMAIL`
- `COMPANY_PHONE`
- `FACEBOOK_URL`
- `TWITTER_URL`
- `LINKEDIN_URL`

## Technologies Used

- Express.js - Web framework
- Handlebars (HBS) - Template engine
- Tailwind CSS - Utility-first CSS framework
- HTMX - Dynamic content loading
- Joi - Data validation
- dotenv - Environment configuration

