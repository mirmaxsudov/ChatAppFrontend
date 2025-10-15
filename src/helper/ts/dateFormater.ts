export function toFormattedDate(
    dateInput: string | Date,
    locale: string = 'en-US'
): string | null {
    try {
        const date = new Date(dateInput);

        if (isNaN(date.getTime())) {
            console.error('Invalid date input provided.');
            return null;
        }

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
        };

        return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (error) {
        console.error('An error occurred during date formatting:', error);
        return null;
    }
}

export function toTimeFormatted(
    dateInput: string | Date,
    locale: string = 'en-US'
) {
    try {
        const date = new Date(dateInput);

        if (isNaN(date.getTime())) {
            return null;
        }

        const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit"
        }

        return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (err) {
        return null;
    }
}