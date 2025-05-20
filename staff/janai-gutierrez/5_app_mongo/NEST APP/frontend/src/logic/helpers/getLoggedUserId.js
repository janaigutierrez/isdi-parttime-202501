export default function getLoggedUserId() {

    const raw = sessionStorage.getItem('id') || localStorage.getItem('id');

    if (!raw) return null;

    let parsed;

    try {
        parsed = JSON.parse(raw);
    } catch {
        parsed = raw;
    }

    const id = Number(parsed);

    return Number.isNaN(id) ? null : id;
}
