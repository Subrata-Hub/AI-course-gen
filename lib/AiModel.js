/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  //   HarmCategory,
  //   HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 50192,
  responseMimeType: "application/json",
};

export const generateCourseLayoutAI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a Course Tutorial on following Detail with field as Course Name, Description, Along with Chapter Name, About, Duration:\nCategory: 'Programming', Topic: 'Python', Level: Basic, Duration: 1 hours, no Of Chapters: 5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_name": "Python Fundamentals for Beginners",\n  "description": "This course will provide you with a solid foundation in Python programming. You\'ll learn the fundamentals of syntax, data types, control flow, functions, and more. By the end of this course, you\'ll be able to write simple Python programs and understand the core concepts of this versatile language.",\n  "chapters": [\n    {\n      "chapter_name": "Introduction to Python",\n      "about": "This chapter introduces Python and its history. We\'ll discuss why Python is a popular choice for beginners and explore its various applications. You\'ll also learn how to set up your Python environment.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapter_name": "Basic Syntax and Data Types",\n      "about": "This chapter covers the basics of Python syntax, including variables, data types (integers, floats, strings, booleans), and operators. You\'ll learn how to write simple expressions and assign values to variables.",\n      "duration": "30 minutes"\n    },\n    {\n      "chapter_name": "Control Flow Statements",\n      "about": "This chapter covers conditional statements (if-else, elif), loops (for, while), and how to control the flow of execution in your Python programs.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapter_name": "Functions and Modules",\n      "about": "This chapter introduces functions for code reusability and modularity. You\'ll learn how to define, call, and pass arguments to functions. We\'ll also explore the concept of modules and how to import them into your programs.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapter_name": "Practical Examples and Exercises",\n      "about": "This chapter includes practical examples and exercises to solidify your understanding of Python fundamentals. You\'ll apply the concepts you\'ve learned to solve real-world problems.",\n      "duration": "10 minutes"\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const generateCapterContentAI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in detail on Topic:React, chapter:Advanced Routing with React Router, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "Introduction to Advanced Routing with React Router",\n    "explanation": "React Router is a powerful library that enables navigation and routing in React applications. This chapter explores advanced features and techniques beyond basic routing, including nested routes, route parameters, and programmatic navigation.",\n    "codeExample": ""\n  },\n  {\n    "title": "Nested Routes",\n    "explanation": "Nested routes create a hierarchical structure for your application, allowing you to organize components and content logically. Each nested route represents a specific section within a parent route.",\n    "codeExample": "<precode>\\nimport { BrowserRouter, Routes, Route } from \'react-router-dom\';\\n\\nfunction App() {  \\n  return (\\n    <BrowserRouter>\\n      <Routes>\\n        <Route path=\\"/\\" element={<Home />} />\\n        <Route path=\\"/products\\" element={<Products />}>\\n          <Route path=\\":productId\\" element={<ProductDetails />} />\\n        </Route>\\n      </Routes>\\n    </BrowserRouter>\\n  );\\n}\\n\\nfunction Home() {  \\n  return (<h1>Home</h1>);\\n}\\n\\nfunction Products() {  \\n  return (<h1>Products</h1>);\\n}\\n\\nfunction ProductDetails() {  \\n  return (<h1>Product Details</h1>);\\n}\\n</precode>"\n  },\n  {\n    "title": "Route Parameters",\n    "explanation": "Route parameters allow you to pass dynamic data to your routes, enabling flexibility and content personalization. They are represented using colons within the route path. ",\n    "codeExample": "<precode>\\nimport { BrowserRouter, Routes, Route, useParams } from \'react-router-dom\';\\n\\nfunction App() {  \\n  return (\\n    <BrowserRouter>\\n      <Routes>\\n        <Route path=\\"/products/:productId\\" element={<ProductDetails />} />\\n      </Routes>\\n    </BrowserRouter>\\n  );\\n}\\n\\nfunction ProductDetails() {  \\n  const { productId } = useParams();\\n  return (<h1>Product Details for ID: {productId}</h1>);\\n}\\n</precode>"\n  },\n  {\n    "title": "Programmatic Navigation",\n    "explanation": "Programmatic navigation enables you to navigate between routes using JavaScript code, giving you greater control over the routing process. The `useNavigate` hook provides a function to trigger navigation.",\n    "codeExample": "<precode>\\nimport { useNavigate } from \'react-router-dom\';\\n\\nfunction MyComponent() {  \\n  const navigate = useNavigate();\\n  \\n  const handleClick = () => {  \\n    navigate(\'/products\');  \\n  };  \\n  \\n  return (\\n    <button onClick={handleClick}>Navigate to Products</button>\\n  );\\n}\\n</precode>"\n  },\n  {\n    "title": "Route Guards",\n    "explanation": "Route guards are functions that control access to specific routes based on certain conditions. They allow you to implement authentication, authorization, and other logic to restrict navigation.",\n    "codeExample": "<precode>\\nimport { Navigate, useLocation, useNavigate } from \'react-router-dom\';\\n\\nfunction RequireAuth({ children }) {  \\n  const location = useLocation();  \\n  const navigate = useNavigate();  \\n  const isAuthenticated = true; // Replace with your authentication logic  \\n  \\n  if (!isAuthenticated) {  \\n    return <Navigate to=\\"/login\\" state={{ from: location }} replace />;  \\n  }  \\n  \\n  return children;  \\n}\\n</precode>"\n  },\n  {\n    "title": "Advanced Routing Techniques",\n    "explanation": "This section explores more advanced routing concepts, including route matching, route prioritization, and using custom route components.",\n    "codeExample": "<precode>\\n// Route matching  \\n<Route path=\\"/products/:productId?\\" element={<ProductDetails />} />\\n\\n// Route prioritization  \\n<Route path=\\"/products\\" element={<Products />} />  \\n<Route path=\\"/products/:productId\\" element={<ProductDetails />} />\\n\\n// Custom route components  \\n<Route path=\\"/products\\" element={<CustomRouteComponent />}>\\n  <Route path=\\":productId\\" element={<ProductDetails />} />\\n</Route>\\n</precode>"\n  }\n]\n```',
        },
      ],
    },
  ],
});

export const generateCapterQuestions = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: '\n`You are a helpful AI that is able to generate MCQ questions and answers, in JSON Format with list of array, You are to generate a random hard mcq question about "Django signals" with context of the following transcript: "hey everybody so in this video I&amp;#39;m gonna introduce you to the concept of Django signals and show you how signals can really help simplify a lot of our code whenever we have multiple bits of code interested in the same event so signals are basically comprised of ascenders and receivers that send out some information to a receiver or whenever something has occurred so we&amp;#39;re gonna start with model signals and the example I like to use is a relationship between my default Django user model and how I extend it with a profile so every single user is going to have a profile in my system so every single time a user is created or updated I want a sender to be sent out and either create or update the profile also so it&amp;#39;s just basically going to be an event listener that&amp;#39;s going to be added to that save method and send out some information so these two will be made into my receivers and will again either create or update a profile based on whatever the signal sent out to these receivers and we&amp;#39;ll need to add a little bit of code to actually make these into receivers so they respond but we&amp;#39;ll handle that in a second and also really quick know if you&amp;#39;re part of the Django crash-course series I&amp;#39;m making this video as a standalone project so if you look at our code it&amp;#39;s not the same project as that CRM we&amp;#39;re making but I will make one more follow-up video implementing this into that registration form so for now we&amp;#39;re gonna write all of our logic within models py but the Django documentation does recommend that we write all of our signals within its own file so later on in this video we&amp;#39;re actually in and create a file called signals up py and go ahead and just copy and paste all of this in there but because that does require a little bit more configuration we&amp;#39;re actually gonna write it right in here to simplify things and then we&amp;#39;ll just move it there later so let&amp;#39;s go ahead and add some parameters and make this receiver and then actually connect it to a signal so from the Django documentation we&amp;#39;re gonna use this post underscore save method here so let&amp;#39;s go ahead and run this import and then in the post save we&amp;#39;re gonna add these parameters to that function so the sender which is the model that&amp;#39;s supposed to send the signal the instance of that model so the actual item or the object that&amp;#39;s sending it and then this creative attribute here which basically if this is the first creation of that item or if this is just an update so let&amp;#39;s go ahead and do that so within here let&amp;#39;s run an import so this will be from Django dot DB models dot signals import and we&amp;#39;re gonna use the pre save so this is going to be a model signal and it&amp;#39;s gonna be pre underscore save and in here what we can do is go ahead and pass in those parameters so the sender the model that&amp;#39;s sending the signal the instance of it and the created instance was checks if this is a new one in we&amp;#39;re just gonna go ahead and pass in star star quark so any extra keyword arguments will pass in that way and in here if i uncomment this what we&amp;#39;re doing here is whenever that signal calls this function this receiver we&amp;#39;re gonna check if this is the first instance if this is we&amp;#39;ll go ahead and create a new profile so we&amp;#39;ll do profile objects create user in it&amp;#39;s going to be this instance so it&amp;#39;ll go ahead and set it in we have ourselves a new profile but whenever we update an item so we&amp;#39;ll go ahead and uncomment this we&amp;#39;ll pass in these parameters and I actually decided to get rid of some stuff here so let&amp;#39;s go ahead and actually copy that and I&amp;#39;ll paste that in here and let me just remove this so sorry if you actually wrote that out already so basically what we&amp;#39;re doing here is calling the same thing but we&amp;#39;re checking created again and if created as false which means that this user already exists let&amp;#39;s go ahead and update that user profile so instance dot profile save and in here you can write whatever logic you want maybe update certain parameters but I&amp;#39;m gonna keep it simple and just called a save method on that profile so in order to connect this now all we have to do and there&amp;#39;s actually a few ways to do this all we&amp;#39;re gonna do here is go ahead actually just realize we changed where we messed this up this needs to be post underscore save so we&amp;#39;re gonna do post underscore save dot connect and we&amp;#39;re gonna pass in two parameters here so this is how we connect a receiver to a sender so the receiver is going to be this create profile function here and the sender is going to be the model that&amp;#39;s gonna trigger it so this user model every single time the save method is called we&amp;#39;re gonna go ahead and trigger this receive method here or this create profile function after the save is complete so post save after save go ahead and trigger that function and listen to this model here so we can actually go ahead and copy and paste out there and change it for update profile and every single time the save method is called both of these functions will be triggered but they will respond differently so I do have one user in the database that does not have a profile so to not give us an error go ahead and make that into a string method there and I&amp;#39;m actually gonna go ahead and open up my admin panel and "". the length of each answer should not be more than 15 words,`\n\nexample: {\n      question: "question",\n      answer: "answer with max length of 15 words",\n      option1: "option1 with max length of 15 words",\n      option2: "option2 with max length of 15 words",\n      option3: "option3 with max length of 15 words",\n      option4: "option4 with max length of 15 words"\n    }\n\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "question": "What Django signal is used to trigger actions before a model is saved?",\n    "answer": "pre_save signal",\n    "option1": "post_save signal",\n    "option2": "pre_delete signal",\n    "option3": "post_delete signal",\n    "option4": "pre_save signal"\n  },\n  {\n    "question": "In the provided code, what does the \'created\' parameter in the \'create_profile\' function indicate?",\n    "option1": "Whether the profile is being updated",\n    "option2": "Whether the model is being saved for the first time",\n    "option3": "Whether the profile is being created",\n    "option4": "Whether the model has been deleted",\n    "answer": "Whether the model is being saved for the first time"\n  },\n  {\n    "question": "Which method connects a receiver to a sender in Django signals?",\n    "answer": "connect method",\n    "option1": "send method",\n    "option2": "trigger method",\n    "option3": "dispatch method",\n    "option4": "connect method"\n  },\n  {\n    "question": "What is the purpose of the \'sender\' parameter in the \'create_profile\' function?",\n    "answer": "Identifies the model triggering the signal",\n    "option1": "Stores the instance being saved",\n    "option2": "Indicates whether the instance is new",\n    "option3": "Holds additional keyword arguments",\n    "option4": "Identifies the model triggering the signal"\n  }\n]\n```',
        },
      ],
    },
  ],
});

// maxOutputTokens: 8192,
