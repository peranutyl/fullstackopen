// const Header = ({course}) => {
//   return (
//     <div>
//       <h1>{course}</h1>
//     </div>
//   )
// }
// const Content = ({parts}) => {
//   return (
//     <div>
//       {
//         [...Array(3)].map((_,i) => (<Part key={i} part={parts[i].name} exercise={parts[i].exercises}/>))
//       }
//     </div>

//   )
// }
// const Part =({part, exercise}) => {
//   return (
//     <p>{part} {exercise}</p>
//   )
// }
// const Total = ({parts}) => {
//   return (
//     <p>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
//   )
// }
// const App = () => {
//   const course = { 
//     name: 'Half Stack application development',
//     parts: [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14
//     }
//   ]
//   }

//   return (
//     <div>
//       <Header course={course.name}/>
//       <Content parts={course.parts}/>
//       <Total parts={course.parts}/>
//     </div>
//   )
// }
import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>
    {text}
    </button>
}

const StatisticLine = ({text, value}) => {
  if (text ==="good") {
    return(<tr><td>{text}</td><td>{value.good}</td></tr>)
  } else if (text === "neutral") {
    return(<tr><td>{text}</td><td>{value.neutral}</td></tr>)
  } else if (text === "bad") {
    return(<tr><td>{text}</td><td>{value.bad}</td></tr>)
  }
}

const Statistics = ({good, neutral, bad}) => {
  let value = {
    "good" : good,
    "neutral" : neutral,
    "bad" : bad
  }
  let all = good + neutral + bad

  if ([good, neutral, bad].reduce((ini, a) => ini + a,0 ) == 0) {
    return (
      <div>No FeedBack Given</div>
    )
  }


  return (
    <div>
    <table>
      <tbody>
      <StatisticLine text = "good" value = {value} ></StatisticLine>
      <StatisticLine text = "neutral" value = {value} ></StatisticLine>
      <StatisticLine text = "bad" value = {value} ></StatisticLine>
      </tbody>

    </table>

    <p>all, {all}</p>
    <p>average, {(good - bad) / (all)}</p>
    <p>positive, {(good / (all))}</p>
    </div>
  )
}

const App = () => {
    // save clicks of each button to its own state

    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
    ]

    const [votes, setVotes] = useState(new Uint8Array(8))
    const [selected, setSelected] = useState(0)
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    const handleClick = (reaction) => {
      if (reaction === "g"){
        setGood(good + 1)
      } else if (reaction === "n"){
        setNeutral(neutral + 1)
      } else if (reaction === "b"){
        setBad(bad + 1)
      } else if (reaction === "v"){
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
      } else {
        setSelected(Math.floor(Math.random() * 8))
      }
    }

    const biggest = votes.indexOf(Math.max(...votes))
    console.log(biggest)

  return (
    <div>
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected]} votes</p>
    <Button handleClick={() => handleClick("f")} text = "random"></Button>
    <Button handleClick={() => handleClick("v")} text = "vote"></Button>
    <h1>Anecdote with the Most Votes</h1>
    <p>{anecdotes[biggest]}</p>
    <p>has {votes[biggest]} votes</p>
    <h1>FeedBack</h1>
    <Button handleClick={() => handleClick("g")} text = "good"></Button>
    <Button handleClick={() => handleClick("n")} text = "neutral"></Button>
    <Button handleClick={() => handleClick("b")} text = "bad"></Button>
    <h1>Statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} ></Statistics>
    </div>

  )
}

export default App