export function timeSince(date) {
    const now = new Date();
    const postDate = new Date(date);
    const secondsPast = (now.getTime() - postDate.getTime()) / 1000;

    if (secondsPast < 60) {
        return parseInt(secondsPast) + ' sec';
    } 
    if (secondsPast < 3600) { 
        return parseInt(secondsPast / 60) + ' min';
    }
    if (secondsPast <= 86400) { 
        return parseInt(secondsPast / 3600) + ' hrs';
    }
    
    const daysPast = Math.floor(secondsPast / 86400);

    if (daysPast < 7) { 
        return daysPast + ' days';
    } else { 
        const weeksPast = Math.floor(daysPast / 7);
        return weeksPast + ' weeks';
    }
}
