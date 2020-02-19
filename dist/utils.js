"use strict";
Object.from = function (objectLike) {
    var obj = {};
    for (var index = 0; index < objectLike.length; ++index)
        obj[objectLike[index].name] = objectLike[index].value;
    return obj;
};
String.prototype.kebabToCamelCase = function () {
    var name = this.replace(/(\-\w)/g, function (m) { return m[1].toUpperCase(); });
    return name.charAt(0).toUpperCase() + name.slice(1);
};
if (!Array.prototype.flat) {
    Object.defineProperty(Array.prototype, "flat", {
        value: function (depth = 1) {
            if (depth > 0)
                return this.map((el) => {
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
//# sourceMappingURL=utils.js.map