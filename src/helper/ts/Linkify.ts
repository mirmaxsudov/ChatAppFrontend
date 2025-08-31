export function linkify(text: string): string {
    // Escape everything except the anchors we insert
    const escapeHtml = (s: string) =>
        s.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]!));

    // Match URLs (http/https/www) OR emails
    const pattern =
        /((?:https?:\/\/|www\.)[^\s<>()[\]{}]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/gi;

    let out = "";
    let last = 0;
    let m: RegExpExecArray | null;

    while ((m = pattern.exec(text))) {
        const full = m[0];
        const start = m.index;

        // Emit the preceding non-link text (escaped)
        out += escapeHtml(text.slice(last, start));

        // Trim trailing punctuation from the detected token (e.g., "." or ")")
        let token = full;
        let trailing = "";
        while (/[),.!?:;]+$/.test(token)) {
            trailing = token.slice(-1) + trailing;
            token = token.slice(0, -1);
        }

        // Determine href (mailto for emails; add http:// for bare www.)
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(token);
        const href = isEmail
            ? `mailto:${token}`
            : token.startsWith("http://") || token.startsWith("https://")
                ? token
                : `http://${token}`;

        // Insert anchor (display text is escaped)
        out += `<a href="${href}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(token)}</a>`;

        // Put back any trailing punctuation (escaped)
        out += escapeHtml(trailing);

        last = start + full.length;
    }

    // Emit the remainder
    out += escapeHtml(text.slice(last));
    return out;
}