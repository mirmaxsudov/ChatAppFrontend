export function generateRandomHexColor(): string {
    const telegramColors = [
        '#24A1DE',
        '#7661C2',
        '#5F8AAC',
        '#37A8A0',
        '#D4904F',
        '#D56B70',
        '#FF9500',
        '#5856D6',
        '#FF2D55',
        '#FFCC00',
    ];

    const randomIndex = Math.floor(Math.random() * telegramColors.length);
    return telegramColors[randomIndex];
}