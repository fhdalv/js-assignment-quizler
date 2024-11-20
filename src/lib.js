import fs from 'fs'

export const chooseRandom = (arr = [], numIems) => {

  const result = []
  if(arr.length <= 1) {return arr}
  if(!(0 < numIems < arr.length)){
    numIems = Math.floor(Math.random() * arr.length + 1) //A random whole number between 1 and arr.length inclusive
  }
  for(let elem of [...Array(numIems).keys()]){  //looping over the keys of a sparsed array of length numItems
    let randomItem = Math.floor(Math.random() * arr.length) //getting a random number from arr length
    result.push(arr[randomItem])      //adding the item of that arr at index of arr[randomItem] which was randomly picked
  }
  return result

}

export const createPrompt = ( { numQuestions = 1, numChoices = 2 } = {}) => {
  let arr = []
  
  for(let i = 1; i <= numQuestions; i++){
    //adding questions numQuestions number of times
    arr.push({
      type: 'input',
      name: `question-${i}`,
      message: `Enter question ${i}`
    })
    for(let j = 1; j <= numChoices; j++){
      arr.push({
        type: 'input',
        name: `question-${i}-choice-${j}`,
        message: `Enter answer choice ${j} for question ${i}`
      })
    }
  }
  return arr
}

export const createQuestions = (obj) => {
  // TODO implement createQuestions
  if (typeof obj != 'object' || obj['question-1'] === undefined) return []
  let questions = []
  //starting with question 1
  let i = 1
  //checking for the key with question-{i} in the obj and looping until it's false
  while (Object.keys(obj).includes(`question-${i}`)){
    let choice = []
    //looping over obj to get question-${i}-choice key and adding choices to choice array
    for(let key in obj ){
      if(key.includes(`question-${i}-choice`)){
        choice.push(obj[key])
      }
    }
    //adding all the questions with their corresponding choices in choice array
    questions.push({
      type: 'list',
      name: `question-${i}`,
      message: obj[`question-${i}`],
      choices: [...choice]
    })
    i++
  }
  return questions
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
