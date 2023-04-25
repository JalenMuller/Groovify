const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export async function getDuration(file: File) {
    let p = new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = (e: any) => {
            const ctx = new AudioContext();
            const audioArrayBuffer = e.target.result;
            ctx.decodeAudioData(
                audioArrayBuffer,
                (data) => {
                    // this is the success callback
                    const duration = data.duration;
                    resolve(duration);
                    // return duration;
                },
                (error) => {
                    // this is the error callback
                    reject(error);
                    // return error;
                }
            );
        };
    });
    return await p;
}
export function secondsToMinutes(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;
    return `${minutes}:${remainingSeconds}`;
}
export function timeToPrettyDate(time: number) {
    const date = new Date(time);
    let day = date.getDate();
    let month = shortMonths[date.getMonth()];
    let year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}
