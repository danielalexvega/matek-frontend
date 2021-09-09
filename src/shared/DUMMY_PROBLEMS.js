const DUMMY_PROBLEMS = [
    {
      id: "p1",
      image: "",
      katex: {
        isValid: true,
        value: `\\begin{cases} -x -5y -5z = 2  \\\\ 4x – 5y + 4z = 19 \\\\ 
        x + 5y - z= -20 \\end{cases}`
      },
      author: "Daniel Vega",
      authorId: "a1",
      solution: {isValid: true, value: "(-2, -3, 3)"},
      isMultipleChoice: {value: true, isValid: true},
      choices: {
        isValid: true,
        value: [
          {
            id: 'choiceA',
            label: 'A',
            value: '(2, 3, -3)',
            isValid: true
          },
          {
            id: 'choiceB',
            label: 'B',
            value: '(-2, -3, 3)',
            isValid: true
          },
          {
            id: 'choiceC',
            label: 'C',
            value: '(3, -2, 3)',
            isValid: true
          },
      ]
      }
        ,
      content: "Solving the Square",
      description: {
        isValid: true,
        value: "A system of equations problem with three variables. This problem is easiest solved with elimination."
      },
      courses: ["Algebra 2"]
    },
    {
      id: "p2",
      image: "",
      katex: {
        isValid: true,
        value: `\\begin{cases} -x -5y -5z = 2  \\\\ 4x – 5y + 4z = 19 \\\\ 
        x + 5y - z= -20 \\end{cases}`
      },
      author: "Daniel Vega",
      authorId: "a2",
      solution: {isValid: true, value: "(-2, -3, 3)"},
      isMultipleChoice: {value: true, isValid: true},
      choices: {
        isValid: true,
        value: [
          {
            id: 'choiceA',
            label: 'A',
            value: '(2, 3, -3)',
            isValid: true
          },
          {
            id: 'choiceB',
            label: 'B',
            value: '(-2, -3, 3)',
            isValid: true
          },
          {
            id: 'choiceC',
            label: 'C',
            value: '(3, -2, 3)',
            isValid: true
          },
      ]
      }
        ,
      content: "Solving the Square",
      description: {
        isValid: true,
        value: "A system of equations problem with three variables. This problem is easiest solved with elimination."
      },
      courses: ["Algebra 2"]
    },
  ];

  export default DUMMY_PROBLEMS;