export default function getLoggedUserId() {
    // Try sessionStorage first, then localStorage
    const raw = sessionStorage.getItem('id') || localStorage.getItem('id');

    // If no ID stored return null
    if (!raw) return null;

    // Parse JSON in case it's stored with JSON.stringify
    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch {
        parsed = raw;
    }

    // Convert to number
    const id = Number(parsed);

    // If conversion fails (NaN), return null
    return Number.isNaN(id) ? null : id;
}
