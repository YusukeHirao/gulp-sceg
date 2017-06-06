gulp-sceg
===

[![NPM version](https://badge.fury.io/js/gulp-sceg.svg)](http://badge.fury.io/js/gulp-sceg)

Styled content elements guide. [sceg](https://github.com/YusukeHirao/sceg) plugin for [gulp](https://github.com/gulpjs/gulp).

## Sample

[Element Guide (bootstrap sample)](https://yusukehirao.github.io/sceg/sample/)

## Uasge

```sh
$ npm install -D gulp gulp-sceg
```

```javascript
var gulp = require('gulp');
var sceg = require('gulp-sceg');

gulp.task('guide', function() {
  return gulp.src('./path/to/src/elements/*') // Content element files (require)
    .pipe(sceg({
      layout: './path/to/src/layout.pug', // Layout template (optional)
      filename: 'guide.html', // Output guide page file name (optional)
      type: 'html', // Output file format (optional 'html' or 'json')
      pugOption, // pug options @see https://pugjs.org/api/reference.html#options
      data: { /* ... */ } // Custom data that is usable variables on layout template (optional)
    }))
    .pipe(gulp.dest('./path/to/dest/')); // Output guide page directory
});
```

### Content element files

for example.

```txt
path/
└to/
  └src/
    └elements/
      ├00_h1.pug
      ├01_h2.pug
      ├02_h3.pug
      ├03_h4.pug
      ├04_h5.pug
      ├05_h6.pug
      ├10_ul-li.html
      ├11_ol-li.html
      ├12_dl-dd-dd.html
      ├20_table.pug
      ├21_table-caption.pug
      ├22_table-thead.pug
      └23_table-tfoot.pug
```

#### Format

##### html

```html
<!--
  # Title (require)
  @Category (optional)
  Markdown comments (optional)
-->
<element class="classes" attr="val">Lorem ipsum dolor sit amet...</element>
```

##### pug (jade)

```jade
//- # Title (require)
//- @Category (optional)
//- Markdown comments (optional)
element.classes(attr="val") Lorem ipsum dolor sit amet...
```

### Layout template

#### Binding data

```json
{
  "categories": [
    {
      "name": "${category-name}",
      "id": "${category-id}"
    },
    ...
  ],
  "contents": {
    "${category-name}": {
      "category": {
        "name": "${category-name}",
        "id": "${category-id}"
      }
      "el": [
        {
          "title": "${title}",
          "html": "${element-html-string}",
          "comment": "${comment-html-string}"
        },
        ...
      ]
    },
    "${category-name}": {
      ...
    },
  }
}
```

#### Format

### handlebars

```mustache
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-okaidia.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-markup.min.js"></script>
{{#each contents}}
<section>
  <h1><a id="{{category.id}}">{{category.name}}</a></h1>
  {{#each el}}
  <section>
    <h2>{{title}}</h2>
    <h5>Preview</h5>
    {{{html}}}
    <h5>Code</h5>
    <pre class="language-markup"><code class="language-markup">{{html}}</code></pre>
    <small>
      {{{comment}}}
    </small>
  </section>
  {{/each}}
</section>
{{/each}}
```

### pug (jade)

```jade
link(rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism.min.css')
link(rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-okaidia.min.css')
script(src='https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js')
script(src='https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-markup.min.js')
each content, category in contents
  section
    h1
      a(id=category.id)= category
    each el in content.el
      section
        h2= el.title
        h5 Preview
        !{el.html}
        h5 Code
        pre.language-markup
          code.language-markup el.html
        small !{el.comment}
```

* * *

&copy;YusukeHirao([@cloud10designs](https://twitter.com/cloud10designs)), MIT license.
