function bodyXData() {
    return { 
        isDark: $persist(false), 
        isDrawerOpen: false,  
        translationIsLoading: false,
        lang: $persist('en'),
        t(key) {
            if(this.translationIsLoading) return 'Waiting for translations...';
            return this.translations[key] || 'None'; 
        },
        loadTranslations() {
            this.translationIsLoading = true;
            fetch(`/locales/${this.lang}.json`)
            .then(response => response.json())
            .then(data => {
                this.translations = data;
            })
            .finally(() => {
                this.translationIsLoading = false;
            });
        } 
    }
}