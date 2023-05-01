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
    if (!file) return;
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
export function secondsToMinutes(time: number) {
    time = Math.floor(time);
    const minutes = Math.floor(time / 60);
    let seconds: string;
    let remainingSeconds = time - minutes * 60;

    if (remainingSeconds === 0) {
        seconds = "00";
    } else if (remainingSeconds < 10) {
        seconds = "0" + remainingSeconds;
    } else {
        seconds = remainingSeconds.toString();
    }
    return `${minutes}:${seconds}`;
}
export function timeToPrettyDate(time: number) {
    const date = new Date(time);
    let day = date.getDate();
    let month = shortMonths[date.getMonth()];
    let year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

export function getFieldErrors(error: object) {
    const fields = Object.keys(error);
    const errors = Object.values(error);
    let errorObjects: object[] = [];
    fields?.forEach((field, i) => {
        errorObjects.push({ field: field, errorMessage: errors[i][0] });
    });
    return errorObjects;
}
