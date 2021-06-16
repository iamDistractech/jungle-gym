<script>
	import SubmitButton from '$lib/shared/button/SubmitButton.svelte';
	import { messageStore } from '$lib/stores/message';
	import { VITE_STRAPI_API_URL } from '$lib/Env.js';

	function toggleConfirmation() {
		const confirmBox = document.querySelector('.confirm-container');
		confirmBox.style.display = 'block';
		confirmBox.scrollIntoView({ behavior: 'smooth' });
	}
	function toggleExplanation() {
		const explanationForm = document.querySelector('.explanation-container');
		explanationForm.style.display = 'block';
		explanationForm.scrollIntoView({ behavior: 'smooth' });
	}
	function submitSmallForm() {
		const firstStepForm = document.querySelector('.first-step');
		const gameName = window.location.pathname.split('/')[2];
		const overallAnswer = {
			type: 'short',
			game: gameName,
			overallEmoji: firstStepForm['emoji-overall'].value
		};
		sendResultsToDB(overallAnswer);
		clearFormSteps();
	}
	function submitLongForm() {
		const explanationForm = document.querySelector('.explanation-container');
		const descriptionAnswers = {
			emoji: explanationForm['emoji-description'].value,
			explanation: explanationForm['explanation-description'].value
		};
		const rulesAnswers = {
			emoji: explanationForm['emoji-rules'].value,
			explanation: explanationForm['explanation-rules'].value
		};
		const kidsAnswers = {
			emoji: explanationForm['emoji-kids'].value,
			explanation: explanationForm['explanation-kids'].value
		};
		const gameName = window.location.pathname.split('/')[2];
		const formResults = {
			type: 'long',
			game: gameName,
			descriptionAnswers,
			rulesAnswers,
			kidsAnswers
		};

		sendResultsToDB(formResults);
		clearFormSteps();
	}
	async function sendResultsToDB(formResults) {
		// Both forms have fields in common
		let result = {
			game: formResults.game,
			type: formResults.type
		};
		const isShortForm = formResults.type === 'short';
		if (isShortForm) {
			result = {
				...result,
				overallEmoji: formResults.overallEmoji
			};
		} else {
			result = {
				...result,
				descriptionEmoji: formResults.descriptionAnswers.emoji,
				descriptionExplanation: formResults.descriptionAnswers.explanation,
				rulesEmoji: formResults.rulesAnswers.emoji,
				rulesExplanation: formResults.rulesAnswers.explanation,
				kidsEmoji: formResults.kidsAnswers.emoji,
				kidsExplanation: formResults.kidsAnswers.explanation
			};
		}
		const response = await fetch(`${VITE_STRAPI_API_URL}/reviews`, {
			method: 'POST',
			body: JSON.stringify(result),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.json();
	}
	function clearFormSteps() {
		const submitMessage = 'Jouw feedback is verstuurd. Bedankt!';
		messageStore.set(submitMessage);
		hideFormAfterSubmit();
		const firstStepForm = document.querySelector('.first-step');
		const explanationForm = document.querySelector('.explanation-container');
		firstStepForm.reset();
		explanationForm.reset();
	}
	function hideFormAfterSubmit() {
		const firstStepForm = document.querySelector('.first-step');
		firstStepForm.scrollIntoView({ behavior: 'smooth' });
		const explanationForm = document.querySelector('.explanation-container');
		const confirmBox = document.querySelector('.confirm-container');
		setTimeout(() => {
			confirmBox.style.display = 'none';
			explanationForm.style.display = 'none';
		}, 500);
	}
</script>

<form name="emoji" class="first-step" action="">
	<input type="radio" id="bad" name="emoji-overall" value="Slecht" on:click={toggleConfirmation} />
	<label for="bad">
		<img src="/icons/GameReview/sad.svg" alt="" />
	</label>

	<input
		type="radio"
		id="neutral"
		name="emoji-overall"
		value="Neutraal"
		on:click={toggleConfirmation}
	/>
	<label for="neutral">
		<img src="/icons/GameReview/surprised.svg" alt="" />
	</label>

	<input type="radio" id="goed" name="emoji-overall" value="Goed" on:click={toggleConfirmation} />
	<label for="goed">
		<img src="/icons/GameReview/happy.svg" alt="" />
	</label>

	<!-- Short form if JavaScript is disabled -->
	<noscript>
		<button type="submit" class="yes-btn">Verstuur</button>
	</noscript>

	<div class="confirm-container">
		<p>Bedankt, wil jij jouw keuze toelichten?</p>
		<div>
			<button class="yes-btn" on:click|preventDefault={() => toggleExplanation()}>Ja</button>
			<button class="no-btn" on:click|preventDefault={submitSmallForm} type="submit"
				>Nee, bedankt</button
			>
		</div>
	</div>
</form>

<form class="explanation-container" action="" on:submit|preventDefault={submitLongForm}>
	<fieldset>
		<legend>Was de omschrijving van het spel duidelijk? [1/3]</legend>
		<input type="radio" id="bad-description" name="emoji-description" value="Slecht" />
		<label for="bad-description">
			<img src="/icons/GameReview/sad.svg" alt="" />
		</label>

		<input type="radio" id="neutral-description" name="emoji-description" value="Neutraal" />
		<label for="neutral-description">
			<img src="/icons/GameReview/surprised.svg" alt="" />
		</label>

		<input type="radio" id="goed-description" name="emoji-description" value="Goed" />
		<label for="goed-description">
			<img src="/icons/GameReview/happy.svg" alt="" />
		</label>

		<label for="explanation-description" class="fieldset-title">Licht je antwoord toe</label>
		<small>(optioneel)</small>
		<textarea name="explanation-description" cols="30" rows="10" />
	</fieldset>

	<fieldset>
		<legend>Waren de regels duidelijk? [2/3]</legend>
		<input type="radio" id="bad-rules" name="emoji-rules" value="Slecht" />
		<label for="bad-rules">
			<img src="/icons/GameReview/sad.svg" alt="" />
		</label>

		<input type="radio" id="neutral-rules" name="emoji-rules" value="Neutraal" />
		<label for="neutral-rules">
			<img src="/icons/GameReview/surprised.svg" alt="" />
		</label>

		<input type="radio" id="goed-rules" name="emoji-rules" value="Goed" />
		<label for="goed-rules">
			<img src="/icons/GameReview/happy.svg" alt="" />
		</label>

		<label for="explanation-rules" class="fieldset-title">Licht je antwoord toe</label>
		<small>(optioneel)</small>
		<textarea name="explanation-rules" cols="30" rows="10" />
	</fieldset>

	<fieldset>
		<legend>Vonden de kinderen het een leuk spel? [3/3]</legend>
		<input type="radio" id="bad-kids" name="emoji-kids" value="Slecht" />
		<label for="bad-kids">
			<img src="/icons/GameReview/sad.svg" alt="" />
		</label>

		<input type="radio" id="neutral-kids" name="emoji-kids" value="Neutraal" />
		<label for="neutral-kids">
			<img src="/icons/GameReview/surprised.svg" alt="" />
		</label>

		<input type="radio" id="goed-kids" name="emoji-kids" value="Goed" />
		<label for="goed-kids">
			<img src="/icons/GameReview/happy.svg" alt="" />
		</label>

		<label for="explanation-kids" class="fieldset-title">Licht je antwoord toe</label>
		<small>(optioneel)</small>
		<textarea name="explanation-kids" cols="30" rows="10" />
	</fieldset>

	<SubmitButton>Versturen</SubmitButton>
</form>

<style>
	form {
		text-align: center;
		margin-top: 2em;
	}
	form label img {
		height: 4em;
		width: 4em;
		margin: 0.5em;
		border: none;
		background-color: transparent;
	}
	form label img:hover {
		cursor: pointer;
		transform: scale(1);
	}
	form input {
		display: none;
	}
	form input:checked + label img {
		transform: scale(1.25);
		transition: all 0.2s ease-out;
	}
	.fieldset-title {
		display: block;
	}
	form input:not(checked) + label img {
		transform: scale(0.8);
		transition: all 0.25s;
	}
	form div div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	form textarea {
		box-sizing: border-box;
		font-family: var(--font-body);
		width: 90%;
		padding: 0.5em;
		font-size: 0.9em;
		max-width: 800px;
	}
	.yes-btn {
		padding: 0.75em;
		border-radius: 1em;
		border: none;
		font-size: 1em;
		background: var(--color-base-light);
		color: var(--color-black);
		margin: 1em 0;
		cursor: pointer;
		min-width: 7em;
		text-align: center;
	}
	.no-btn {
		border: none;
		background-color: transparent;
		text-decoration: underline;
		color: var(--color-accent-action);
	}
	.confirm-container {
		display: none;
		padding-bottom: 1em;
	}
	.explanation-container {
		display: none;
	}
</style>
