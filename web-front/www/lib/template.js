module.exports = {
    HTML:function(title, body, control, authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        ${authStatusUI}
        <h1></h1>
        ${control}
        ${body}
      </body>
      </html>
      `;
    }
  }