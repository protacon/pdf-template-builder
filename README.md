# What is this

Template builder for [pdf-storage](https://github.com/protacon/pdf-storage)

## Table of contents

* [What is this?](#what-is-this)
  * [Table of Contents](#table-of-contents)
* [Usage](#usage)
  * [Public API](#public-api)
* [Development](#development)
  * [Requirements](#requirements)
  * [Getting started](#getting-started)

  
# Usage

The `pdf-template-builder` is designed to be used as a embedded tool inside other applications
communicating with the [pdf-storage](https://github.com/protacon/pdf-storage) service.

1. Include necessary files to your own application `(build/static/[css|js])`
```html
<link rel="stylesheet" type="text/css" href="path/to/package/style.css" />
<script type="text/javascript" src="path/to/package/script.js"></script>
```

2. Add the root element to your destination page

```html
<div id="root"></div>
```

3. Initialize and the application when you are ready

```javascript
const builder = new PdfTemplateBuilder();

// Render to #root
builder.render();

// Render to where ever you want
builder.render(document.getElementById('your-div'));
```

4. Configure
```javascript
builder.configure({
  pdfStorageUri: 'https://pdfstorage.yourservice.fi/v1/pdf/groupId'
});
```

## Public API

The `PdfTemplateBuilder` class instance exposes few methods for configuration and the response handling.

```javascript
// Configure the template builder
builder.configure({
  pdfStorageUri: 'https://pdfstorage.yourservice.fi/v1/pdf/groupId', // Your instance of pdf storage,
  onSaveTemplate: function() {
    // Defining this callback function will enable
    // the save button in the builder toolbox.
    // This callback will be called when user clicks that button
    // so you can do perform required actions to store the template
  },
  language: 'en' // en|fi
});

// Get the result template
builder.getTemplateHtml();

// Export template layout as object
builder.exportTemplate();

// Import template layout from object
builder.importTemplate(config);
```

## Enabling preview
Preview may be enabled by configuring the publicly available pdf storage service URI (see [public api](#public-api))

# Development

## Requirements

You'd better to have [node.js](https://nodejs.org/en/) installed.

## Getting started

To get started with the development run following commands

```
npm install
npm start
```

and navigate to the `http://localhost:3000` with your favourite browser.

## Environment variables

When running locally within no other service some configuration
may be done using the environment variables. Just create a copy of the `.env` file to `.env.local` and make your changes. **Whenever you modify the .env you need to restart the build process (`npm start` again)**.

```
REACT_APP_PDF_STORAGE_URI=https://pdf-storage.protacon.com/v1/pdf/groupId   The uri of some available pdf storage service
REACT_APP_MODE=standalone  The application mode (standalone, embedded)
```
