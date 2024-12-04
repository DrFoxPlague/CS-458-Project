import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CheckQuestion, GetGame } from "../gql/games";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState } from "react";
import { useOngoingGameStore } from "../stores/OngoingGame.store";
import { Button, Stack, Typography } from "@mui/material";
import { useAuthStore } from "../stores/Auth.store";

export const GamePage = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { id } = useParams(); // This is how you get the URL parameters in React Router
    const [feedbackType, setFeedbackType] = useState<
        "correct" | "wrong" | null
    >(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const {
        setCurrentQuestion,
        currentQuestion,
        setOngoingGame,
        increaseCorrectAnswerCount,
        correstAnswerCount,
        resetOngoingGame,
        resetCorrectAnswerCount,
    } = useOngoingGameStore();

    const { data: { getGame: game } = {}, loading } = useQuery(GetGame, {
        variables: { id },
        skip: !id || !user,
        onCompleted: (data) => {
            setOngoingGame(data.getGame);
            setCurrentQuestion(0);
        },
    });

    const [checkQuestion, { loading: checkingQuestion }] = useLazyQuery(
        CheckQuestion,
        {
            onCompleted: (data) => {
                if (data.checkQuestion) {
                    increaseCorrectAnswerCount();
                    setFeedbackType("correct");
                    setFeedback("Correct!");
                } else {
                    setFeedbackType("wrong");
                    setFeedback("Wrong!");
                }

                setTimeout(() => {
                    setFeedback(null);
                    setFeedbackType(null);
                    setCurrentQuestion(currentQuestion + 1);
                    setButtonsDisabled(false);
                }, 2000);
            },
        }
    );

    if (!user) return <Navigate to="/login" />; // Redirect to login page if the user is not logged in
    if (!id) return <Navigate to="/" />; // Redirect to 404 page if the URL parameter is missing
    if (loading) return <></>;

    const finishGame = () => {
        resetOngoingGame();
        resetCorrectAnswerCount();
        navigate("/");
    };

    if (currentQuestion === game.questions.length) {
        return (
            <Stack alignItems="center" className="quiz" p={2}>
                <Typography variant="h5">{game.subject} Quiz</Typography>
                <Typography variant="h6">
                    You have completed the quiz!
                </Typography>
                <Typography variant="h6">
                    You got {correstAnswerCount} out of {game.questions.length}{" "}
                    questions correct!
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ textTransform: "none" }}
                    onClick={finishGame}
                >
                    Finish
                </Button>
            </Stack>
        );
    }

    return (
        <Stack alignItems="center" className="quiz" p={2}>
            <Typography variant="h5">{game.subject} Quiz</Typography>

            <Typography variant="h6">
                {game.questions[currentQuestion]?.question}
            </Typography>

            {feedback && (
                <Typography
                    variant="body2"
                    className={`feedback ${feedbackType}`}
                >
                    {feedback}
                </Typography>
            )}
            <Stack className="options w-full" direction="column" gap={2}>
                {game.questions[currentQuestion].choices.map(
                    (choice: string) => (
                        <Button
                            key={choice}
                            sx={{
                                textTransform: "none",
                            }}
                            fullWidth
                            onClick={() => {
                                setButtonsDisabled(true);
                                checkQuestion({
                                    variables: {
                                        id: game.questions[currentQuestion].id,
                                        answer: choice,
                                    },
                                });
                            }}
                            disabled={buttonsDisabled || checkingQuestion}
                        >
                            {choice}
                        </Button>
                    )
                )}
            </Stack>
        </Stack>
    );
};
