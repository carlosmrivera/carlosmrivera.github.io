// returns a randomly selected item from array of items
export const choice = (items) => {
    return items[Math.floor(Math.random() * items.length)];
}

// removes the first matching item from items, if item exists, and returns it. Otherwise returns undefined.
export const remove = (items, item) => {
    let idx = items.indexOf(item);
    return idx !== -1 ? items.splice(idx, 1)[0] : undefined;
}