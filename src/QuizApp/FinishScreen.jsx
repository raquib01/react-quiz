export default function FinishScreen({
	scoredPoints,
	totalPoints,
	highestScore,
	dispatch,
	topic,
}) {
	const per = (scoredPoints / totalPoints) * 100;
	return (
		<div className="display-screen">
			<h2>
				You Earned {scoredPoints} out off {totalPoints} Points! (
				{per.toFixed(2)}%)
			</h2>
			<p>{`Congratualations on Completing the ${topic} Quizz`}</p>
			<p>Highest Score: {highestScore}</p>
			<button className="btn" onClick={() => dispatch({ type: "restart" })}>
				Restart
			</button>
		</div>
	);
}
