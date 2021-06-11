<script>
	import SubmitButton from '$lib/shared/Button/SubmitButton.svelte';
	import { messageStore } from '$lib/Stores/message';

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
			type: 'short-form',
			game: gameName,
			emoji: firstStepForm['emoji-overall'].value
		};

		console.log(overallAnswer);

		clearFormSteps(firstStepForm);
	}

	function submitLongForm() {
		const explanationForm = document.querySelector('.explanation-container');

		const descriptionAnswers = {
			emoji: explanationForm['emoji-description'].value,
			explanation: explanationForm['explanation-description'].value
		};

		const executionAnswers = {
			emoji: explanationForm['emoji-execution'].value,
			explanation: explanationForm['explanation-execution'].value
		};

		const kidsAnswers = {
			emoji: explanationForm['emoji-kids'].value,
			explanation: explanationForm['explanation-kids'].value
		};

		const gameName = window.location.pathname.split('/')[2];

		const formResults = {
			type: 'long-form',
			game: gameName,
			descriptionAnswers,
			executionAnswers,
			kidsAnswers
		};

		console.log(formResults);

		clearFormSteps(explanationForm);
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
	<input type="radio" id="sad" name="emoji-overall" value="sad" on:click={toggleConfirmation} />
	<label for="sad">
		<img src="/icons/GameReview/sad.svg" alt="" />
	</label>

	<input
		type="radio"
		id="neutral"
		name="emoji-overall"
		value="neutral"
		on:click={toggleConfirmation}
	/>
	<label for="neutral">
		<img src="/icons/GameReview/surprised.svg" alt="" />
	</label>

	<input type="radio" id="happy" name="emoji-overall" value="happy" on:click={toggleConfirmation} />
	<label for="happy">
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
		<input type="radio" id="sad-description" name="emoji-description" value="sad" />
		<label for="sad-description">
			<img src="/icons/GameReview/sad.svg" alt="" />
		</label>

		<input type="radio" id="neutral-description" name="emoji-description" value="neutral" />
		<label for="neutral-description">
			<img src="/icons/GameReview/surprised.svg" alt="" />
		</label>

		<input type="radio" id="happy-description" name="emoji-description" value="happy" />
		<label for="happy-description">
			<img src="/icons/GameReview/happy.svg" alt="" />
		</label>

		<label for="explanation-description" class="fieldset-title">Licht je antwoord toe</label>
		<small>(optioneel)</small>
		<textarea name="explanation-description" cols="30" rows="10" />
	</fieldset>

	<fieldset>
		<legend>Hoe was het spel in de praktijk? [2/3]</legend>
		<input type="radio" id="sad-execution" name="emoji-execution" value="sad" />
		<label for="sad-execution">
			<img src="/icons/GameReview/sad.svg" alt="" />
		</label>

		<input type="radio" id="neutral-execution" name="emoji-execution" value="neutral" />
		<label for="neutral-execution">
			<img src="/icons/GameReview/surprised.svg" alt="" />
		</label>

		<input type="radio" id="happy-execution" name="emoji-execution" value="happy" />
		<label for="happy-execution">
			<img src="/icons/GameReview/happy.svg" alt="" />
		</label>

		<label for="explanation-execution" class="fieldset-title">Licht je antwoord toe</label>
		<small>(optioneel)</small>
		<textarea name="explanation-execution" cols="30" rows="10" />
	</fieldset>

	<fieldset>
		<legend>Vonden de kinderen het een leuk spel? [3/3]</legend>
		<input type="radio" id="sad-kids" name="emoji-kids" value="sad" />
		<label for="sad-kids">
			<img src="/icons/GameReview/sad.svg" alt="" />
		</label>

		<input type="radio" id="neutral-kids" name="emoji-kids" value="neutral" />
		<label for="neutral-kids">
			<img src="/icons/GameReview/surprised.svg" alt="" />
		</label>

		<input type="radio" id="happy-kids" name="emoji-kids" value="happy" />
		<label for="happy-kids">
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
	}

	.explanation-container {
		display: none;
	}
</style>
