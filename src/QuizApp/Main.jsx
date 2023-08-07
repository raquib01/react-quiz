import { useEffect, useReducer } from "react";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
	topic: "",
	questions: [],
	status: "loading",
	index: 0,
	selected: null,
	points: 0,
	highestScore: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataFetched":
			return {
				...state,
				topic: action.payload[0].name,
				questions: action.payload[1],
				status: "ready",
			};

		case "dataFailed":
			return {
				...state,
				status: "error",
			};
		case "start":
			return {
				...state,
				status: "active",
			};

		case "selected":
			const question = state.questions[state.index];
			return {
				...state,
				selected: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};

		case "nextQues":
			return {
				...state,
				index: state.index + 1,
				selected: null,
			};
		case "finish":
			return {
				...state,
				selected: null,
				status: "finish",
				highestScore:
					state.points > state.highestScore ? state.points : state.highestScore,
			};
		case "restart":
			return {
				...state,
				status: "ready",
				index: 0,
				selected: null,
				points: 0,
			};
		default:
			throw new Error("Unknown dispatch Action");
	}
}
export default function Main() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const totalQuestions = state.questions.length;
	const totalPoints = state.questions.reduce(
		(prev, curr) => prev + curr.points,
		0
	);
	useEffect(() => {
		async function fetchQuestions() {
			try {
				const topicRes = await fetch("http://localhost:8000/topic");
				const quesRes = await fetch("http://localhost:8000/questions");
				const topicData = await topicRes.json();
				const quesData = await quesRes.json();
				dispatch({ type: "dataFetched", payload: [topicData, quesData] });
			} catch (error) {
				dispatch({ type: "dataFailed" });
			}
		}

		fetchQuestions();
	}, []);
	return (
		<div className="container">
			{state.status === "loading" && <Loader />}
			{state.status === "error" && <Error />}
			{state.status === "ready" && (
				<StartScreen
					totalQuestions={totalQuestions}
					dispatch={dispatch}
					topic={state.topic}
				/>
			)}
			{state.status === "finish" && (
				<FinishScreen
					totalPoints={totalPoints}
					scoredPoints={state.points}
					highestScore={state.highestScore}
					dispatch={dispatch}
					topic={state.topic}
				/>
			)}
			{state.status === "active" && (
				<>
					<Progress
						points={state.points}
						totalPoints={totalPoints}
						totalQuestions={totalQuestions}
						index={state.index}
						selected={state.selected}
					/>
					<Question
						question={state.questions[state.index]}
						selected={state.selected}
						dispatch={dispatch}
						index={state.index}
						totalQuestions={totalQuestions}
					/>
				</>
			)}
		</div>
	);
}
