import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import './Question.css'
import { useHistory } from 'react-router-dom'

const Question = ({currentQuestion, setCurrentQuestion, questions, options, correct, setScore, score, setQuestions}) => {
    /*Selected option state hook*/
    const [ selected, setSelected ] = useState();
    /*Error message state hook*/
    const [ error, setError] = useState(false);
    /*declaring useHistory hook.*/
    const history = useHistory();
    /*Creating handle select function.*/
    const handleSelect = (i) =>{
        if( selected === i && selected === correct ){
            return "select";
        }else if( selected === i && selected !== correct ){
            return "wrong";
        }else if( i === selected ){
            return "select";
        }
    };

    const handleCheck = (i) => {
        setSelected(i);
        if(i === correct) setScore(score +1);
        setError(false);
    };

    const handleQuit = () => {
        
    };

    const handleNext = () => {
        if(currentQuestion > 8){
            history.push('/result');   
        }else if(selected){
            setCurrentQuestion(currentQuestion + 1);
            setSelected();
        }else{
            setError("Please select an option first.");
        }
    };

    return (
        <div className="question">
            <h1>Question {currentQuestion + 1}</h1>
            <div className="singleQuestion">
                 <h2>{questions[currentQuestion].question}</h2>
                <div className="options">
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {options && 
                        options.map((i) => (
                            <button
                             onClick={() => {handleCheck(i)}} 
                             className={`singleOption ${selected && handleSelect(i)}`} 
                             key={i} 
                             disabled={selected}>
                                {i}
                            </button>
                        ))}
                </div>
                <div className="controls">
                        <Button variant="contained" color="secondary" size="large" style={{width: 185}} href="/" onClick={handleQuit}>
                            Quit
                        </Button>
                        <Button variant="contained" color="primary" size="large" style={{width : 185}} onClick={handleNext}>
                            Next Question
                        </Button>
                </div>
            </div>
        </div>
    )
}

export default Question;