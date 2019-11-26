// import HtmlLogo from "../../logo/html.png";
// import AngularLogo from "../../logo/angular.png";
// import ReactLogo from "../../logo/react.png";
// import JsLogo from "../../logo/js.png";

// class Questions {
//   constructor(question, option1, option2, option3, option4, answer) {
//     this.question = question;
//     this.option1 = option1;
//     this.option2 = option2;
//     this.option3 = option3;
//     this.option4 = option4;
//     this.answer = answer;
//   }
// }

const initialState = {
  // quizList: [
  //   {
  //     mainTitle: "Angular",
  //     mainLogo: AngularLogo,
  //     quizOne: {
  //       title: "Angular quiz 1",
  //       description:
  //         "Basic Angular quiz covering 5 chapters of Angular JS up and run book.",
  //       passingScore: "65",
  //       quizTime: "5 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "What is MVC?",
  //           "MVC is name of algorithm",
  //           "MVC is a software design pattern for developing web applications.",
  //           "MVC is a software technique to optimize web application performance.",
  //           "None of above",
  //           "MVC is a software design pattern for developing web applications."
  //         ),
  //         new Questions(
  //           "Which of the following is true about filter filter?",
  //           "filter filter is a function which takes text as input.",
  //           "filter filter is used to filter the array to a subset of it based on provided criteria.",
  //           "Both of the above.",
  //           "None of above",
  //           "filter filter is used to filter the array to a subset of it based on provided criteria."
  //         ),
  //         new Questions(
  //           "Which of the following is true about $error?",
  //           "$error states that form has invalid data.",
  //           "$error states the exact error.",
  //           "Both of the above.",
  //           "None of the above.",
  //           "$error states the exact error."
  //         ),
  //         new Questions(
  //           "Which components can be injected as a dependency in AngularJS?",
  //           "Application Module",
  //           "constant",
  //           "value",
  //           "factory",
  //           "Application Module"
  //         )
  //       ]
  //     },
  //     quizTwo: {
  //       title: "Angular quiz 2",
  //       description:
  //         "This quiz contains questions chapters 5 to 10 of Angular JS up and run book.",
  //       passingScore: "60",
  //       quizTime: "4 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "Templates are the rendered view with information from the controller and model.",
  //           "True",
  //           "False",
  //           "None of above",
  //           "Don't know",
  //           "True"
  //         ),
  //         new Questions(
  //           "What is the parent of $scope in AngualarJS?",
  //           "$super",
  //           "$rootScope",
  //           "$root",
  //           "@super",
  //           "$rootScope"
  //         ),
  //         new Questions(
  //           "Is AngualarJS built on jQuery?",
  //           "No",
  //           "May be",
  //           "Can be",
  //           "Yes",
  //           "Yes"
  //         ),
  //         new Questions(
  //           "In AngularJS data binding is",
  //           "one way",
  //           "two way",
  //           "sychronous",
  //           "simplex",
  //           "two way"
  //         ),
  //         new Questions(
  //           "Using filters AngularJS cannot use",
  //           "orderby",
  //           "json",
  //           "limitTo",
  //           "Special characters",
  //           "Special characters"
  //         )
  //       ]
  //     },
  //     quizThree: {
  //       title: "Angular quiz 3",
  //       description:
  //         "This quiz contains questions chapters 10 to 20 of Angular JS up and run book.",
  //       passingScore: "65",
  //       quizTime: "5 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "Which of the following is not a valid AngularJS Directives?",
  //           "ng-model",
  //           "ng-distroy",
  //           "ng-repeat",
  //           "ng-init",
  //           "ng-distroy"
  //         ),
  //         new Questions(
  //           "Which of the following is valid for AngualarJS module",
  //           "var app = angular.module();",
  //           'var app = angular.module("myApp", []);',
  //           'var app = angular.module(["myApp","param");',
  //           'var app = angular.module("myApp");',
  //           'var app = angular.module("myApp");'
  //         ),
  //         new Questions(
  //           "Elements of AngularJS MVC views are rendered in which order?",
  //           "Not listed above",
  //           "Random",
  //           "Sequential",
  //           "Priotization",
  //           "Random"
  //         ),
  //         new Questions(
  //           "Which of the service modes can be easiest to test while using AngularJS?",
  //           "N-Tier",
  //           "Event-driven",
  //           "Service Oriented Architecture",
  //           "MVC",
  //           "Service Oriented Architecture"
  //         )
  //       ]
  //     }
  //   },
  //   {
  //     mainTitle: "React",
  //     mainLogo: ReactLogo,
  //     quizOne: {
  //       title: "React quiz 1",
  //       description:
  //         "Basic React quiz covering 1st chapters of The road to learn React book.",
  //       passingScore: "70",
  //       quizTime: "4 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "What is react?",
  //           "Framework",
  //           "Library",
  //           "Component",
  //           "Programming Language",
  //           "Library"
  //         ),
  //         new Questions(
  //           "React is developed by?",
  //           "IBM",
  //           "Google",
  //           "Intel",
  //           "Facebook",
  //           "Facebook"
  //         ),
  //         new Questions(
  //           "How do you access a function fetch() from a h1 element in JSX?",
  //           "<h1>{fetch()}</h1>",
  //           "<h1>${fetch()}</h1>",
  //           "<h1>{fetch}</h1>",
  //           "<h1>${fetch}</h1>",
  //           "<h1>{fetch()}</h1>"
  //         ),
  //         new Questions(
  //           "Which method in a React Component should you override to stop the component from updating?",
  //           "willComponentUpdate",
  //           "shouldComponentUpdate",
  //           "componentDidUpdate",
  //           "componentDidMount",
  //           "shouldComponentUpdate"
  //         )
  //       ]
  //     },
  //     quizTwo: {
  //       title: "React quiz 2",
  //       description:
  //         "This quiz contains questions covering 2nd chapters of The road to learn React book.",
  //       passingScore: "70",
  //       quizTime: "5 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "What's used to pass data to a component from outside?",
  //           "setState",
  //           "render with arguments",
  //           "PropTypes",
  //           "Props",
  //           "Props"
  //         ),
  //         new Questions(
  //           " Which method in a React Component is called after the component is rendered for the first time?",
  //           "componentDidUpdate",
  //           "componentDidMount",
  //           "componentMounted",
  //           "componentUpdated",
  //           "componentDidMount"
  //         ),
  //         new Questions(
  //           "Which of the following is correct syntax for a button click event handler, foo?",
  //           "<button onclick={this.foo()}>",
  //           "<button onclick={this.foo}>",
  //           "<button onClick={this.foo()}>",
  //           "<button onClick={this.foo}>",
  //           "<button onClick={this.foo}>"
  //         ),
  //         new Questions(
  //           "What happens when you call setState() inside render() method?",
  //           "Repetitive output appears on the screen",
  //           "Stack overflow error",
  //           "Duplicate key error",
  //           "Nothing happens. Life goes on!",
  //           "Stack overflow error"
  //         )
  //       ]
  //     }
  //   },
  //   {
  //     mainTitle: "Html",
  //     mainLogo: HtmlLogo,
  //     quizOne: {
  //       title: "Html quiz 1",
  //       description:
  //         "This quiz contains questions covering 1st till 4th chapters of Html & CSS book.",
  //       passingScore: "60",
  //       quizTime: "5 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "What is abbreviation of HTML?",
  //           "Hyper Type Multi Language",
  //           "Higher Text Multiple Language",
  //           "Hyper Text Markup Language",
  //           "Hollow Type Markup Language",
  //           "Hyper Text Markup Language"
  //         ),
  //         new Questions(
  //           "How many types of markup in HTML?",
  //           "Both",
  //           "opening and closing markup only",
  //           "self closing markups only",
  //           "None of above",
  //           "Both"
  //         ),
  //         new Questions(
  //           "<iframe> is HTML5 markup",
  //           "False",
  //           "True",
  //           "Neither true nor false",
  //           "Not sure",
  //           "True"
  //         ),
  //         new Questions(
  //           "<div> and <span> are inline elements?",
  //           "False",
  //           "True",
  //           "Neither true nor false",
  //           "Not sure",
  //           "Neither true nor false"
  //         ),
  //         new Questions(
  //           "HTML must need body markup. Why? Because:",
  //           "It did'nt needs to show the markups inside it.",
  //           "It needs to show the markups inside it.",
  //           "It needs <head> element",
  //           "None of above",
  //           "It needs to show the markups inside it."
  //         )
  //       ]
  //     },
  //     quizTwo: {
  //       title: "Html quiz 2",
  //       description:
  //         "This quiz contains questions covering 5th till 8th chapters of Html & CSS book.",
  //       passingScore: "65",
  //       quizTime: "6 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "The external JavaScript file must contain the <script> tag.",
  //           "False",
  //           "True",
  //           "Neither true nor false",
  //           "Not sure",
  //           "True"
  //         ),
  //         new Questions(
  //           "Choose the correct HTML element for the largest heading:",
  //           "<h6>",
  //           "<heading>",
  //           "<h1>",
  //           "<head>",
  //           "<h1>"
  //         ),
  //         new Questions(
  //           "What is the correct HTML element for inserting a line break?",
  //           "<break>",
  //           "<br>",
  //           "<lnbr>",
  //           "none of above",
  //           "<br>"
  //         ),
  //         new Questions(
  //           "What is the correct HTML for adding a background color?",
  //           "<background>yellow</background>",
  //           '<body style="bg-color:yellow;">',
  //           '<body bg="yellow">',
  //           '<body style="background-color:yellow;">',
  //           '<body style="background-color:yellow;">'
  //         ),
  //         new Questions(
  //           "Choose the correct HTML element to define important text",
  //           "<strong>",
  //           "<b>",
  //           "<important>",
  //           "<i>",
  //           "<strong>"
  //         ),
  //         new Questions(
  //           "Choose the correct HTML element to define emphasized text",
  //           "<i>",
  //           "<emphasize>",
  //           "<italic>",
  //           "<em>",
  //           "<em>"
  //         ),
  //         new Questions(
  //           "What is the correct HTML for creating a hyperlink?",
  //           "<a>http://www.w3schools.com</a>",
  //           '<a href="http://www.w3schools.com">W3Schools</a>',
  //           '<a name="http://www.w3schools.com">W3Schools.com</a>',
  //           '<a url="http://www.w3schools.com">W3Schools.com</a>',
  //           '<a href="http://www.w3schools.com">W3Schools</a>'
  //         )
  //       ]
  //     }
  //   },
  //   {
  //     mainTitle: "JavaScript",
  //     mainLogo: JsLogo,
  //     quizOne: {
  //       title: "Javascript quiz 1",
  //       description:
  //         "This quiz contains questions covering first 20 chapters of A smarter way to learn JavaScript book.",
  //       passingScore: "65",
  //       quizTime: "6 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "Inside which HTML element do we put the JavaScript?",
  //           "<js>",
  //           "<scripting>",
  //           "<javascript>",
  //           "<script>",
  //           "<script>"
  //         ),
  //         new Questions(
  //           "Where is the correct place to insert a JavaScript?",
  //           "Both the <head> section and the <body> section are correct",
  //           "The <body> section",
  //           "The <head> section",
  //           "None of above",
  //           "Both the <head> section and the <body> section are correct"
  //         ),
  //         new Questions(
  //           'What is the correct syntax for referring to an external script called "xxx.js"?',
  //           '<script src="xxx.js">',
  //           '<script href="xxx.js">',
  //           '<script name="xxx.js">',
  //           "None of Above",
  //           '<script src="xxx.js">'
  //         ),
  //         new Questions(
  //           'How do you write "Hello World" in an alert box?',
  //           'alertBox("Hello World");',
  //           'msg("Hello World");',
  //           'alert("Hello World");',
  //           'msgBox("Hello World");',
  //           'alert("Hello World");'
  //         )
  //       ]
  //     },
  //     quizTwo: {
  //       title: "JavaScript quiz 2",
  //       description:
  //         "This quiz contains questions covering 20 till 40 chapters of A smarter way to learn JavaScript book.",
  //       passingScore: "60",
  //       quizTime: "6 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "How do you create a function in JavaScript?",
  //           "function myFunction()",
  //           "function = myFunction()",
  //           "function:myFunction()",
  //           "None of above",
  //           "function myFunction()"
  //         ),
  //         new Questions(
  //           'How do you call a function named "myFunction"?',
  //           "call function myFunction()",
  //           "call myFunction()",
  //           "myFunction()",
  //           "None of above",
  //           "myFunction()"
  //         ),
  //         new Questions(
  //           "How to write an IF statement in JavaScript?",
  //           "if i = 5 then",
  //           "if i = 5",
  //           "if (i == 5)",
  //           "if i == 5 then",
  //           "if (i == 5)"
  //         ),
  //         new Questions(
  //           "How does a WHILE loop start?",
  //           "while (i <= 10; i++)",
  //           "while i = 1 to 10",
  //           "while (i <= 10)",
  //           "none of above",
  //           "while (i <= 10)"
  //         )
  //       ]
  //     },
  //     quizThree: {
  //       title: "JavaScript quiz 3",
  //       description:
  //         "This quiz contains questions covering 40 till 60 chapters of A smarter way to learn JavaScript book.",
  //       passingScore: "60",
  //       quizTime: "5 Minutes",
  //       quizKey: "123",
  //       done: false,
  //       questions: [
  //         new Questions(
  //           "How does a FOR loop start?",
  //           "for i = 1 to 5",
  //           "for (i = 0; i <= 5)",
  //           "for (i = 0; i <= 5; i++)",
  //           "for (i <= 5; i++)",
  //           "for (i = 0; i <= 5; i++)"
  //         ),
  //         new Questions(
  //           "How can you add a comment in a JavaScript?",
  //           "<!--This is a comment-->",
  //           " //This is a comment",
  //           "'This is a comment",
  //           "None of above",
  //           " //This is a comment"
  //         ),
  //         new Questions(
  //           "What is the correct way to write a JavaScript array?",
  //           'var colors = (1:"red", 2:"green", 3:"blue")',
  //           'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
  //           'var colors = "red", "green", "blue"',
  //           'var colors = ["red", "green", "blue"]',
  //           'var colors = ["red", "green", "blue"]'
  //         ),
  //         new Questions(
  //           "How do you round the number 7.25, to the nearest integer?",
  //           "Math.rnd(7.25)",
  //           "Math.round(7.25)",
  //           "rnd(7.25)",
  //           "round(7.25)",
  //           "Math.round(7.25)"
  //         )
  //       ]
  //     }
  //   }
  // ],
  quizes: [],
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_QUIZ":
      return {
        ...state,
        data: action.payload
      };

    case "TAKE_QUIZ":
      return {
        ...state,
        id: action.payload
      };

    case "SHOW_NULL":
      return {
        ...state,
        id: action.payload
      };

    case "SAVE_QUIZES_DATA":
      return {
        ...state,
        quizes: action.payload
      };

    case "SAVE_ASSIGNQUIZES_DATA":
      return {
        ...state,
        quizes: action.payload
      };

    case "UPDATE_QUIZ":
      // console.log(action.payload, state);
      return {
        ...state,
        id: action.payload
      };

    case "DELETE_QUIZ":
      console.log(state.quizes);
      return {
        ...state,
        quizes: state.quizes.filter((v, index) => index !== state.id)
      };

    default:
      return state;
  }
};
