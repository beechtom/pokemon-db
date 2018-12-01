exports.format = function(id, params) {
    // Flatten parameters
    var raw = [params];
        raw = Array.prototype.concat.apply([], raw);

    // Construct array of values
    var values = [];
    raw.forEach(param => {
        values.push([Number(id), Number(param)]);
    });

    return values;
}