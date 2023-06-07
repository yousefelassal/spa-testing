import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("Home");
    }

    async getHtml(){
        return `
                <h1>Welcome back, Dom</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    <a href="/posts" data-link>View recent posts</a>.
                </p>
            `;
    }
}