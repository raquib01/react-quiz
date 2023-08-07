import React from "react";

export default function Progress({
	index,
	totalQuestions,
	points,
	totalPoints,
	selected,
}) {
	return (
		<div>
			<progress
				className="progress-bar"
				max={totalQuestions}
				value={index + Number(selected !== null)}
			/>
			<div className="progress-div">
				<p>
					Questions {index + 1}/{totalQuestions}
				</p>
				<p>
					Points {points}/{totalPoints}
				</p>
			</div>
		</div>
	);
}
