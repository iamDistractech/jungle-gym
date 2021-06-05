<section>
	<h1>Uitgelichte spellen</h1>
	<ul>
		<a href="spellen/#">
			<div>
				<h1>Kat en Muis</h1>
				<p>Groep: 2, 3 | Tikspel</p>
			</div>
		</a>
	</ul>
</section>

<style>
	h1 {
		font-size: 1.2em;
		font-weight: 600;
		margin-bottom: 1em;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		background-color: var(--color-base-light);
		border-radius: 1em;
		margin-bottom: 2em;
		padding: 1.5rem 2rem;
		display: flex;
		box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.06);
		text-decoration: none;
	}

	ul a div {
		width: 100%;
	}

	ul a div h1 {
		font-size: 1em;
		color: var(--color-accent-dark);
		font-weight: 400;
		margin: 0;
		display: flex;
		justify-content: space-between;
	}

	ul a div h1::after {
		content: '>';
		border-radius: 50%;
		width: 2em;
		height: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
	}

	ul a:focus {
		cursor: pointer;
	}

	p {
		margin: 0;
		font-size: 0.8em;
		font-weight: 400;
	}
</style>
