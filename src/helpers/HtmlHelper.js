export function stripTags(input) {
    if (!input) return input;

    return input.replace(/(<([^>]+)>)/ig, " ");
}