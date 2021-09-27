import './Quiz.css'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'
import Question from '../../Question/Question'

const Quiz = ({name, score, questions, setQuestions, setScore}) => {
    /*options state hook*/
    const [ options, setOptions ] = useState();
    /*currentQuestion state hook*/
    const [ currentQuestion, setCurrentQuestion ] = useState(0);

    useEffect(()=>{
       //console.log(questions);
        /*Shuffling the options of the questions when we get any questions*/
        setOptions(questions && 
            handleShuffle([
                questions[currentQuestion]?.correct_answer, 
                ...questions[currentQuestion]?.incorrect_answers, 
            ])
        );
    }, [questions, currentQuestion]);

    //console.log(options);

    const handleShuffle = (option) => {
        return option.sort(() => Math.random() - 0.5);

    };
    return (
        <div className="quiz">
            <span className="subtitle">Welcome, {name}</span> 
            {questions ? (
                    <>
                        <div className="quizInfo">
                            <span>{questions[currentQuestion].category}</span>
                            <span>Score : {score}</span>
                        </div>

                        <Question currentQuestion={currentQuestion} 
                        setCurrentQuestion={setCurrentQuestion}
                        questions={questions}
                        options={options}
                        correct={questions[currentQuestion]?.correct_answer}
                        score={score}
                        setScore={setScore}
                        setQuestion={setQuestions}
                        />

                    </>
                ) : (
                    <CircularProgress style={{margin: 100 }} color= "inherit" size={150} thickness={1}/>
                )
            }
        </div>
    )
}

export default Quiz;