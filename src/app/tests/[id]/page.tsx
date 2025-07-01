"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, gql } from "@apollo/client";

// GraphQL-запрос для получения теста
const GET_TEST = gql`
  query GetTest($id: ID!) {
    test(id: $id) {
      id
      title
      description
      questions {
        id
        text
        options {
          id
          text
          isCorrect
        }
      }
    }
  }
`;

// Мутация для сохранения результата
const SUBMIT_RESULT = gql`
  mutation SubmitResult($testId: ID!, $score: Int!) {
    submitResult(testId: $testId, score: $score) {
      id
      score
    }
  }
`;

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data, loading, error } = useQuery(GET_TEST, { variables: { id } });
  const [submitResult] = useMutation(SUBMIT_RESULT);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // Таймер
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <p>Loading test...</p>;
  if (error || !data?.test) return <p>Error loading test.</p>;

  const { test } = data;

  const handleSelect = (qId: string, optId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const handleSubmit = async () => {
    const calc = test.questions.reduce(
      (acc, q) =>
        answers[q.id] &&
        q.options.find((o: any) => o.id === answers[q.id] && o.isCorrect)
          ? acc + 1
          : acc,
      0
    );
    setScore(calc);
    await submitResult({ variables: { testId: id, score: calc } });
    router.push(`/profile/me`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{test.title}</h1>
      <p>{test.description}</p>
      <p>Time left: {timeLeft} seconds</p>

      {test.questions.map((q: any) => (
        <div key={q.id} className="card p-4 shadow">
          <p className="font-semibold mb-2">{q.text}</p>
          {q.options.map((o: any) => (
            <label key={o.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name={q.id}
                value={o.id}
                checked={answers[q.id] === o.id}
                onChange={() => handleSelect(q.id, o.id)}
                className="radio"
              />
              <span>{o.text}</span>
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={Object.keys(answers).length !== test.questions.length}
        className="btn btn-primary"
      >
        Submit Test
      </button>

      {score !== null && (
        <p className="text-lg font-medium">
          Your score: {score} of {test.questions.length}
        </p>
      )}
    </div>
  );
}
