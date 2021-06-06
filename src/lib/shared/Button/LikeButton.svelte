<script>
	let likes = 0;
	let liked = false;
	function likedGame() {
		liked = !liked;
		liked ? (likes += 1) : (likes -= 1);
	}
</script>

<button
	class="like-btn"
	on:click={likedGame}
	class:is-liked-background={liked}
	class:not-liked-background={!liked}
>
	<i class="material-icons bouncy" class:is-liked={!liked} class:not-liked={liked}
		>favorite_border</i
	>
	<i class="material-icons bouncy" class:is-liked={liked} class:not-liked={!liked}>favorite</i>
	<span>{likes}</span>
</button>

<style>
	.like-btn {
		position: relative;
		border: none;
		width: 4.5em;
		border-radius: 0.5em;
		background: var(--color-light-grey);
		display: flex;
		justify-content: space-around;
		align-items: center;
		transition: all 0.4s;
		overflow: hidden;
	}

	.like-btn span {
		color: var(--color-white);
	}

	.like-btn i:nth-child(1) {
		color: var(--color-white);
	}

	.like-btn i:nth-child(2) {
		color: var(--color-white);
	}

	.is-liked {
		display: block;
	}

	.not-liked {
		display: none;
	}

	.is-liked-background {
		background-color: var(--color-accent-action);
		transition: all 0.2s ease-in;
	}

	.not-liked-background {
		transition: all 0.2s ease-in;
	}

	@keyframes bouncy {
		from,
		to {
			transform: scale(1, 1);
		}
		25% {
			transform: scale(0.9, 1.1);
		}
		50% {
			transform: scale(1.1, 0.9);
		}
		75% {
			transform: scale(0.95, 1.05);
		}
	}

	.bouncy {
		-webkit-animation: bouncy 0.6s;
		animation: bouncy 0.6s;
		-webkit-animation-duration: 0.6s;
		animation-duration: 0.6s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
</style>
