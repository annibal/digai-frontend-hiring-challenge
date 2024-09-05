import { v4 as uuidv4 } from "uuid";

export interface Interview {
  id: string;
  job: string;
  responded: boolean;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  limit: number;
  audioAnswer?: Blob[];
  hasAnswer?: boolean;
}

export default function getInterviews() {
  const interviews: Interview[] = [
    {
      id: "1234ABCD",
      job: "Frontend Developer",
      responded: false,
      questions: [
        {
          id: "p-um",
          question: "Por que você quer fazer parte dessa empresa?",
          limit: 180,
        },
        {
          id: "p-dois",
          question: "Pode falar um pouco mais sobre você?",
          limit: 30,
        },
        {
          id: "p-tres",
          question: "Por que devemos contratar você?",
          limit: 180,
        },
        {
          id: "p-quatro",
          question: "Onde você se vê daqui a cinco anos?",
          limit: 140,
        },
        {
          id: "p-cinco",
          question: "Como você lida com a pressão e o estresse?",
          limit: 600,
        },
        {
          id: "p-seis",
          question:
            "Pode descrever uma situação em que você trabalhou em equipe?",
          limit: 180,
        },
      ],
    },
  ];

  return interviews;
}
