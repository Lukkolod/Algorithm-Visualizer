export const generateArray = (arraySize: number) => {
    return Array.from({
        length: arraySize
    }, () => {
        return Math.floor((Math.random() * 100) + 1)
    })
}