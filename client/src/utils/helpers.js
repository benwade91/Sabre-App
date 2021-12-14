export function formatDate(str) {
    let now = new Date()
    let date = new Date(parseInt(str));
    let difference = Math.floor((new Date() - str) / 1000);

    let interval = difference / 31536000;
    if (interval > 2) {
        return Math.floor(interval) + " years ago";
    } 
    else if (interval > 1) {
        return Math.floor(interval) + " year ago";
    }

    interval = difference / 2592000;
    if (interval > 2) {
        return Math.floor(interval) + " months ago";
    }
    else if (interval > 1) {
        return Math.floor(interval) + " month ago";
    }

    interval = difference / 86400;
    if (interval > 2) {
        return Math.floor(interval) + " days ago";
    }
    else if (interval > 1) {
        return Math.floor(interval) + " day ago";
    }

    interval = difference / 3600;
    if (interval > 2) {
        return Math.floor(interval) + " hours ago";
    }
    else if (interval > 1) {
        return Math.floor(interval) + " hour ago";
    }

    interval = difference / 60;
    if (interval > 2) {
        return Math.floor(interval) + " minutes ago";
    }
    else if (interval > 1) {
        return Math.floor(interval) + " minute ago";
    }

    return Math.floor(difference) + " seconds ago";
}
