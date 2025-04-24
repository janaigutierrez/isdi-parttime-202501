import pages from './pages/index.mjs'

const navigate = (oldPage, newPage) => {
    const body = document.body;

    pages[oldPage].dismount();
    pages[newPage].mount(body)
}

export default navigate