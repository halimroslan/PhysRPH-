import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const dataTs = fs.readFileSync("./src/data.ts", "utf-8");
  
  const prompt = `
Translate the following Malaysian KSSM Physics syllabus JSON structure into English (DLP). 

Generate a TypeScript file \`/src/dataEn.ts\` which contains exactly:
\`\`\`typescript
export interface Curriculum {
  [tingkatan: string]: {
    [bidang: string]: {
      [sk: string]: string[];
    };
  };
}

export const kurikulumEn: Curriculum = {
  // ... translated data
};
\`\`\`

- Keep the top level keys as "Tingkatan 4" and "Tingkatan 5" so the logic doesn't break, BUT NO wait, the user wants bilingual dropdowns. 
So let's translate the keys as well!
Actually, translate ALL keys.
"Tingkatan 4" -> "Form 4"
"Tingkatan 5" -> "Form 5"
Translate all Bidang Pembelajaran keys, Standard Kandungan keys, and Standard Pembelajaran strings to English.

Output ONLY valid TypeScript code. DO NOT use markdown code blocks like \`\`\`typescript, just the raw typescript.

TypeScript code to translate:
${dataTs}
`;

  console.log("Generating translation...");
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
    config: {
      temperature: 0,
    }
  });

  let output = response.text || "";
  output = output.replace(/^```typescript\n/, "").replace(/^```ts\n/, "").replace(/```$/, "");
  
  fs.writeFileSync("./src/dataEn.ts", output);
  console.log("Translated to src/dataEn.ts");
}

run().catch(console.error);
