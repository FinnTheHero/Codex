const formatDate = (date: string): string => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return "";
    }

    // Format the date into a readable string
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        // timeZoneName: "short",
    };

    return parsedDate.toLocaleDateString("en-US", options);
};

export default formatDate;
