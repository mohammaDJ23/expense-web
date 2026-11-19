export function downloadBlob(data: Blob, filename: string): void {
    const url = URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
