export enum QuestionTypes {
    QNA, MCQ, MCQ_CHOSSE_ALL
}
export type TestDataType = {
    id: number, question: string, questionType: QuestionTypes, choices?: Array<string>
}

export const testData: Array<TestDataType> = [
    {
        id: 1,
        question: "Adam and Eve were happy outside the garden of Eden.",
        questionType: QuestionTypes.MCQ,
        choices: ["true", "false"]
    },
    {
        id: 2,
        question: "When sin enters life, one sin leads to another.",
        questionType: QuestionTypes.MCQ,
        choices: [
            "true", "false"
        ]
    },
    {
        id: 3,
        question: "Cain's sins cut him off from God but made him popular with other people.",
        questionType: QuestionTypes.MCQ,
        choices: [
            "true", "flase"
        ]
    },
    {
        id: 4,
        question: "Abel was more concerned about pleasing God than he was about pleasing himself.",
        questionType: QuestionTypes.MCQ,
        choices: [
            "true",
            "false"
        ]
    },
    {
        id: 5,
        question: "Which of these mountains are located in Nepal?",
        questionType: QuestionTypes.MCQ_CHOSSE_ALL,
        choices: [
            "Everest", "Annapurna", "K2", "Ama dablan", "Kailash Parbat"
        ]
    },
    {
        id: 6,
        question: "When God accepted Abel's offering and rejected Cain's, Cain . . . .",
        questionType: QuestionTypes.MCQ,
        choices: [
            "congratulated Abel",
            "prayed to God",
            "became angry"
        ]
    },
    {
        id: 7,
        question: "How many of these cities are located in India?",
        questionType: QuestionTypes.MCQ_CHOSSE_ALL,
        choices: [
            "Mumbai", "Tashkin", "Kolkata", "Tiblisi"
        ]
    },
    {
        id: 8,
        question: "Cain was the first person in history to . . . .",
        questionType: QuestionTypes.MCQ,
        choices: [
            "offer an animal sacrifice",
            "kill another human being",
            "sin against God"
        ]
    },
    {
        id: 9,
        question: "Abel offered an animal sacrifice because he . . . .",
        questionType: QuestionTypes.MCQ,
        choices: [
            "understood the meaning of the sacrificial lamb",
            "wanted to please God",
            "was afraid of God's punishment"
        ]
    },
    {
        id: 10,
        question: "What was wrong with Cain's gift to God?",
        questionType: QuestionTypes.QNA,
    },
    {
        id: 11,
        question: "Why was God pleased with Abel's offering?",
        questionType: QuestionTypes.QNA,
    },
    {
        id: 12,
        question: "What did you learn in Lesson Four that was very important to you?",
        questionType: QuestionTypes.QNA
    }
]