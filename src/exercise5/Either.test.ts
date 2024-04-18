import {Either} from "./Either";

describe('Either should', () => {
    test('build a right value', () => {
        const value: Either<string, number> = Either.right(1)

        value.match(
            (rightValue) => expect(rightValue).toBe(1),
            () => {
                throw Error('Should be right, got left')
            })
    })

    test('build a left value', () => {
        const value: Either<string, number> = Either.left("10")

        value.match(
            () => {
                throw Error('Should be left, got right')
            },
            (leftValue) => expect(leftValue).toBe("10"))
    })

    test('map the right value', () => {
        const value: Either<string, number> = Either.right(1)

        const transformedValue = value.map(rightValue => rightValue.toString())

        transformedValue.match(
            (rightValue) => expect(rightValue).toBe("1"),
            () => {
                throw Error('Should be right, got left')
            })
    })

    test('map the left value', () => {
        const value: Either<string, number> = Either.left("10")

        const transformedValue = value.mapLeft(Number.parseInt)

        transformedValue.match(
            () => {
                throw Error('Should be left, got right')
            },
            (leftValue) => expect(leftValue).toBe(10))
    })

    test('flat map the right value', () => {
        const value: Either<string, number> = Either.right(1)

        const transformedValue = value.flatMap(rightValue => Either.right(rightValue.toString()))

        transformedValue.match(
            (rightValue) => expect(rightValue).toBe("1"),
            () => {
                throw Error('Should be right, got left')
            })
    })

    test('flat map the left value', () => {
        const value: Either<string, number> = Either.left("10")

        const transformedValue = value.flatMapLeft(leftValue => Either.left(Number.parseInt(leftValue)))

        transformedValue.match(
            () => {
                throw Error('Should be left, got right')
            },
            (leftValue) => expect(leftValue).toBe(10))
    })
})