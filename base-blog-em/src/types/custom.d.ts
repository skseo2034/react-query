// src/types/custom.d.ts
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}
