
declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.html' {
    const content: string;
    export default content;
}

declare module 'material-components-vue/dist/button';

interface UserModel {
    email: string
}
