export function Person({ name, hairColor, eyeColor }: { name: any; hairColor: any; eyeColor: any }) {
	return (
		<li>
			{name}
			<ul>
				<li>hair: {hairColor}</li>
				<li>eyes: {eyeColor}</li>
			</ul>
		</li>
	);
}
