export function contains(x: string, y: string): boolean {
    x = x || '';
    y = y || '';
    return x.toLowerCase().includes(y.toLowerCase());
}
