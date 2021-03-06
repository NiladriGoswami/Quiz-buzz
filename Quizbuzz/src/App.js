import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Pages/Home/Home';
import Quiz from './components/Pages/Quiz/Quiz';
import Result from './components/Pages/Result/Result';
import Footer from './components/Footer/Footer';
import axios from 'axios';


function App() {
  /*name state hook, created over here to share this state in all the components.*/
  const [name, setName] = useState("");
  /*question state hook*/
  const [ questions, setQuestions ] = useState();
  /*score state hook*/
  const [ score, setScore ] = useState(0);
  /*fetchQuestions event-handler*/
  const fetchQuestions = async(category = "", difficulty = "") =>{

    const { data } = await axios.get(`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`);
    //console.log(data);
    /*updating the questions tate using the setQuestion within which we pass the fetched data.results.*/
    setQuestions(data.results);
    //console.log(questions)
  };

  
  return (
    <BrowserRouter>
        <div className="app" style={{backgroundImage:'url(./images/quiz1.jpg)'}}>
          <Header />
            <Switch>
                <Route path="/" exact >
                  <Home name={name} setName={setName} fetchQuestions={fetchQuestions}/>
                </Route>
                <Route path="/quiz" exact >
                  <Quiz name={name} questions={questions} score={score} setScore={setScore} setQuestions={setQuestions}/>
                </Route>
                <Route path="/result" exact >
                  <Result  name={name} score={score}/>
                </Route>
            </Switch>
          
        </div>
      <Footer />   
    </BrowserRouter>
  );
}

export default App;
