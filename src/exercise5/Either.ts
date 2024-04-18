export abstract class Either<L, R> {
    static right<L, R>(value: R): Either<L, R> {
        return new Right(value)
    }
    static left<L, R>(value: L): Either<L, R> {
        return new Left(value)
    }
    public abstract map<TR>(f: (value: R) => TR): Either<L, TR>
    public abstract mapLeft<TL>(f: (value: L) => TL): Either<TL, R>
    public abstract flatMap<TR>(f: (value: R) => Either<L, TR>): Either<L, TR>
    public abstract flatMapLeft<TL>(f: (value: L) => Either<TL, R>): Either<TL, R>
    public abstract match<T>(ifRight: (value: R) => T, ifLeft: (value: L) => T): T
}

class Right<R> extends Either<never, R> {
    constructor(private value: R) {
        super();
    }
    flatMap<TR>(f: (value: R) => Either<never, TR>): Either<never, TR> {
        return f(this.value);
    }

    flatMapLeft<TL>(_: (value: never) => Either<TL, R>): Either<TL, R> {
        return Either.right(this.value);
    }

    map<TR>(f: (value: R) => TR): Either<never, TR> {
        return Either.right(f(this.value));
    }

    mapLeft<TL>(_: (value: never) => TL): Either<TL, R> {
        return Either.right(this.value);
    }

    match<T>(ifRight: (value: R) => T, _: (value: never) => T): T {
        return ifRight(this.value);
    }
}

class Left<L> extends Either<L, never> {
    constructor(private value: L) {
        super();
    }
    flatMap<TR>(_: (value: never) => Either<L, TR>): Either<L, TR> {
        return Either.left(this.value);
    }

    flatMapLeft<TL>(f: (value: L) => Either<TL, never>): Either<TL, never> {
        return f(this.value);
    }

    map<TR>(_: (value: never) => TR): Either<L, TR> {
        return Either.left(this.value);
    }

    mapLeft<TL>(f: (value: L) => TL): Either<TL, never> {
        return Either.left(f(this.value));
    }

    match<T>(_: (value: never) => T, ifLeft: (value: L) => T): T {
        return ifLeft(this.value);
    }
}
