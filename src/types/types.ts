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
    id?: string;
    className?: string;
    label: string;
    placeholder: string;
    options?: Array<SearchBarOption>;
    json?: object;
    input?: string;
    inputFunc?: (event: ChangeEvent<HTMLInputElement>) => void;
    selectFunc?: (event: ChangeEvent<HTMLSelectElement>) => void;
    onClick?: (json: object) => void;
    onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
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
    IgnoreNasalSound: boolean;
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

export type SearchResultType = {
    className?: string;
    lomaji: string;
    hanjiKip: string;
    hanjiClj?: string;
    onClick?: (lomaji:string, hanjiKip:string) => void;
}

export type RhymeSearchResultsType = {
    className?: string;
    results?: SearchResultType[];
    successful?: boolean;
    onWordInfoClick?: (lomaji: string, hanjiKip: string) => void;
}

export type Syllable = {
    lomaji: string,
    hanjiKip?: string | null,
    hanjiClj?: string | null,
    consonant?: string | null,
    vowel: string,
    coda?: string | null,
    tone: number,
    nasal?: boolean
}

export type SearchResultWordInfoType = {
    lomaji: string;
    hanjiKip: string;
    hanjiClj?: string;
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
    onClose?: () => void;
}

export type LoadingType = {
    text?: string;
    className?: string;
}

export type HomepageAnnouncementTitleType = {
    id: number;
    title: string;
    createdAt: Date;
}

export type Announcement = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    isFalse?: boolean;
}