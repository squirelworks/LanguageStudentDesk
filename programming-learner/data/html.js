// HTML and CSS course for the Programming Learner. Written for this project.
// Every example is a whole page, shown on the course page as a live preview.
// tools/run_html.py loads each one in headless Chromium and checks the text it
// shows (the `out` and `check` values) against the page's innerText.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.html = {
  id: "html",
  name: "HTML and CSS",
  title: "HTML and CSS: building web pages",
  intro:
    "Every web page is made of two languages working together. <b>HTML</b> (HyperText Markup Language), invented by Tim Berners-Lee in 1991 along with the web itself, says what each part of the page <i>is</i>: a heading, a paragraph, a link, a list, a form. <b>CSS</b> (Cascading Style Sheets), added in 1996, says how those parts should <i>look</i>: colours, fonts, spacing and layout. Neither is a programming language in the usual sense, since they describe a page instead of giving steps, but every web developer writes them every day, and JavaScript and PHP pages are built on them. Each example here is a complete page, and the box under it shows the page as a browser draws it. To try one yourself, save it as <code>page.html</code> and open the file in any web browser; change something, save, and reload.",
  comment: "<!--",
  preview: true,
  keywords: [
    "html", "head", "body", "title", "meta", "link", "style", "h1", "h2", "p", "a", "ul", "ol", "li", "img", "div", "span",
    "header", "nav", "main", "section", "footer", "table", "tr", "td", "th", "form", "label", "input", "button", "select", "option",
    "fieldset", "legend", "textarea", "datalist", "details", "summary", "article", "caption",
  ],
  builtins: [
    "color", "background", "font-size", "font-family", "margin", "padding", "border", "display", "flex", "grid", "width", "gap",
    "aria-label", "aria-labelledby", "scope", "placeholder", "autocomplete", "outline", ":focus", ":target", ":hover",
  ],
  lessons: [
    {
      id: "first",
      title: "Your first page",
      summary: "Tags, elements, and the skeleton every page shares.",
      sections: [
        {
          p: "HTML marks up text with <b>tags</b> in angle brackets. Most come in pairs: <code>&lt;p&gt;</code> opens a paragraph and <code>&lt;/p&gt;</code> closes it, and everything between is the <b>element</b>'s content. <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> are headings from biggest to smallest. The first line says the file is modern HTML, <code>&lt;head&gt;</code> holds facts about the page such as its <code>&lt;title&gt;</code> (shown on the browser tab), and <code>&lt;body&gt;</code> holds what appears on the page. <code>&lt;!-- ... --&gt;</code> is a comment.",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hazel's page</title>
</head>
<body>
  <!-- Everything visible goes in the body -->
  <h1>Hello, squirrel!</h1>
  <p>This is my first web page.</p>
  <p>It has two paragraphs.</p>
</body>
</html>`,
          out: "Hello, squirrel!\n\nThis is my first web page.\n\nIt has two paragraphs.",
        },
        {
          h: "Spaces and line breaks",
          p: "The browser treats any run of spaces and line breaks in the HTML as a single space, and it wraps lines to fit the window. So the layout of your HTML file doesn't decide where lines break on the page: elements do. Use separate <code>&lt;p&gt;</code> elements for paragraphs, and <code>&lt;br&gt;</code> for a line break inside one, such as in an address or a poem. <code>&lt;br&gt;</code> has no closing tag, because it has no content.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <p>These     words
     are spread    over
     three lines.</p>
  <p>Oak Tree<br>Hollow Lane<br>The Wood</p>
</body>
</html>`,
          out: "These words are spread over three lines.\n\nOak Tree\nHollow Lane\nThe Wood",
        },
      ],
      practice: [
        { kind: "output", q: "What text does this page show?", code: `<!DOCTYPE html>
<html>
<head><title>Stash</title></head>
<body>
  <h1>My   stash</h1>
  <!-- <p>secret</p> -->
  <p>Twelve nuts.</p>
</body>
</html>`, options: ["My stash\nTwelve nuts.", "Stash\nMy stash\nTwelve nuts.", "My   stash\nsecret\nTwelve nuts.", "My stash\nsecret\nTwelve nuts."], answer: "My stash\nTwelve nuts.", check: "My stash\n\nTwelve nuts.", why: "The title appears on the browser tab, not the page. The comment is hidden, and the extra spaces collapse into one." },
        { q: "Where does the content you want people to see go?", options: ["Inside <body>", "Inside <head>", "Inside <title>", "After </html>"], answer: "Inside <body>", why: "<head> holds information about the page, such as its title and character set. <body> holds what is drawn." },
      ],
    },
    {
      id: "text",
      title: "Links, lists and images",
      summary: "Emphasis, links, lists, images and attributes.",
      sections: [
        {
          p: "<code>&lt;strong&gt;</code> marks important text (shown bold) and <code>&lt;em&gt;</code> marks emphasis (shown in italics). Extra information goes in <b>attributes</b> inside the opening tag, written <code>name=\"value\"</code>. A link is an <code>&lt;a&gt;</code> element whose <code>href</code> attribute gives the address to go to; the text between the tags is what you click.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <p>Bury nuts <strong>before</strong> the first frost, <em>not</em> after.</p>
  <p>Read more on <a href="https://en.wikipedia.org/wiki/Squirrel">Wikipedia</a>.</p>
  <p><a href="#tips">Jump to the tips</a></p>
  <h2 id="tips">Tips</h2>
  <p>Pick a spot you will remember.</p>
</body>
</html>`,
          out: "Bury nuts before the first frost, not after.\n\nRead more on Wikipedia.\n\nJump to the tips\n\nTips\n\nPick a spot you will remember.",
        },
        {
          h: "Lists",
          p: "<code>&lt;ul&gt;</code> is an unordered list, shown with bullets, and <code>&lt;ol&gt;</code> an ordered list, numbered for you. Each item is an <code>&lt;li&gt;</code>. Lists can be nested by putting a whole list inside an item.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <h2>Shopping</h2>
  <ul>
    <li>Acorns</li>
    <li>Hazelnuts
      <ul>
        <li>shelled</li>
      </ul>
    </li>
  </ul>
  <h2>Steps</h2>
  <ol>
    <li>Dig</li>
    <li>Drop the nut in</li>
    <li>Cover it up</li>
  </ol>
</body>
</html>`,
          out: "Shopping\nAcorns\nHazelnuts\nshelled\nSteps\nDig\nDrop the nut in\nCover it up",
        },
        {
          h: "Images",
          p: "<code>&lt;img&gt;</code> shows a picture from the file or address in <code>src</code>. It has no closing tag. The <code>alt</code> attribute describes the picture in words: screen readers read it aloud to people who can't see the screen, and the browser shows it when the picture can't load, as it can't here because the file doesn't exist. Always write a useful <code>alt</code>.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <img src="hazel.jpg" alt="A red squirrel holding a hazelnut" width="200">
  <p>Hazel, last autumn.</p>
</body>
</html>`,
          out: "Hazel, last autumn.",
        },
      ],
      practice: [
        { kind: "output", q: "What text does this page show?", code: `<!DOCTYPE html>
<html>
<body>
  <ol>
    <li>oak</li>
    <li>ash</li>
  </ol>
</body>
</html>`, options: ["1. oak\n2. ash", "oak\nash", "• oak\n• ash", "<li>oak</li>\n<li>ash</li>"], answer: "1. oak\n2. ash", check: "oak\nash", why: "An ordered list numbers its items for you. The page shows the numbers even though the HTML doesn't contain them." },
        { q: "What is the alt attribute of an image for?", options: ["Describing the image for people and programs that can't see it", "Setting the image's size", "A second image to try", "The image's file name"], answer: "Describing the image for people and programs that can't see it", why: "Screen readers read alt aloud, and browsers show it when the image fails to load." },
      ],
    },
    {
      id: "structure",
      title: "Page structure and tables",
      summary: "header, nav, main, section, footer, and tables for data.",
      sections: [
        {
          p: "Modern HTML has elements that say what part of the page something is: <code>&lt;header&gt;</code> for the top, <code>&lt;nav&gt;</code> for the main links, <code>&lt;main&gt;</code> for the page's own content, <code>&lt;section&gt;</code> and <code>&lt;article&gt;</code> to divide it up, and <code>&lt;footer&gt;</code> for the bottom. They look like plain blocks, but screen readers and search engines use them to understand the page. <code>&lt;div&gt;</code> is a block with no meaning, used only for styling.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <header>
    <h1>The Drey</h1>
    <nav><a href="#nuts">Nuts</a> | <a href="#trees">Trees</a></nav>
  </header>
  <main>
    <section id="nuts">
      <h2>Nuts</h2>
      <p>Acorns, hazelnuts and beechnuts.</p>
    </section>
  </main>
  <footer>Made by Hazel</footer>
</body>
</html>`,
          out: "The Drey\nNuts | Trees\nNuts\n\nAcorns, hazelnuts and beechnuts.\n\nMade by Hazel",
        },
        {
          h: "Tables",
          p: "Tables are for data with rows and columns, not for laying out a page. <code>&lt;table&gt;</code> holds rows, <code>&lt;tr&gt;</code>; each row holds cells, <code>&lt;td&gt;</code>, or heading cells, <code>&lt;th&gt;</code>. <code>&lt;caption&gt;</code> gives the table a title.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <table border="1">
    <caption>Nuts buried</caption>
    <tr><th>Squirrel</th><th>Nuts</th></tr>
    <tr><td>Hazel</td><td>21</td></tr>
    <tr><td>Acorn</td><td>3</td></tr>
  </table>
</body>
</html>`,
          out: "Nuts buried\nSquirrel\tNuts\nHazel\t21\nAcorn\t3",
        },
      ],
      practice: [
        { q: "Which element should hold the page's main links?", options: ["<nav>", "<footer>", "<div>", "<table>"], answer: "<nav>", why: "nav marks a block of navigation links, which helps screen-reader users jump to it or past it." },
        { q: "When should you use a table?", options: ["For data in rows and columns", "To place parts of the page side by side", "For every list", "Only inside a form"], answer: "For data in rows and columns", why: "Layout is CSS's job. Tables used for layout confuse screen readers and are hard to change." },
      ],
    },
    {
      id: "forms",
      title: "Forms",
      summary: "label, input types, select and button.",
      sections: [
        {
          p: "A <code>&lt;form&gt;</code> collects input. <code>&lt;input&gt;</code> makes a field, and its <code>type</code> decides which kind: <code>text</code>, <code>number</code>, <code>email</code>, <code>checkbox</code>, <code>date</code> and more, each with a suitable keyboard on a phone. Every field needs a <code>&lt;label&gt;</code>, linked by giving the label's <code>for</code> the field's <code>id</code>; clicking the label then focuses the field, and screen readers read it out. <code>required</code> stops the form being sent while the field is empty.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <form action="/stash" method="post">
    <p><label for="who">Your name</label>
       <input id="who" name="who" type="text" required></p>
    <p><label for="count">Nuts found</label>
       <input id="count" name="count" type="number" min="0" value="3"></p>
    <p><label for="tree">Tree</label>
       <select id="tree" name="tree">
         <option>oak</option>
         <option selected>hazel</option>
       </select></p>
    <p><input id="winter" name="winter" type="checkbox">
       <label for="winter">Save for winter</label></p>
    <button type="submit">Bury it</button>
  </form>
</body>
</html>`,
          out: "Your name\n\nNuts found\n\nTree\noak\nhazel\n\n Save for winter\n\nBury it",
        },
      ],
      practice: [
        { q: "Why link a <label> to its <input> with for and id?", options: ["Clicking the label focuses the field, and screen readers announce it", "It makes the field required", "It sends the label with the form", "It is needed for the field to show up"], answer: "Clicking the label focuses the field, and screen readers announce it", why: "The link tells the browser which text names which field." },
        { q: "What does the required attribute do?", options: ["Stops the form being sent while the field is empty", "Makes the field bold", "Fills the field with a default", "Hides the field until needed"], answer: "Stops the form being sent while the field is empty", why: "The browser checks it before sending and points the user at the empty field." },
      ],
    },
    {
      id: "css",
      title: "Styling with CSS",
      summary: "Rules, selectors, classes, colours and the cascade.",
      sections: [
        {
          p: "CSS is written as <b>rules</b>. Each rule starts with a <b>selector</b> that picks elements, then lists <b>declarations</b> in braces, <code>property: value;</code>. CSS can go in a <code>&lt;style&gt;</code> element in the head, or in a separate file linked with <code>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</code> so many pages share it. A selector can be an element name (<code>p</code>), a <b>class</b> with a dot (<code>.warning</code>, matching <code>class=\"warning\"</code>), or an <b>id</b> with a hash (<code>#top</code>).",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
  body { font-family: Georgia, serif; background: #fdf6e3; color: #333; }
  h1 { color: #8b4513; font-size: 2rem; }
  .warning { color: white; background: #c0392b; padding: 4px 8px; }
  #motto { font-style: italic; text-transform: uppercase; }
</style>
</head>
<body>
  <h1>The Drey</h1>
  <p id="motto">Bury early, bury often</p>
  <p class="warning">Owls about at night.</p>
  <p>An ordinary paragraph.</p>
</body>
</html>`,
          out: "The Drey\n\nBURY EARLY, BURY OFTEN\n\nOwls about at night.\n\nAn ordinary paragraph.",
        },
        {
          h: "The cascade",
          p: "When several rules set the same property on an element, the most <b>specific</b> selector wins: an id beats a class, and a class beats an element name. Between equally specific rules, the later one wins. Some properties, such as <code>color</code> and <code>font-family</code>, are <b>inherited</b> by the elements inside. <code>display: none</code> removes an element from the page altogether.",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
  p { color: green; }
  .nut { color: brown; }
  p { color: blue; }
  #special { color: red; }
  .hidden { display: none; }
  .shout { text-transform: uppercase; }
</style>
</head>
<body>
  <p>Blue: the later of two p rules.</p>
  <p class="nut">Brown: a class beats p.</p>
  <p class="nut" id="special">Red: an id beats a class.</p>
  <p class="hidden">You can't see me.</p>
  <p class="shout">quiet words</p>
</body>
</html>`,
          out: "Blue: the later of two p rules.\n\nBrown: a class beats p.\n\nRed: an id beats a class.\n\nQUIET WORDS",
        },
      ],
      practice: [
        { kind: "output", q: "What text does this page show?", code: `<!DOCTYPE html>
<html>
<head>
<style>
  .a { display: none; }
  #b { text-transform: uppercase; }
</style>
</head>
<body>
  <p class="a">oak</p>
  <p id="b">ash</p>
  <p>elm</p>
</body>
</html>`, options: ["ASH\nelm", "oak\nASH\nelm", "ash\nelm", "OAK\nash\nelm"], answer: "ASH\nelm", check: "ASH\n\nelm", why: "display: none removes the first paragraph, and text-transform changes how the second is drawn, not the HTML." },
        { q: "A <p class=\"note\" id=\"top\"> has rules  p { color: green }  .note { color: blue }  #top { color: red } . What colour is it?", options: ["red", "blue", "green", "black"], answer: "red", why: "An id selector is more specific than a class, which is more specific than an element name." },
      ],
    },
    {
      id: "layout",
      title: "Boxes and layout",
      summary: "The box model, flexbox, grid and fitting small screens.",
      sections: [
        {
          p: "Every element is a box. From the inside out it has its content, <b>padding</b> (space inside the border), a <b>border</b>, and a <b>margin</b> (space outside). <code>box-sizing: border-box</code> makes <code>width</code> include the padding and border, which makes sizes much easier to reason about. <b>Flexbox</b>, <code>display: flex</code>, lays the children of an element out in a row (or a column) and shares the space between them; <code>gap</code> sets the space between items.",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; }
  .row { display: flex; gap: 10px; }
  .card { flex: 1; padding: 12px; border: 2px solid #8b4513; border-radius: 8px; background: #fff8ee; }
  .card.wide { flex: 2; }
</style>
</head>
<body>
  <div class="row">
    <div class="card">Oak</div>
    <div class="card wide">Hazel, twice as wide</div>
    <div class="card">Ash</div>
  </div>
</body>
</html>`,
          out: "Oak\nHazel, twice as wide\nAsh",
        },
        {
          h: "Grid and small screens",
          p: "<b>Grid</b>, <code>display: grid</code>, places children in rows and columns at once. <code>grid-template-columns: repeat(3, 1fr)</code> makes three equal columns, where <code>fr</code> is a share of the free space. A <b>media query</b> applies rules only when the screen matches, which is how one page fits both a phone and a desktop: here the grid drops to one column when the window is narrower than 500 pixels. Widen and narrow the preview to see it change.",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .grid div { padding: 16px; background: #d7ccc8; text-align: center; }
  @media (max-width: 500px) {
    .grid { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
  <div class="grid">
    <div>1</div><div>2</div><div>3</div>
    <div>4</div><div>5</div><div>6</div>
  </div>
</body>
</html>`,
          out: "1\n2\n3\n4\n5\n6",
        },
      ],
      practice: [
        { q: "With box-sizing: border-box, a box has width: 200px, padding: 10px and a 2px border. How wide is it on the page?", options: ["200px", "224px", "220px", "212px"], answer: "200px", why: "border-box counts padding and border inside the width. Without it, the box would be 200 + 20 + 4 = 224px wide." },
        { q: "What does display: flex on a container do?", options: ["Lays its children out in a row and shares the space between them", "Lets the user resize it", "Makes it fill the whole window", "Hides it on small screens"], answer: "Lays its children out in a row and shares the space between them", why: "flex-direction can switch the row to a column, and flex on each child sets its share." },
      ],
    },
    {
      id: "a11y",
      title: "Accessibility basics",
      summary: "Skip links, labels that speak, table scopes and aria.",
      sections: [
        {
          p: "A page should work for people who can't see the screen, use only a keyboard, or zoom the text. Start with a <b>skip link</b> as the first focusable thing: it jumps past the header to the main content. Give the page a language with <code>lang</code> on <code>&lt;html&gt;</code>, put real headings in order, and keep a useful <code>alt</code> on every meaningful image (or <code>alt=\"\"</code> for decoration). <code>aria-label</code> on <code>&lt;nav&gt;</code> names that landmark for screen readers without adding visible text.",
          code: `<!DOCTYPE html>
<html lang="en">
<head><title>Stash</title></head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header>
    <h1>The Drey</h1>
    <nav aria-label="Main">
      <a href="#nuts">Nuts</a>
      <a href="#tips">Tips</a>
    </nav>
  </header>
  <main id="main">
    <h2>Nuts</h2>
    <img src="missing.jpg" alt="A hazelnut on moss">
    <p>We bury what we find.</p>
  </main>
</body>
</html>`,
          out: "Skip to content\nThe Drey\nNuts Tips\nNuts\n\nWe bury what we find.",
        },
        {
          h: "Buttons, tables and aria",
          p: "A control whose visible text is only a symbol needs an accessible name: <code>aria-label</code> on the button, or visually hidden text inside it. In a data table, <code>scope=\"col\"</code> and <code>scope=\"row\"</code> on <code>&lt;th&gt;</code> tell assistive tech which heading belongs to which cell. Prefer real elements (<code>&lt;button&gt;</code>, <code>&lt;a href&gt;</code>) over clickable <code>&lt;div&gt;</code>s — they already keyboard and announce correctly.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <button type="button" aria-label="Close dialog">X</button>
  <p><a href="#content">Jump to content</a></p>
  <table>
    <caption>Nuts by tree</caption>
    <tr><th scope="col">Tree</th><th scope="col">Nuts</th></tr>
    <tr><th scope="row">Oak</th><td>12</td></tr>
    <tr><th scope="row">Ash</th><td>5</td></tr>
  </table>
  <div id="content">End of page.</div>
</body>
</html>`,
          out: "X\n\nJump to content\n\nNuts by tree\nTree\tNuts\nOak\t12\nAsh\t5\nEnd of page.",
        },
      ],
      practice: [
        { kind: "output", q: "What text does this page show?", code: `<!DOCTYPE html>
<html lang="en">
<body>
  <a href="#main">Skip to content</a>
  <nav aria-label="Site"><a href="#a">A</a></nav>
  <main id="main"><p>Hello</p></main>
</body>
</html>`, options: ["Skip to content\nA\nHello", "Site\nSkip to content\nA\nHello", "Skip to content\nHello", "A\nHello"], answer: "Skip to content\nA\nHello", check: "Skip to content\nA\n\nHello", why: "aria-label is for assistive tech and does not appear as visible text. The skip link and the nav link do." },
        { q: "Why give a button that only shows X an aria-label?", options: ["So screen readers announce a clear name instead of just \"X\"", "So the button becomes required", "So CSS can style it", "So it submits the form"], answer: "So screen readers announce a clear name instead of just \"X\"", why: "The accessible name is what assistive tech reads; a symbol alone is unclear." },
        { q: "What does scope=\"row\" on a th do?", options: ["Marks that heading as the label for its row", "Merges the cell with the next one", "Hides the heading", "Makes the row sortable"], answer: "Marks that heading as the label for its row", why: "Screen readers then announce the row heading when you move across the cells." },
      ],
    },
    {
      id: "forms-more",
      title: "Forms in depth",
      summary: "fieldset, radio groups, textarea, datalist and dates.",
      sections: [
        {
          p: "<code>&lt;fieldset&gt;</code> groups related controls and <code>&lt;legend&gt;</code> names the group — especially useful for a set of radio buttons that share one <code>name</code>. Only one radio in the group can be chosen. <code>&lt;textarea&gt;</code> is for longer text; its starting content goes between the tags (placeholders show only while it is empty). <code>&lt;datalist&gt;</code> offers suggestions for a text field without forcing one of them, and <code>type=\"date\"</code> asks the browser for a date picker when it has one.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <form>
    <fieldset>
      <legend>Pick a nut</legend>
      <p><input type="radio" id="a" name="nut" value="acorn" checked>
         <label for="a">Acorn</label></p>
      <p><input type="radio" id="w" name="nut" value="walnut">
         <label for="w">Walnut</label></p>
    </fieldset>
    <p><label for="note">Note</label><br>
       <textarea id="note" name="note" rows="2" cols="24" placeholder="Any allergies?"></textarea></p>
    <p><label for="kind">Favourite kind</label>
       <input id="kind" name="kind" list="kinds" placeholder="start typing">
       <datalist id="kinds">
         <option value="acorn"></option>
         <option value="hazelnut"></option>
         <option value="walnut"></option>
       </datalist></p>
    <p><label for="when">Deliver on</label>
       <input id="when" name="when" type="date"></p>
    <button type="submit">Send</button>
  </form>
</body>
</html>`,
          out: "Pick a nut\n\n Acorn\n\n Walnut\n\nNote\n\n\nFavourite kind\n\nDeliver on\n\nSend",
        },
        {
          h: "Patterns and friendly names",
          p: "<code>pattern</code> gives a regular expression the value must match before the form can be sent; pair it with a clear <code>title</code> so the browser can explain a failure. <code>autocomplete</code> hints such as <code>name</code> or <code>email</code> let the browser offer saved details. <code>inputmode=\"numeric\"</code> brings up a number pad on phones without changing what the field stores.",
          code: `<!DOCTYPE html>
<html lang="en">
<body>
  <form>
    <p><label for="code">Stash code</label>
       <input id="code" name="code" pattern="[A-Z]{2}[0-9]{3}"
              title="Two letters then three digits, like OK042" required></p>
    <p><label for="who">Your name</label>
       <input id="who" name="who" autocomplete="name"></p>
    <p><label for="bags">Bags</label>
       <input id="bags" name="bags" inputmode="numeric" pattern="[0-9]*" value="2"></p>
    <button type="submit">Save</button>
  </form>
</body>
</html>`,
          out: "Stash code\n\nYour name\n\nBags\n\nSave",
        },
      ],
      practice: [
        { kind: "output", q: "What text does this page show?", code: `<!DOCTYPE html>
<html>
<body>
  <fieldset>
    <legend>Season</legend>
    <input type="radio" id="s" name="s" checked><label for="s">Spring</label>
    <input type="radio" id="a" name="s"><label for="a">Autumn</label>
  </fieldset>
</body>
</html>`, options: ["Season\nSpring Autumn", "Season\nSpring\nAutumn", "Spring\nAutumn", "Season"], answer: "Season\nSpring Autumn", check: "Season\nSpring Autumn", why: "The legend names the group; both radio labels appear on the next line." },
        { q: "What do radio inputs that share the same name do?", options: ["Only one of them can be selected at a time", "They all stay checked together", "They become a dropdown", "They submit as a list"], answer: "Only one of them can be selected at a time", why: "A shared name makes a single-choice group." },
        { q: "How does datalist differ from select?", options: ["datalist suggests values for a text field; the user may still type something else", "datalist forces one of the options", "datalist cannot be labelled", "There is no difference"], answer: "datalist suggests values for a text field; the user may still type something else", why: "select locks the choice to its options; datalist is a hint list." },
      ],
    },
    {
      id: "interactive",
      title: "Small interactions",
      summary: "details and summary, :focus, :hover and :target.",
      sections: [
        {
          p: "<code>&lt;details&gt;</code> is a disclosure widget built into HTML: the <code>&lt;summary&gt;</code> is always shown, and the rest opens when you click it. Add <code>open</code> to start it expanded. No JavaScript is required. Closed content is omitted from the page's visible text until it is opened.",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
  summary { cursor: pointer; font-weight: bold; }
</style>
</head>
<body>
  <details open>
    <summary>Stash tips</summary>
    <p>Bury under oak roots.</p>
  </details>
  <details>
    <summary>Owl watch</summary>
    <p>Stay low at dusk.</p>
  </details>
</body>
</html>`,
          out: "Stash tips\n\nBury under oak roots.\n\nOwl watch",
        },
        {
          h: ":focus, :hover and :target",
          p: "Pseudo-classes style an element in a state. <code>:hover</code> applies while the pointer is over it; <code>:focus</code> while it is the keyboard (or click) focus — keep a clear outline so keyboard users can see where they are. <code>:target</code> matches the element whose <code>id</code> is in the URL hash after someone follows a link like <code>href=\"#more\"</code>. Below, the extra tip stays hidden until that link is used.",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .box:focus { outline: 3px solid #c0392b; background: #fdebd0; }
  .hide { display: none; }
  .hide:target { display: block; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body>
  <p><a href="#more">Show more</a></p>
  <p id="more" class="hide">Drink water after digging.</p>
  <p><a class="box" href="#more">Focusable tip</a></p>
</body>
</html>`,
          out: "Show more\n\nFocusable tip",
        },
        {
          h: "Flex alignment for a toolbar",
          p: "A common interactive strip is a toolbar: <code>display: flex</code> with <code>justify-content: space-between</code> pushes groups apart, and <code>align-items: center</code> lines them up. <code>gap</code> spaces the items that stay together. This is still layout, but it is the layout most buttons and filters sit in.",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .bar { display: flex; justify-content: space-between; align-items: center;
         gap: 8px; padding: 8px 12px; background: #efebe9; }
  .bar .actions { display: flex; gap: 8px; }
  button { padding: 4px 10px; }
</style>
</head>
<body>
  <div class="bar">
    <strong>Stash filter</strong>
    <div class="actions">
      <button type="button">All</button>
      <button type="button">Oak</button>
      <button type="button">Ash</button>
    </div>
  </div>
</body>
</html>`,
          out: "Stash filter\nAll\nOak\nAsh",
        },
      ],
      practice: [
        { kind: "output", q: "What text does this page show?", code: `<!DOCTYPE html>
<html>
<body>
  <details>
    <summary>Secrets</summary>
    <p>Forty nuts.</p>
  </details>
  <p>Open me later.</p>
</body>
</html>`, options: ["Secrets\n\nOpen me later.", "Secrets\nForty nuts.\nOpen me later.", "Forty nuts.\nOpen me later.", "Open me later."], answer: "Secrets\n\nOpen me later.", check: "Secrets\n\nOpen me later.", why: "Without open, details hides its body; only the summary and the paragraph below show." },
        { q: "What does :target match?", options: ["The element whose id equals the #hash in the URL", "Every link on the page", "The element under the mouse", "The first heading"], answer: "The element whose id equals the #hash in the URL", why: "Following href=\"#more\" makes #more the :target until the hash changes." },
        { q: "Why keep a visible :focus style on links and buttons?", options: ["So keyboard users can see which control is active", "So the page loads faster", "So search engines rank it higher", "It is required for colours to work"], answer: "So keyboard users can see which control is active", why: "Tab moves focus; without a clear outline, keyboard use becomes guesswork." },
      ],
    },
    {
      id: "project",
      title: "Project: a nut shop page",
      summary: "Structure, accessibility, grid cards and an order form together.",
      sections: [
        {
          p: "This page is a tiny shop: a skip link, a labelled header nav, a responsive grid of product cards, and an order form with proper labels. The CSS uses the box model, grid and a media query so the cards stack on a narrow window. Open the preview and resize it; try Tab to move through the skip link, links and fields.",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hazel's Nut Shop</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Georgia, serif; background: #f7f0e4; color: #3e2723; }
  .skip { position: absolute; left: -999px; }
  .skip:focus { left: 8px; top: 8px; background: #fff; padding: 4px 8px; }
  header { background: #6d4c41; color: #fff8e1; padding: 16px 24px; }
  header a { color: #ffe0b2; margin-right: 12px; }
  main { padding: 24px; max-width: 800px; margin: 0 auto; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .card { background: #fff; border: 2px solid #8d6e63; border-radius: 8px; padding: 12px; }
  .card h2 { margin: 0 0 8px; font-size: 1.1rem; }
  .price { font-weight: bold; color: #5d4037; }
  form { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
  button { background: #8d6e63; color: white; border: 0; padding: 8px 12px; }
  footer { padding: 16px 24px; font-size: 0.9rem; color: #6d4c41; }
  @media (max-width: 500px) { .grid { grid-template-columns: 1fr; } }
</style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header>
    <h1>Hazel's Nut Shop</h1>
    <nav aria-label="Shop">
      <a href="#stock">Stock</a>
      <a href="#order">Order</a>
    </nav>
  </header>
  <main id="main">
    <section id="stock" aria-labelledby="stock-title">
      <h2 id="stock-title">This week's stock</h2>
      <div class="grid">
        <article class="card">
          <h2>Acorns</h2>
          <p class="price">2 tokens / bag</p>
          <p>Crunchy autumn classic.</p>
        </article>
        <article class="card">
          <h2>Hazelnuts</h2>
          <p class="price">5 tokens / bag</p>
          <p>Sweet and shelled.</p>
        </article>
        <article class="card">
          <h2>Walnuts</h2>
          <p class="price">4 tokens / bag</p>
          <p>Brain-shaped treasure.</p>
        </article>
      </div>
    </section>
    <section id="order" aria-labelledby="order-title">
      <h2 id="order-title">Place an order</h2>
      <form action="/order" method="post">
        <label for="who">Your name</label>
        <input id="who" name="who" type="text" required autocomplete="name">
        <label for="nut">Nut</label>
        <select id="nut" name="nut">
          <option>acorn</option>
          <option selected>hazelnut</option>
          <option>walnut</option>
        </select>
        <label for="bags">Bags</label>
        <input id="bags" name="bags" type="number" min="1" value="1">
        <button type="submit">Send order</button>
      </form>
    </section>
  </main>
  <footer>Open dawn till dusk · No owls past the counter</footer>
</body>
</html>`,
          out: "Skip to content\nHazel's Nut Shop\nStock Order\nThis week's stock\nAcorns\n\n2 tokens / bag\n\nCrunchy autumn classic.\n\nHazelnuts\n\n5 tokens / bag\n\nSweet and shelled.\n\nWalnuts\n\n4 tokens / bag\n\nBrain-shaped treasure.\n\nPlace an order\nYour name\nNut\nacorn\nhazelnut\nwalnut\nBags\nSend order\nOpen dawn till dusk · No owls past the counter",
        },
        {
          h: "Ideas to try",
          p: "Add a <code>&lt;details&gt;</code> FAQ under the form, give each card an <code>&lt;img&gt;</code> with a real <code>alt</code>, or put prices in a small table with <code>scope</code> for shoppers who prefer a list.",
        },
      ],
      practice: [
        { q: "Why does the shop page start with a skip link?", options: ["So keyboard and screen-reader users can jump past the header to the main content", "So search engines index it first", "So CSS grid works", "So the form can submit"], answer: "So keyboard and screen-reader users can jump past the header to the main content", why: "Repeated header links are tedious to tab through on every page; the skip link bypasses them." },
        { kind: "output", q: "What text does this page show?", code: `<!DOCTYPE html>
<html>
<head>
<style>
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
  .gone { display: none; }
</style>
</head>
<body>
  <h1>Shop</h1>
  <div class="grid">
    <div>Acorn</div><div>Walnut</div>
  </div>
  <p class="gone">Secret discount</p>
</body>
</html>`, options: ["Shop\nAcorn\nWalnut", "Shop\nAcorn Walnut\nSecret discount", "Shop\nSecret discount", "Acorn\nWalnut"], answer: "Shop\nAcorn\nWalnut", check: "Shop\nAcorn\nWalnut", why: "display: none removes the secret line from the visible text; grid only changes layout." },
        { q: "What does aria-labelledby=\"stock-title\" on the section do?", options: ["Names the section with the text of the element that has id stock-title", "Hides the section title", "Makes the section a landmark called stock-title", "Links the section to the stylesheet"], answer: "Names the section with the text of the element that has id stock-title", why: "Assistive tech can then announce the section using that heading's words." },
      ],
    },
  ],
};
