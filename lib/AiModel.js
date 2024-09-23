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
  maxOutputTokens: 8192,
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

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
