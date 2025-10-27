// challenge.ts
export interface Challenge {
  id: string;
  title: string;
  description: string;
  inputExample: string;
  expectedOutput: string;
  hints: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string[]; // Supported languages
}

export const challenges: Challenge[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    inputExample: "[2,7,11,15], target = 9",
    expectedOutput: "[0,1]",
    hints: [
      "Use a hash map to store complements.",
      "Iterate through the array only once.",
      "Check if the complement exists in the map."
    ],
    difficulty: "Easy",
    language: ["javascript", "python", "java"]
  },
  {
    id: "binary-tree-inorder-traversal",
    title: "Binary Tree Inorder Traversal",
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
    inputExample: "root = [1,null,2,3]",
    expectedOutput: "[1,3,2]",
    hints: [
      "Use recursion or a stack.",
      "Process left subtree, then node, then right subtree."
    ],
    difficulty: "Medium",
    language: ["javascript", "python"]
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    inputExample: "head = [1,2,3,4,5]",
    expectedOutput: "[5,4,3,2,1]",
    hints: [
      "Iterate through the list, changing next pointers.",
      "Keep track of previous node."
    ],
    difficulty: "Easy",
    language: ["javascript", "python"]
  },
  {
    id: "dfs-graph-traversal",
    title: "DFS Graph Traversal",
    description: `Given a graph represented as adjacency list, perform a depth-first traversal starting from node 0.`,
    inputExample: "{0: [1,2], 1: [2], 2: [0,3], 3: [3]}",
    expectedOutput: "[0,1,2,3]",
    hints: [
      "Use recursion or a stack.",
      "Mark visited nodes to avoid cycles."
    ],
    difficulty: "Medium",
    language: ["javascript", "python"]
  },
  {
    id: "fizz-buzz",
    title: "Fizz Buzz",
    description: `Print numbers from 1 to n. For multiples of three print "Fizz", for multiples of five print "Buzz", and for multiples of both print "FizzBuzz".`,
    inputExample: "n = 15",
    expectedOutput: `["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`,
    hints: [
      "Use modulus operator to check multiples.",
      "Check multiples of both 3 and 5 first."
    ],
    difficulty: "Easy",
    language: ["javascript", "python", "java", "csharp"]
  },
  // Add more challenges here...
];
