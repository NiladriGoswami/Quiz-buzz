import React, { useState } from 'react'
import './Home.css'
import { TextField, MenuItem } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Categories from '../../Data/Categories.js'
import { useHistory } from 'react-router-dom'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

/*use props passing for name within diffenet components in the 'Home' component*/
const Home = ({ name, setName, fetchQuestions }) => {
    /*category-selection hook*/
    const [ category, setCategory ] = useState("");
    /*difficulty-selection hook*/
    const [ difficulty, setDifficulty ] = useState("");
    /*error hook*/
    const [ error, setError ] = useState(false);
    /*history hook*/
    const history = useHistory();

    /*event handler for 'Submit' button*/
    const handleSubmit= () =>{
        /*Checking if all the input-fileds are filled or not.*/
        if(!category || !difficulty || !name ){
            setError(true);
            return;
        }else{
            setError(false);
            fetchQuestions(category, difficulty);
            history.push('/quiz');
        }
    };

    return (
        <div className="content">
            <div className="settings">
                <span style={{fontSize: 30}}>Quiz Settings</span>

                <div className="settings-select">
                    {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
                    <TextField style={{marginBottom: 25, background: 'none'}} label="Enter Your Name" variant="outlined" onChange={(event) => {setName(event.target.value)}} />

                    <TextField select label="Select Category" variant="outlined" style={{marginBottom: 25, background: 'none'}} onChange={(event) =>{setCategory(event.target.value)}} value={category}>
                        {Categories.map((item)=>{
                            return(
                                <MenuItem key={item.category} value={item.value}>
                                    {item.category}
                                </MenuItem>
                                );  
                            })}
                    </TextField>

                    <TextField select label="Select Difficulty" variant="outlined" style={{marginBottom: 30}} onChange={(event) =>{setDifficulty(event.target.value)}} value={difficulty}>
                        <MenuItem key="Easy" value="easy">
                            Easy
                        </MenuItem>
                        <MenuItem key="Medium" value="medium">
                            Medium
                        </MenuItem>
                        <MenuItem key="Hard" value="hard">
                            Hard
                        </MenuItem>
                    </TextField>

                    <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
                        Start Quiz
                    </Button>

                </div>
            </div>
            <img src="/images/quiz-banner1.png" alt="quiz-banner1.png" className="quiz-banner"/>
        </div>
    )
}

export default Home;
