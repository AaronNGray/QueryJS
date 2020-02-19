interface Object {
    from(objectLike:any):any
}

Object.from = function (objectLike:any):any {
    var obj:{[index: string]:any} = {};
    for (var index = 0; index < objectLike.length; ++index)
        obj[<string>objectLike[index].name] = objectLike[index].value;
    return obj;
}

interface String {
    kebabToCamelCase():string
}

String.prototype.kebabToCamelCase = function():string {
    var name = this.replace(/(\-\w)/g, function(m) { return m[1].toUpperCase(); });
    return name.charAt(0).toUpperCase() + name.slice(1)
}

interface Array<T> {

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][][][][], depth: 7): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][][][], depth: 6): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][][], depth: 5): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][], depth: 4): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][], depth: 3): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][], depth: 2): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][], depth?: 1): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[], depth: 0): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth. If no depth is provided, flat method defaults to the depth of 1.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(depth?: number): any[];
}

if (!Array.prototype.flat) {
    Object.defineProperty(Array.prototype, "flat", {
        value: function(depth:number = 1) {
            if (depth > 0)
                return this.map((el:any) => {
                    if (Array.isArray(el))
                        return el.flat(depth - 1);
                    else
                        return el;
                });
            else
                return this;
        }
    });
}
