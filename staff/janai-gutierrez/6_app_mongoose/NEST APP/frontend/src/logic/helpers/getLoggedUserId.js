export default function getLoggedUserId() {
    const raw = sessionStorage.getItem('id') || localStorage.getItem('id');

    if (!raw) return null;

    let parsed;

    try {
        parsed = JSON.parse(raw);
    } catch {
        parsed = raw;
    }

    return typeof parsed === 'string' ? parsed : String(parsed);
}