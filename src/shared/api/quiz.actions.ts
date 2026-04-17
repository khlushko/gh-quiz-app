'use server';

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { QuizSchema } from '@/src/entities/quiz/schemas';
import type { Quiz, QuizMeta } from '@/src/entities/quiz/types';

const QUIZZES_DIR = path.join(process.cwd(), 'src', 'mock-data', 'quizzes');

async function readQuizFile(fileName: string): Promise<Quiz> {
  const filePath = path.join(QUIZZES_DIR, fileName);
  const raw = await readFile(filePath, 'utf-8');
  const parsed = JSON.parse(raw);
  return QuizSchema.parse(parsed);
}

export async function getQuizList(): Promise<QuizMeta[]> {
  const files = await readdir(QUIZZES_DIR);

  const jsonFiles = files.filter((f) => f.endsWith('.json'));
  const quizzes = await Promise.all(jsonFiles.map((f) => readQuizFile(f)));

  return quizzes.map((quiz) => {
    const { questions, ...meta } = quiz;
    void questions;
    return meta;
  });
}

export async function getQuiz(quizId: string): Promise<Quiz> {
  try {
    const quiz = await readQuizFile(`${quizId}.json`);

    if (quiz.quizId !== quizId) notFound();
    
    return quiz;
  } catch {
    notFound();
  }
}
