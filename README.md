# Single-page application testing
Server is created using Express
- `npm i express` to install Express
- `node server.js` to run the server

<div align="center"><i>server.js</i></div>

```
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("__dirname, "index.html"));
});
```
this would take any path `"/*"` and send it back to the `index.html`

<br>

<div align="center"><i>index.html</i></div>

```
<a href="/" data-link="">Home</a>
<a href="/posts" data-link>About</a>
<a href="/settings" data-link>Lorem</a>

<div id="main-page"></div>
```
- add `data-link` attribute to each link
- create the `#main-page` div where the innerHTML will be manipulated

<br>
<div align="center"><i>index.js (1)</i></div>

```
const router = async () => {
    const routes = [
        {path: "/", view: Dashboard},
        {path: "/posts", view: Posts},
        {path: "/settings", view: Settings},
    ];
    
    ...
```
whenever the user goes to a route path change the view component

<div align="center"><i>index.js (2)</i></div>

```
const potentialMatches = routes.map((route) => {
        return {
            route: route,
            isMatch: location.pathname === route.path,
        }
    });

    let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);
 ```
 - map through the routes and return a new object for each
 - check which path the user is on 
 - assign the matched path

<div align="center"><i>index.js (3)</i></div>

```
const view = new match.route.view();

document.querySelector("#main-page").innerHTML = await view.getHtml();
```
- create an instance of the view with the matched path
- retrieve the html of the instance and place it in the main div

<div align="center"><i>index.js (4)</i></div>

```
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (event) => {
        if (event.target.matches("[data-link]")) {
            event.preventDefault();
            navigateTo(event.target.href);
        }
    });

    router();
});
```
- handle popstate (clicking the browser's back or forward buttons)
- when a click occurs on an element with the data attribute call the navigateTo function

<div align="center"><i>index.js (5)</i></div>

```
const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};
```
update the url of the page using history api

<br>
<div align="center"><i>Pages (Abstract Class)</i></div>

```
export default class{
    constructor(){

    }

    setTitle(title){
        document.title = title;
    }

    async getHtml(){
        return "";
    }
}
```
- method to update page title
- method to return the html

<br>
<div align="center"><i>Pages (Dashboard, ...)</i></div>

```
import AbstractView from "./AbstractView.js"
export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("Home");
    }

    async getHtml(){
        return `
                <div>
                  el html ayan kan
                </div>
            `;
    }
}
```
- import the abstract (parent) class and extend it
- set the title inside the constructor 
- override the getHtml method by placing the html

<br>
<div align="right"><h4>clone the repository and <code>npm install</code> to test it</h4></div>

