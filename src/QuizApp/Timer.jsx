import React, { useEffect, useState } from "react";
const SECS_PER_QUESTIONS = 15;

export default function Timer({ totalQuestions, dispatch }) {
	const [time, setTime] = useState(totalQuestions * SECS_PER_QUESTIONS);

	if (time === 0) {
		dispatch({ type: "finish" });
	}

	const mins = Math.floor(time / 60);
	const secs = time % 60;

	useEffect(() => {
		const id = setInterval(() => {
			setTime((t) => t - 1);
		}, 1000);

		return () => clearInterval(id);
	}, []);
	return (
		<span className="timer">
			{mins < 10 && "0"}
			{mins}:{secs < 10 && "0"}
			{secs} Left
		</span>
	);
}
