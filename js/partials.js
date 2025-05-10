class NavBar extends HTMLElement {
    connectedCallback() {
        fetch('/partials/nav-bar.html')
            .then(res => res.text())
            .then(html => this.innerHTML = html);
    }
}
customElements.define('nav-bar', NavBar);

class MainFooter extends HTMLElement {
    connectedCallback() {
        fetch('/partials/main-footer.html')
            .then(res => res.text())
            .then(html => this.innerHTML = html);
    }
} 
customElements.define('main-footer', MainFooter);