import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DatabaseZap, // Icon for Title
    ArrowLeft,
    List,
    Play,
    Zap, // For "Reverse"
    Terminal, // For Output
    GitBranch, // For Graph
    Binary,    // For Tree
    Link as LinkIcon, // For Linked List
    Network,   // For DFS/BFS
    ArrowRightLeft, // For Traversal
    AlertCircle, // For Errors
} from 'lucide-react';

// --- Data Structures (Classes) ---
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val: number) {
        this.val = val;
        this.next = null;
    }
}
// --- Type Definitions ---
type Graph = { [node: string]: string[] };
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
type ProblemType = 'DFS' | 'BFS' | 'TreeTraversal' | 'LinkedList';
type TraversalType = 'Inorder' | 'Preorder' | 'Postorder';

// --- Default Input Values ---
const defaultGraphInput = `{
  "A": ["B", "C"],
  "B": ["D", "E"],
  "C": ["F"],
  "D": [],
  "E": ["F"],
  "F": []
}`;
const defaultTreeInput = `{
  "val": 1,
  "left": {
    "val": 2,
    "left": {"val": 4, "left": null, "right": null},
    "right": {"val": 5, "left": null, "right": null}
  },
  "right": {
    "val": 3,
    "left": null,
    "right": {"val": 6, "left": null, "right": null}
  }
}`;
const defaultLinkedListInput = '1, 2, 3, 4, 5';

// --- Animation Variants ---
const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const contentVariant = {
     enter: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } },
     center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
     exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } },
};

const DSASolver: React.FC = () => {
    // State
    const [problem, setProblem] = useState<ProblemType>('DFS');
    const [graphInput, setGraphInput] = useState<string>(defaultGraphInput);
    const [treeInput, setTreeInput] = useState<string>(defaultTreeInput);
    const [linkedListInput, setLinkedListInput] = useState<string>(defaultLinkedListInput);
    const [graphStart, setGraphStart] = useState<string>('A');
    const [treeTraversalType, setTreeTraversalType] = useState<TraversalType>('Inorder');
    const [outputSteps, setOutputSteps] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Parsed Data Structures
    const [parsedGraph, setParsedGraph] = useState<Graph | null>(null);
    const [parsedTree, setParsedTree] = useState<TreeNode | null>(null);
    const [parsedLinkedList, setParsedLinkedList] = useState<ListNode | null>(null);

    // --- Input Parsing Effects ---
    useEffect(() => {
        try {
            const g = JSON.parse(graphInput);
            if (typeof g !== 'object' || Array.isArray(g)) throw new Error("Graph must be an object.");
            setParsedGraph(g);
            setError(null);
        } catch (e: any) {
            setParsedGraph(null);
            if (problem === 'DFS' || problem === 'BFS') setError(`Invalid Graph JSON: ${e.message}`);
        }
    }, [graphInput, problem]);

    useEffect(() => {
        try {
            const t = JSON.parse(treeInput);
            if (typeof t !== 'object' || Array.isArray(t)) throw new Error("Tree must be an object.");
            setParsedTree(t);
            setError(null);
        } catch (e: any) {
            setParsedTree(null);
            if (problem === 'TreeTraversal') setError(`Invalid Tree JSON: ${e.message}`);
        }
    }, [treeInput, problem]);

    useEffect(() => {
        try {
            const arr = linkedListInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
            setParsedLinkedList(createLinkedList(arr));
            setError(null);
        } catch (e: any) {
            setParsedLinkedList(null);
            if (problem === 'LinkedList') setError(`Invalid Linked List input: ${e.message}`);
        }
    }, [linkedListInput, problem]);
    
    // --- Algorithm Implementations ---
    const dfsWithSteps = (graph: Graph, start: string): string[] => {
        const visited = new Set<string>(); const steps: string[] = [];
        const dfs = (node: string) => {
            if (visited.has(node)) { steps.push(`Node ${node} already visited, skipping.`); return; }
            steps.push(`Visit node ${node}`); visited.add(node);
            for (const neighbor of graph[node] || []) {
                steps.push(`  -> Explore neighbor ${neighbor} of ${node}`);
                dfs(neighbor);
            }
            steps.push(`Backtrack from node ${node}`);
        };
        dfs(start); return steps;
    };
    const bfsWithSteps = (graph: Graph, start: string): string[] => {
        const visited = new Set<string>(); const queue: string[] = [start]; const steps: string[] = [];
        visited.add(start); steps.push(`Start BFS at ${start}, add to queue.`);
        while (queue.length > 0) {
            const node = queue.shift()!;
            steps.push(`Dequeue node ${node}`);
            for (const neighbor of graph[node] || []) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor); steps.push(`  -> Visit ${neighbor}, add to queue.`); queue.push(neighbor);
                } else { steps.push(`  -> Neighbor ${neighbor} already visited.`); }
            }
        }
        steps.push('BFS complete, queue empty.'); return steps;
    };
    const inorderTraversalSteps = (root: TreeNode | null, steps: string[] = []): void => {
        if (!root) { steps.push("Encountered null node, return."); return; }
        steps.push(`Go left from ${root.val}`); inorderTraversalSteps(root.left, steps);
        steps.push(`Visit node ${root.val}`);
        steps.push(`Go right from ${root.val}`); inorderTraversalSteps(root.right, steps);
    };
    const preorderTraversalSteps = (root: TreeNode | null, steps: string[] = []): void => {
        if (!root) { steps.push("Encountered null node, return."); return; }
        steps.push(`Visit node ${root.val}`);
        steps.push(`Go left from ${root.val}`); preorderTraversalSteps(root.left, steps);
        steps.push(`Go right from ${root.val}`); preorderTraversalSteps(root.right, steps);
    };
    const postorderTraversalSteps = (root: TreeNode | null, steps: string[] = []): void => {
        if (!root) { steps.push("Encountered null node, return."); return; }
        steps.push(`Go left from ${root.val}`); postorderTraversalSteps(root.left, steps);
        steps.push(`Go right from ${root.val}`); postorderTraversalSteps(root.right, steps);
        steps.push(`Visit node ${root.val}`);
    };
    const createLinkedList = (arr: number[]): ListNode | null => {
        if (arr.length === 0) return null;
        const head = new ListNode(arr[0]); let current = head;
        for (let i = 1; i < arr.length; i++) { current.next = new ListNode(arr[i]); current = current.next; }
        return head;
    };
    const printLinkedListSteps = (head: ListNode | null): string[] => {
        const steps: string[] = []; let current = head;
        if (!current) steps.push("List is empty.");
        while (current) { steps.push(`Node value: ${current.val}`); current = current.next; }
        return steps;
    };
    const reverseLinkedListSteps = (head: ListNode | null): string[] => {
        const steps: string[] = [];
        let prev: ListNode | null = null;
        let curr = head;
        if (!curr) { steps.push("List is empty, nothing to reverse."); return steps; }
        while (curr) {
            steps.push(`Current node: ${curr.val}. Set next to prev (${prev?.val || 'null'}).`);
            // --- FIX: Explicitly type nextTemp ---
            const nextTemp: ListNode | null = curr.next;
            // ------------------------------------
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
            steps.push(`  Move prev to ${prev.val}, curr to ${curr?.val || 'null'}.`);
        }
        steps.push(`Reversal complete. New head is ${prev?.val || 'null'}.`);
        setParsedLinkedList(prev);
        return steps;
    };
    // ------------------------------------

    const runSolver = () => {
        setOutputSteps([]); setError(null);
        if (problem === 'DFS' || problem === 'BFS') {
            if (!parsedGraph) { setError('Invalid graph JSON.'); return; }
            if (!graphStart || !(graphStart in parsedGraph)) { setError('Invalid or missing start node.'); return; }
            const steps = problem === 'DFS' ? dfsWithSteps(parsedGraph, graphStart) : bfsWithSteps(parsedGraph, graphStart);
            setOutputSteps(steps);
        } else if (problem === 'TreeTraversal') {
            if (!parsedTree) { setError('Invalid tree JSON.'); return; }
            const steps: string[] = [];
            if (treeTraversalType === 'Inorder') inorderTraversalSteps(parsedTree, steps);
            else if (treeTraversalType === 'Preorder') preorderTraversalSteps(parsedTree, steps);
            else postorderTraversalSteps(parsedTree, steps);
            setOutputSteps(steps.length ? steps : ['Tree is empty.']);
        } else if (problem === 'LinkedList') {
            if (!parsedLinkedList) { setError('Invalid linked list input.'); return; }
            const steps = printLinkedListSteps(parsedLinkedList);
            setOutputSteps(steps);
        }
    };

    const runLinkedListReverse = () => {
        if (!parsedLinkedList) { setError('Invalid linked list input.'); return; }
        // Re-parse the list from the input string to reset it before reversing
        try {
            const arr = linkedListInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
            const freshList = createLinkedList(arr);
            setParsedLinkedList(freshList); // Set state to the fresh list
            const steps = reverseLinkedListSteps(freshList); // Pass the fresh list to reverse
            setOutputSteps(steps);
            setError(null);
        } catch (e: any) {
             setError(`Invalid linked list input: ${e.message}`);
             setOutputSteps([]);
        }
    };

     // --- Render Helper: Input Field ---
     const renderInput = (
         name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
         placeholder: string, Icon: React.ElementType, type: string = "text",
     ) => (
         <div className="relative">
             <label htmlFor={name} className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">{placeholder}</label>
             <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-0" />
             <input
                 id={name} name={name} type={type} value={value} onChange={onChange}
                 placeholder={`e.g., ${placeholder}`}
                 className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm placeholder-gray-400"
             />
         </div>
     );

    // --- Render Helper: Text Area ---
    const renderTextArea = (
         name: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
         placeholder: string, Icon: React.ElementType,
    ) => (
         <div className="relative">
             <label htmlFor={name} className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">{placeholder}</label>
             <Icon className="absolute left-4 top-4 w-5 h-5 text-gray-400 z-0" />
             <textarea
                 id={name} name={name} value={value} onChange={onChange}
                 rows={10}
                 className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-mono"
                 placeholder={`Enter ${placeholder.toLowerCase()}...`}
             />
         </div>
    );
    
    // --- Render Helper: Select ---
     const renderSelect = (
         name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
         label: string, Icon: React.ElementType, options: {value: string, label: string}[]
     ) => (
         <div className="relative">
             <label htmlFor={name} className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">{label}</label>
             <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-0" />
             <select
                 id={name} name={name} value={value} onChange={onChange}
                 className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none text-sm"
             >
                 {/* --- FIX: Use <option> instead of <MenuItem> --- */}
                 {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
             </select>
         </div>
     );

    // --- Render Helper: Main Input Area ---
    const renderInputArea = () => {
        switch (problem) {
            case 'DFS':
            case 'BFS':
                return (
                    <motion.div key="graph" variants={contentVariant} initial="enter" animate="center" exit="exit" className="space-y-4">
                        {renderTextArea('graphInput', graphInput, (e) => setGraphInput(e.target.value), 'Graph (JSON)', GitBranch)}
                        {renderInput('graphStart', graphStart, (e) => setGraphStart(e.target.value), 'Start Node', Network)}
                    </motion.div>
                );
            case 'TreeTraversal':
                return (
                    <motion.div key="tree" variants={contentVariant} initial="enter" animate="center" exit="exit" className="space-y-4">
                        {renderTextArea('treeInput', treeInput, (e) => setTreeInput(e.target.value), 'Tree (JSON)', Binary)}
                        {renderSelect('treeTraversalType', treeTraversalType, (e) => setTreeTraversalType(e.target.value as TraversalType), 'Traversal Type', ArrowRightLeft,
                            [
                                { value: 'Inorder', label: 'Inorder Traversal' },
                                { value: 'Preorder', label: 'Preorder Traversal' },
                                { value: 'Postorder', label: 'Postorder Traversal' },
                            ]
                        )}
                    </motion.div>
                );
            case 'LinkedList':
                return (
                     <motion.div key="linkedlist" variants={contentVariant} initial="enter" animate="center" exit="exit" className="space-y-4">
                        {renderInput('linkedListInput', linkedListInput, (e) => setLinkedListInput(e.target.value), 'Linked List (e.g., 1, 2, 3)', LinkIcon)}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                             <motion.button
                                 onClick={runSolver}
                                 className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold transition-all shadow-lg hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
                                 whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                             >
                                 <Play size={18} /> Print List
                             </motion.button>
                             <motion.button
                                 onClick={runLinkedListReverse}
                                 className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transition-all shadow-lg hover:shadow-pink-500/40 flex items-center justify-center gap-2"
                                 whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                             >
                                 <Zap size={18} /> Reverse List
                             </motion.button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
         <motion.div
            className="min-h-screen w-full font-[Montserrat] bg-slate-100 flex items-center justify-center p-6 py-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
            <motion.div
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            >
                <div className="p-8 sm:p-10">
                     {/* --- Header --- */}
                     <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate(-1)} // Go back
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>
                        <h1 className="text-3xl font-extrabold text-center text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500 flex-grow text-center">
                            DSA Visualizer
                        </h1>
                        <div className="w-16"></div> {/* Placeholder */}
                     </div>

                    <motion.div
                        className="space-y-6"
                        initial="hidden" animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                    >
                         {/* --- Problem Type Select --- */}
                         <motion.div className="relative" variants={fadeIn}>
                             <label htmlFor="problem" className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">Algorithm / Data Structure</label>
                             <DatabaseZap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-0" />
                             <select
                                id="problem" name="problem" value={problem}
                                onChange={(e) => { setProblem(e.target.value as ProblemType); setError(null); setOutputSteps([]); }}
                                className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none text-sm font-medium"
                            >
                                {/* --- FIX: Use <option> instead of <MenuItem> --- */}
                                <option value="DFS">Graph - DFS</option>
                                <option value="BFS">Graph - BFS</option>
                                <option value="TreeTraversal">Tree Traversal</option>
                                <option value="LinkedList">Linked List</option>
                             </select>
                         </motion.div>

                        {/* --- Dynamic Input Area --- */}
                        <AnimatePresence mode="wait">
                            {renderInputArea()}
                        </AnimatePresence>

                        {/* --- Main "Run" Button (for non-LL) --- */}
                        {problem !== 'LinkedList' && (
                            <motion.div variants={fadeIn} className="pt-2">
                                <motion.button
                                    type="button"
                                    onClick={runSolver}
                                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold transition-all shadow-lg hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                                >
                                    <Play size={18} /> Run {problem}
                                </motion.button>
                            </motion.div>
                        )}

                        {/* --- Output Panel --- */}
                        <motion.div className="mt-6 pt-6 border-t border-gray-200" variants={fadeIn}>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
                                <Terminal size={20}/> Step-by-Step Output
                            </h3>
                             {/* Error Display */}
                             <AnimatePresence>
                                 {error && (
                                     <motion.p
                                        className="mb-3 text-red-600 text-xs flex items-start gap-1.5 p-3 bg-red-50 border border-red-200 rounded-lg"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                     >
                                         <AlertCircle size={14} className="flex-shrink-0 mt-0.5"/>
                                         <span>{error}</span>
                                     </motion.p>
                                 )}
                            </AnimatePresence>

                            <div className="w-full bg-gray-900 text-white font-mono p-4 rounded-lg shadow-inner min-h-[200px] max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                                {outputSteps.length === 0 && !error ? (
                                    <p className="text-gray-400 italic">Output will appear here...</p>
                                ) : (
                                    outputSteps.map((step, i) => (
                                        <motion.p
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                            className="text-xs"
                                        >
                                            <span className="text-gray-500 mr-2">{i + 1}.</span>{step}
                                        </motion.p>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DSASolver;