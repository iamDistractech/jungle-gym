<script>
  export let titleGame;
  export let groups;
  export let game;
  export let personAmount;
</script>

<article>
  <div>
    <h3>{titleGame}</h3>
    <div class="label-container">
      <p class="label">{groups}</p>
      <p class="label">{game}</p>
      <p class="label">{personAmount}</p>
    </div>
  </div>
  <span>></span>
</article>

<style>
  	article {
		background-color: #f3f3f3;
		border-radius: 1em;
		margin: 1em 0;
		padding: 1em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}


	span {
		background: var(--color-light-orange);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		display:flex;
		justify-content: center;
		align-items: center;
	}

  .label {
		background-color: var(--color-light-orange);
		padding: 0.3rem 1rem;
		border-radius: 1rem;
		margin-right: 0.5rem;
		font-size: 0.8rem;
		margin-bottom: 0;
	}
	.label-container {
		display: flex;
		flex-wrap: wrap;
	}
</style>