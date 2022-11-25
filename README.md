## Getting started
This is your widget snippet.
Copy-paste it into the code of the pages you want to chat on.
Right before the ```</head>``` tag is the best option.
```html
<script>
  (function(c,r,m,f,d,e,v){c[d]=c[d]||{},e=r.createElement(m),v=r.getElementsByTagName(m)[0],e.async=1,e.src=f,v.parentNode.insertBefore(e,v)})
  (window,document,'script','https://warranty-service.netlify.app/c4d-warranty-SDK.js','C4DWarranty');
  C4DWarranty.config = {
    host: 'https://crm.gk-tis.ru', // URL to connect API
    baseUrl: '/api/hs/extint/api',
    widget: {
      enabled: true,
      button: {
        enabled: true,
        caption: 'гарантия',
        size: 80,
        fontSize: 8,
      }
    }
  }
</script>
```

### Inject by HTML attribute:
```html
<div c4d-warranty></div>
```

### Handler for the href attribute of the link:
```html
<a href="c4dWarranty">Show Widget</a>
```

### JS API method call:
```html
<button onclick="C4DWarranty.showWidget()">Show Widget</button>
```