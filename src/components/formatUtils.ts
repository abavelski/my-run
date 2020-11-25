export const formatKm = (m: number) : string => (m / 1000).toFixed(2).replace('.', ',');

export const formatTime = (t: number): string => {
    if (t > 3600) {
        return new Date(t * 1000).toISOString().substr(11, 8);
    } else {
        return new Date(t * 1000).toISOString().substr(14, 5);
    }
} 