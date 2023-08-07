export default function StartScreen({ totalQuestions, dispatch, topic }) {
	return (
		<div className="display-screen">
			<h2>Welcome to The Quiz App!</h2>
			<p>{`${totalQuestions} questions to test your knowledge on ${topic}`}</p>
			<button
				className="btn"
				onClick={() => {
					dispatch({ type: "start" });
				}}
			>
				Lets Learn
			</button>
		</div>
	);
}
