import type { ChangeEvent } from "react";

export type className = {
    className?: string;
}
export type RhymeCardType = {
    className?: string;
    rhyme: string;
    exampleHanji: string;
    amount: number;
    note?: string;    
}
export type SearchBarType = {
    className?: string;
    label: string;
    placeholder: string;
    options?: Array<SearchBarOption>;
    json?: object;
    submitAction?: (json: object) => Promise<any>;
}
export type CheckboxType = {
    className?: string;
    labelclassName?: string;
    checkboxId: string;
    label: string;
    disabled?: boolean;
    checked?: boolean;
    onChangeFunc?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type RhymeSearchOptionStates = {
    NasalSound: boolean;
    SimilarVowel: boolean;
    IgnoreFinalSound: boolean;
    SameArticulationPart: boolean;
    SameTone: boolean;
}

export type TopicType = {
    className?: string;
    title: string;
    content: string;
    author: string;
    likesAmount: number;
    commentsAmount: number;
    pined: boolean;
    liked: boolean;
    createAt: Date;
    updatedAt?: Date;
}

export type SearchBarOption = {value: "", text: ""};