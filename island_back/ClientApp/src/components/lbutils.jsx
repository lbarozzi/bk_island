export function copy(obj) { return JSON.parse(JSON.stringify(obj)) };
export function isodate(d) { return new Date(d).toISOString(); };
export function txtdate(d) {
    console.log(d);
    let dt = (d === undefined) ? new Date('1970-01-01') : new Date(d);
    return dt.toISOString().slice(0, 10);
};