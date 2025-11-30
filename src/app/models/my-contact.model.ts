export class MyContact {
    id: string = crypto.randomUUID()
    .replace(/-/g, '')
    .split('')
    .reduce((acc, v) => acc + parseInt(v, 4).toString(), '');
    name!: string;
    email!: string;
    photo!: string;
    mobile!: string;
    company!: string;
    title!: string;
    groupId!: string;
}
