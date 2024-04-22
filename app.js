// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'));
// app.set('view engine', 'ejs');

// const questions = [
//     {
//         question: "What is the event-driven architecture used in Node.js called?",
//         options: [
//             "Event Loop",
//             "Callback Loop",
//             "Async Loop",
//             "Promise Loop"
//         ],
//         Answer: "Event Loop"
//     },
//     {
//         question: "Which module in Node.js is used to create web servers?",
//         options: [
//             "http",
//             "fs",
//             "path",
//             "net"
//         ],
//         Answer: "http"
//     },
//     {
//         question: "Which of the following is NOT a valid way to handle errors in Node.js?",
//         options: [
//             " try-catch blocks",
//             "callback functions with error-first approach",
//             "event listeners",
//             "promise chaining"
//         ],
//         Answer: "event listeners"
//     },
//     {
//         question: "Which module in Node.js is used for handling file operations?",
//         options: [
//             "fs (File System)",
//             "http (HTTP)",
//             "net (Network)",
//             "url (URL)"
//         ],
//         Answer: "fs (File System)"
//     },
//     {
//         question: "Which function is used to import modules in Node.js?",
//         options: [
//             "import",
//             "require",
//             "importModule",
//             "include"
//         ],
//         Answer: "require"
//     },
//     {
//         question: "What does the event loop in Node.js do?",
//         options: [
//             "Handles asynchronous operations",
//             "Executes synchronous code",
//             "Renders web pages",
//             "Manipulates the DOM"
//         ],
//         Answer: "Handles asynchronous operations"
//     },
//     {
//         question: "What is a callback function in Node.js?",
//         options: [
//             "A function that returns a value",
//             "A function passed as an argument to another function to be executed later",
//             "A function that runs immediately",
//             "A function that only runs once"
//         ],
//         Answer: "A function passed as an argument to another function to be executed later"
//     },
//     {
//         question: "What is the purpose of the require.cache object in Node.js?",
//         options: [
//             "To cache frequently used modules for faster access",
//             "To store information about all installed packages",
//             "To manage the memory usage of the application",
//             "To track the dependencies of the application"
//         ],
//         Answer: "To cache frequently used modules for faster access"
//     },
//     {
//         question: "What is npm in the context of Node.js?",
//         options: [
//             "Node Package Manager",
//             "Network Package Manager",
//             "Node Programming Module",
//             "Network Programming Module"
//         ],
//         correctAnswer: "Node Package Manager"
//     },
//     {
//         question: "What is the main purpose of Node.js?",
//         options: [
//             "Frontend development",
//             "Backend development",
//             "Mobile app development",
//             "Game development"
//         ],
//         correctAnswer: "Backend development"
//     }

// ];

// let currentQuestion = 0;
// let score = 0;

// app.get('/', (req, res) => {
//   res.render('index', { question: questions[currentQuestion] });
// });

// app.post('/', (req, res) => {
//   if (req.body.answer == questions[currentQuestion].answer) {
//     score++;
//   }

//   currentQuestion++;

//   if (currentQuestion < questions.length) {
//     res.redirect('/');
// } else {
//     res.render('score', { score: score });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// const PORT = process.env.PORT || 3000;

// // Middleware to parse JSON bodies
// app.use(express.urlencoded({ extended: true}));

// // Quiz data (questions and answers)
// const quizData = require('./quizData.json');

// // Route to serve the HTML interface
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + './index.html');
// });

// // Route to get randomized quiz questions with timer
// app.get('/quiz', (req, res) => {
//     res.json(quizData);
// });

// // Route to submit answers and calculate score with real-time feedback
// app.post('/submit', (req, res) => {
//     // console.log('Form submitted');
//     const userAnswers = req.body.answers;
//     let score = 0;
//     const feedback = [];

//     // Validate submitted answers
//     if (!Array.isArray(userAnswers) || userAnswers.length !== quizData.length) {
//         return res.status(400).json({ error: 'Invalid answers format' });
//     }

//     // Calculate score and provide real-time feedback
//     userAnswers.forEach((answer, index) => {
//         // Check if the submitted answer matches the correct answer
//         if (answer === quizData[index].correctAnswer) {
//             score++; // Increment the score if the answer is correct
//             feedback.push({ question: quizData[index].question, result: 'correct' });
//         } else {
//             feedback.push({ question: quizData[index].question, result: 'incorrect', correctAnswer: quizData[index].correctAnswer });
//         }
//     });

//     // Send score and feedback
//     res.json({ score, feedback });
// });

// // Error handling middleware 
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Internal Server Error');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Load quiz questions
app.get('/questions', (req, res) => {
    const questions = require('./questions.json');
    res.json(questions);
  });

// Route to get a random quiz question
app.get('/quiz', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    const randomQuestion = quizQuestions[randomIndex];
    res.json(randomQuestion);
});

// Route to handle answer submission
app.post('/submit', (req, res) => {
    const userAnswerIndex = parseInt(req.body.answer);
    const correctAnswerIndex = parseInt(req.query.correctAnswer);

    if (userAnswerIndex === correctAnswerIndex) {
        res.send('Your answer is correct!');
    } else {
        res.send('Sorry, your answer is incorrect.');
    }
});