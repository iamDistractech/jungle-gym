<script>
	function submitForm() {
		for (var index = 0; index < document.forms.length; index++) {
			document.forms[index].submit();
		}
	}
</script>

<h1>Nieuw spel maken</h1>

<section>
	<h1>Basis</h1>
	<form>
		<div class="form-group-left">
			<div class="input-container">
				<label for="title">Titel</label>
				<input type="text" name="title" id="title" />
			</div>

			<div class="input-container">
				<label for="description">Omschrijving</label>
				<textarea name="description" id="description" cols="30" rows="10" />
			</div>

			<div class="input-container">
				<label for="category">Categorie</label>
				<select name="category" id="category">
					<option disabled selected value> -- Categorie selecteren -- </option>
					<option value="lintje">Tikspel</option>
					<option value="hoedje">Balspel</option>
					<option value="pion">Hardlopen</option>
				</select>
			</div>

			<div class="input-container">
				<label for="min-players">Min. spelers</label>
				<input type="number" name="min-players" id="min-players" />
			</div>
		</div>

		<div class="form-group-right">
			<div class="input-container">
				<label for="image">Afbeelding</label>
				<input type="file" name="image" id="image" />
			</div>

			<fieldset>
				<legend>(Doel)groepen</legend>
				<label for="groep1">Groep 1</label>
				<input type="checkbox" name="groep1" id="groep1" />

				<label for="groep1">Groep 2</label>
				<input type="checkbox" name="groep2" id="groep2" />

				<label for="groep1">Groep 3</label>
				<input type="checkbox" name="groep3" id="groep3" />

				<label for="groep1">Groep 4</label>
				<input type="checkbox" name="groep4" id="groep4" />

				<label for="groep1">Groep 5</label>
				<input type="checkbox" name="groep5" id="groep5" />

				<label for="groep1">Groep 6</label>
				<input type="checkbox" name="groep6" id="groep6" />

				<label for="groep1">Groep 7</label>
				<input type="checkbox" name="groep7" id="groep7" />

				<label for="groep1">Groep 8</label>
				<input type="checkbox" name="groep8" id="groep8" />
			</fieldset>
		</div>

		<input type="submit" value="Opslaan" id="first-form-submit" />
	</form>
</section>

<button on:click={submitForm}>Button</button>

<section>
	<h1>Materialen</h1>
	<form>
		<div>
			<div class="input-container">
				<label for="material">Materiaal</label>
				<select name="material" id="material">
					<option disabled selected value> -- Materiaal selecteren -- </option>
					<option value="lintje">Lintje</option>
					<option value="hoedje">Hoedje</option>
					<option value="pion">Pion</option>
				</select>
			</div>

			<div class="input-container">
				<label for="amount">Hoeveelheid</label>
				<input type="number" name="amount" id="amount" />
			</div>

			<div class="input-container">
				<label for="description">Omschrijving</label>
				<textarea name="description" id="description" cols="30" rows="10" />
			</div>
		</div>
	</form>
</section>

<section>
	<h1>Regels</h1>
	<form>
		<div>
			<label for="description">Description</label>
			<textarea name="description" id="description" cols="30" rows="10" />
		</div>
	</form>
</section>

<style>
	section:first-of-type form {
		/* display: grid; */
		display: flex;
		flex-direction: column;
	}

	section:first-of-type form .form-group-left {
		width: 45%;
	}

	section:first-of-type form .form-group-right {
		width: 45%;
	}
</style>
