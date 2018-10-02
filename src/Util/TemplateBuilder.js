class TemplateBuilder {
  static buildTemplate(layout, page) {
    const contents = layout.root
      .map(component => this.getElementHtml(component, page, layout))
      .join('');

    return `
      <html>
        ${this.getHead(layout)}
        ${this.getBody(contents)}
      </html>
    `;
  }

  static getHead(layout) {
    const fonts = this.getUsedFonts(layout).map(font => font.replace(' ', '+')).join('|');

    return `
      <head>
        <link href="https://fonts.googleapis.com/css?family=${fonts}" rel="stylesheet">
        <style>
          * { font-family: "Open Sans", sans-serif }
          html, body {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
    `;
  }

  static getBody(contents) {
    return `
      <body>
        <div style="position: relative;">
          ${contents}
        </div>
      </body>
    `;
  }

  static getElementHtml(component, page, layout, parent) {
    const selector = '#component-' + component.i;
    const style    = window.getComputedStyle(document.querySelector(selector));
    const content  = component.meta.tag ? `{{${component.meta.tag}}}` : component.meta.content;

    const textStyle = window.getComputedStyle(document.querySelector(selector + ' span'));

    let verticalAlign = '';

    if (component.meta.verticalAlignment === 'middle') {
      verticalAlign = '-webkit-transform: translateY(-50%)';
    }

    let styles = '';
    let position = 'absolute';

    if (!parent) {
      position = page.layoutRelative ? 'relative' : position;
    } else {
      position = parent.meta.layoutRelative ? 'relative' : position;
    }

    if (position === 'absolute') {
      styles += `
        -webkit-transform: ${style.getPropertyValue('transform')}; /** Required for PhantomJS */ 
        height: ${style.getPropertyValue('height')};
        overflow: hidden;
      `;
    } else if (position === 'relative') {
      styles += `
        display: block; 
        min-height: ${style.getPropertyValue('height')};
      `;
    }

    const children = (layout[component.i] || []).map(
      element => this.getElementHtml(element, page, layout, component)
    ).join('');

    return `
        <div style='
          position: ${position};
          ${styles}
          width: ${style.getPropertyValue('width')};
          font-size: ${style.getPropertyValue('font-size')};
          font-family: ${style.getPropertyValue('font-family')};
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          outline: 1px solid;
        '>
          <span style='
            position: relative;
            display: block;
            bottom: ${textStyle.getPropertyValue('bottom')}; 
            top: ${textStyle.getPropertyValue('top')}; 
            text-align: ${textStyle.getPropertyValue('text-align')};
            font-family: ${textStyle.getPropertyValue('font-family')};
            font-size: ${textStyle.getPropertyValue('font-size')};
            color: ${textStyle.getPropertyValue('color')};
            width: 100%;
            ${verticalAlign}
          '>
            ${content || ''}
          </span>
          
          ${children}
        </div>
      `;
  }

  static getUsedFonts(layout) {
    const fonts = [];

    Object.keys(layout).forEach(groupId => {
      return layout[groupId].forEach(e => {
        !fonts.includes(e.meta.fontFamily) && fonts.push(e.meta.fontFamily);
      })
    });

    return fonts;
  }
}

export default TemplateBuilder;