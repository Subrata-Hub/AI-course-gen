/* eslint-disable camelcase */
/* eslint-disable react/jsx-key */
"use client";
import React, { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const RightSideBar = ({ questions }) => {
  const [answers, setAnswers] = useState({});
  const [questionState, setQuestionState] = useState({});

  const checkAnswer = useCallback(() => {
    const newQuestionState = { ...questionState };
    questions.forEach((question) => {
      const user_answer = answers[question._id];
      if (!user_answer) return;
      if (user_answer === question.answer) {
        newQuestionState[question._id] = true;
      } else {
        newQuestionState[question._id] = false;
      }
      setQuestionState(newQuestionState);
    });
  }, [answers, questionState, questions]);
  console.log(questions);
  return (
    <div className="p-2">
      <h1 className="text-xl font-semibold">Concept Check</h1>
      <div className="mt-4">
        {questions.map((question, index) => (
          <div
            key={question._id}
            className={cn("p-3 mt-4 border border-secondary rounded-lg", {
              "bg-green-700": questionState[question._id] === true,
              "bg-red-700": questionState[question._id] === false,
              "bg-secondary": questionState[question._id] === null,
            })}
          >
            <h2>
              <span className="text-lg">
                Q{index + 1}. {}
              </span>
              {question?.question}
            </h2>
            <RadioGroup
              className="mt-2"
              onValueChange={(e) => {
                setAnswers((prev) => {
                  return {
                    ...prev,
                    [question._id]: e,
                  };
                });
              }}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 ">
                  <RadioGroupItem value={option} id={question._id} />

                  <Label htmlFor={question._id}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
      <Button className="mt-2 w-full" size="lg" onClick={checkAnswer}>
        Check Answer
        <ChevronRight className="ml-1 size-4" />
      </Button>
    </div>
  );
};

export default RightSideBar;
