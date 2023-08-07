import Timer from "./Timer";

export default function Question({
	question,
	selected,
	dispatch,
	index,
	totalQuestions,
}) {
	const options = question.options.map((v, i) => {
		let impliedClass = "";
		if (selected !== null) {
			impliedClass = selected === i ? "selected " : "";
			impliedClass += question.correctOption === i ? "correct" : "";
		}
		return (
			<button
				disabled={selected !== null ? true : false}
				onClick={() => {
					dispatch({ type: "selected", payload: i });
				}}
				className={"option " + impliedClass}
				key={v}
			>
				{v}
			</button>
		);
	});

	const handleNext = () => {
		if (index < totalQuestions - 1) {
			dispatch({ type: "nextQues" });
		} else {
			dispatch({ type: "finish" });
		}
	};
	return (
		<>
			<p className="question">
				{question.question}
				<span>
					{selected === null
						? ""
						: selected === question.correctOption
						? " ✅"
						: " ❌"}
				</span>
			</p>
			<ul className="options">{options}</ul>
			<div className="nav">
				<Timer totalQuestions={totalQuestions} dispatch={dispatch} />
				{selected !== null ? (
					<button className="btn" onClick={handleNext}>
						{index < totalQuestions - 1 ? "Next" : "Finish"}
					</button>
				) : null}
			</div>
		</>
	);
}
