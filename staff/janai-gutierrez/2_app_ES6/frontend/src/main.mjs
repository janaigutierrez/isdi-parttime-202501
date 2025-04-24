import pages from './pages/index.mjs'

const { home, landing } = pages;

const app = () => {
    const body = document.body;

    sessionStorage.id || localStorage.id ? home.mount(body) : landing.mount(body)
};

app()
