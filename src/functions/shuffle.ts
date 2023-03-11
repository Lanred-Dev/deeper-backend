//https://stackoverflow.com/questions/53066720/how-can-i-shuffle-a-javascript-array

export default function shuffle(array: Array<any>) {
    let currentIndex: number = array.length;
    let randomIndex: number;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
