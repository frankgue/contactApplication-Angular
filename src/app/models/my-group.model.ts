export class MyGroup {
    id: string = crypto.randomUUID()
    .replace(/-/g, '')
    .split('')
    .reduce((acc, v) => acc + parseInt(v, 4).toString(), '');
    name!: string;
}
