const generateId = () => {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    const id = S4() + S4() + S4() + S4() + S4() + S4();

    return (
        id.substring(0, 8).toUpperCase()
    );
}

console.log(generateId())

export default generateId;