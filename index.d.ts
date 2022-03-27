declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '@docusaurus/*';

declare module '@site/*';

declare module '@theme/*';
