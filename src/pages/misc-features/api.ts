// src/api.ts
import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

/**
 * Executes code using the Piston API
 * @param language - Language key (e.g. "python", "javascript")
 * @param sourceCode - The code to execute
 * @returns output: string
 */
type SupportedLanguage = keyof typeof LANGUAGE_VERSIONS;

export const executeCode = async (language: SupportedLanguage, sourceCode: string) => {
  try {
    const response = await API.post("/execute", {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });

    const result = response.data as { run?: { output?: string } };
    return result.run?.output || "No output returned";
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Error executing code via Piston API"
    );
  }
};
