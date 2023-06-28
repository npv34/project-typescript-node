function sum(a: number, b: number) {
    return a + b;
}

test("test sum", () => {
    const a = 5;
    const b = 10;
    const actual = 15;
    expect(sum(a, b)).toEqual(actual)
})
