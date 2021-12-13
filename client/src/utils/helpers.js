export function formatDate(str) {
    let now = new Date()
    let date = new Date(parseInt(str));
    let difference = Math.floor((new Date() - str) / 1000);

    let interval = difference / 62072000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }

    interval = difference / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " year ago";
    }

    interval = difference / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }

    interval = difference / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }

    interval = difference / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }

    interval = difference / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }

    return Math.floor(difference) + " seconds ago";
}
