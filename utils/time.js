export function timeSince(date) {
    const now = new Date();
    const postDate = new Date(date);
    const secondsPast = (now.getTime() - postDate.getTime()) / 1000;

    if (secondsPast < 60) {
        return parseInt(secondsPast) + ' s';
    } 
    if (secondsPast < 3600) { 
        return parseInt(secondsPast / 60) + ' m';
    }
    if (secondsPast <= 86400) { 
        return parseInt(secondsPast / 3600) + ' h';
    }
    
    const daysPast = Math.floor(secondsPast / 86400);

    if (daysPast < 7) { 
        return daysPast + ' d';
    } else { 
        const weeksPast = Math.floor(daysPast / 7);
        return weeksPast + ' w';
    }
}
