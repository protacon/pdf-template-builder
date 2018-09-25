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

3. Configure
```javascript
(function() {
  'use strict';
  
  window.pdfTemplateBuilder.configure({
    pdfUri: 'https://pdfstorage.yourservice.fi/v1/pdf/groupId'
  });
})();
```

## Public API

The global `pdfTemplateBuilder` object exposes few methods for configuration and the response handling.

```javascript
// Configure the template builder
window.pdfTemplateBuilder.configure({
  pdfUri: 'https://pdfstorage.yourservice.fi/v1/pdf/groupId', // Your instance of pdf storage
});

// Get the result template
window.pdfTemplateBuilder.getTemplateHtml();
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
