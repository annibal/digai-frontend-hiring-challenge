import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Question } from "./interview.provider";

export interface StoreContextType {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  setQuestionAnswerFile: (
    questionId: Question["id"],
    answerData: Question["audioAnswer"]
  ) => void;
}

export interface StoreProviderProps {
  children: ReactNode;
  initialQuestions?: Question[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({
  children,
  initialQuestions,
}: StoreProviderProps) => {
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions || []
  );

  const setQuestionAnswerFile = (
    questionId: Question["id"],
    answerData: Question["audioAnswer"]
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            audioAnswer: answerData,
          };
        }

        return question;
      })
    );
  };

  const hydratedQuestions = questions.map(q => ({
    ...q,
    hasAnswer: (q.audioAnswer || []).some(
      (bObj) => bObj != null && bObj.size > 0
    )
  }))

  const contextValue = {
    questions: hydratedQuestions,
    setQuestions,
    setQuestionAnswerFile,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStoreContext must be used within an StoreProvider");
  }
  return context;
};
