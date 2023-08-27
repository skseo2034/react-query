export function Species({ name, language, averageLifespan }: { name: any; language: any; averageLifespan: any }) {
	return (
		<li>
			{name}
			<ul>
				<li>language: {language}</li>
				<li>average lifespan: {averageLifespan}</li>
			</ul>
		</li>
	);
}
