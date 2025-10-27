export interface SubModule {
    title: string;
    description: string;
    type: "learning" | "quiz" | "conclusion";
    thumbnail?: string;
    doc?: string;
}

export interface Module {
    content: string | number | readonly string[] | undefined;
    title: string;
    description: string;
    duration: string;
    handledBy: string;
    info: string;
    subModules: SubModule[];
}

export interface Course {
    [x: string]: any;
    title: string;
    description: string;
    instructor: string;
    language: string;
    level: string;
    category: string;
    subCategory: string; // NEW
    
    duration: string;
    keyPoints: string[];
    thumbnail: string;
    modules: Module[];
    createdAt: Date;
}
