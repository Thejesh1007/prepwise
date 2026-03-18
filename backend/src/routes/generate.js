const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const prisma = require("../lib/prisma");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// POST /api/generate/descriptive
router.post("/descriptive", authMiddleware, async (req, res) => {
  const { topic, subject, marks, format, style } = req.body;

  if (!topic || !subject || !marks || !format || !style) {
    return res.status(400).json({ error: "All fields are required: topic, subject, marks, format, style" });
  }

  const validMarks = [3, 5, 7, 10];
  if (!validMarks.includes(Number(marks))) {
    return res.status(400).json({ error: "marks must be 3, 5, 7, or 10" });
  }

  const prompt = `
You are an expert academic answer writer for Indian university examinations.

Write a ${marks}-mark exam answer for the following:
- Subject: ${subject}
- Topic: ${topic}
- Format: ${format}
- Writing Style: ${style}

Requirements:
- The answer must be exam-ready and well-structured
- Use headings, subheadings, and bullet points where appropriate for a ${marks}-mark answer
- Length should match a ${marks}-mark answer in Indian university exams
- If format is "diagram included", describe where a diagram would go and label it clearly
- End with a brief conclusion if marks are 7 or 10
- Do not include any meta-commentary, just write the answer directly
`.trim();

  try {
    const result = await model.generateContent(prompt);
    const output = result.response.text();

    const saved = await prisma.generatedContent.create({
      data: {
        userId: req.userId,
        mode: "DESCRIPTIVE",
        topic,
        subject,
        options: { marks: Number(marks), format, style },
        output,
      },
    });

    return res.status(200).json({
      message: "Descriptive answer generated",
      contentId: saved.id,
      output,
    });
  } catch (err) {
    console.error("Descriptive generation error:", err);
    return res.status(500).json({ error: "Failed to generate content" });
  }
});

// POST /api/generate/objective
router.post("/objective", authMiddleware, async (req, res) => {
  const { topic, subject, count, difficulty, type } = req.body;

  if (!topic || !subject || !count || !difficulty || !type) {
    return res.status(400).json({ error: "All fields are required: topic, subject, count, difficulty, type" });
  }

  const validTypes = ["MCQ", "TF", "Fill"];
  const validDifficulty = ["Easy", "Medium", "Hard"];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "type must be MCQ, TF, or Fill" });
  }

  if (!validDifficulty.includes(difficulty)) {
    return res.status(400).json({ error: "difficulty must be Easy, Medium, or Hard" });
  }

  const parsedCount = Number(count);
  if (isNaN(parsedCount) || parsedCount < 1 || parsedCount > 30) {
    return res.status(400).json({ error: "count must be a number between 1 and 30" });
  }

  const typeInstructions = {
    MCQ: `Multiple Choice Questions. Each question must have 4 options labeled A, B, C, D. Clearly mark the correct answer and provide a one-line explanation.`,
    TF: `True or False Questions. Each question must have the answer as True or False. Provide a one-line explanation for each.`,
    Fill: `Fill in the Blank Questions. Each question must have a blank represented by _____. Provide the correct answer and a one-line explanation.`,
  };

  const prompt = `
You are an expert quiz generator for Indian university students.

Generate exactly ${parsedCount} ${difficulty} difficulty ${type} questions on the following:
- Subject: ${subject}
- Topic: ${topic}

Question type instructions: ${typeInstructions[type]}

Format every question exactly like this (repeat for all ${parsedCount} questions):

Q[number]. [question text]
${type === "MCQ" ? "A. [option]\nB. [option]\nC. [option]\nD. [option]\n" : ""}Answer: [correct answer]
Explanation: [one-line explanation]

Do not include any introduction or conclusion. Only output the questions.
`.trim();

  try {
    const result = await model.generateContent(prompt);
    const output = result.response.text();

    const saved = await prisma.generatedContent.create({
      data: {
        userId: req.userId,
        mode: "OBJECTIVE",
        topic,
        subject,
        options: { count: parsedCount, difficulty, type },
        output,
      },
    });

    return res.status(200).json({
      message: "Objective questions generated",
      contentId: saved.id,
      output,
    });
  } catch (err) {
    console.error("Objective generation error:", err);
    return res.status(500).json({ error: "Failed to generate content" });
  }
});

// POST /api/generate/seminar
router.post("/seminar", authMiddleware, async (req, res) => {
  const { topic, subject, duration, audience, includeQA } = req.body;

  if (!topic || !subject || !duration || !audience) {
    return res.status(400).json({ error: "All fields are required: topic, subject, duration, audience" });
  }

  const validDurations = [5, 10, 15, 20, 30];
  if (!validDurations.includes(Number(duration))) {
    return res.status(400).json({ error: "duration must be 5, 10, 15, 20, or 30 minutes" });
  }

  const qaSection = includeQA === true || includeQA === "true"
    ? `
After the main script, add a section titled "Q&A Preparation" with 5 likely questions the audience may ask, each with a confident, well-structured answer.`
    : "";

  const prompt = `
You are an expert seminar script writer for Indian college students.

Write a complete seminar presentation script for the following:
- Subject: ${subject}
- Topic: ${topic}
- Duration: ${Number(duration)} minutes
- Target Audience: ${audience}

Structure the script as follows:
1. Introduction (greet the audience, introduce yourself and the topic) — ~1 minute
2. Overview (brief outline of what will be covered)
3. Main Content (divide into clear sections with headings, cover the topic in depth appropriate for ${Number(duration)} minutes)
4. Key Takeaways (3-5 bullet points summarizing the most important points)
5. Conclusion (closing statement, thank the audience)

Include natural speaker cues like [pause], [show slide], [make eye contact] where appropriate.
${qaSection}

Do not include any meta-commentary. Write the script directly as if the presenter will read it.
`.trim();

  try {
    const result = await model.generateContent(prompt);
    const output = result.response.text();

    const saved = await prisma.generatedContent.create({
      data: {
        userId: req.userId,
        mode: "SEMINAR",
        topic,
        subject,
        options: { duration: Number(duration), audience, includeQA: includeQA === true || includeQA === "true" },
        output,
      },
    });

    return res.status(200).json({
      message: "Seminar script generated",
      contentId: saved.id,
      output,
    });
  } catch (err) {
    console.error("Seminar generation error:", err);
    return res.status(500).json({ error: "Failed to generate content" });
  }
});

module.exports = router;