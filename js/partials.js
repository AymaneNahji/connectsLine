class NavBar extends HTMLElement {
    connectedCallback() {
        fetch('../partials/nav-bar.html')
            .then(res => res.text())
            .then(html => this.innerHTML = html);
    }
}
customElements.define('nav-bar', NavBar);

class MainFooter extends HTMLElement {
    connectedCallback() {
        fetch('../partials/main-footer.html')
            .then(res => res.text())
            .then(html => this.innerHTML = html);
    }
} 
customElements.define('main-footer', MainFooter);

class TranslationLoading extends HTMLElement {
    connectedCallback() {
        fetch('../partials/translation-loading.html')
            .then(res => res.text())
            .then(html => this.innerHTML = html);
    }
}
customElements.define('translation-loading', TranslationLoading);



