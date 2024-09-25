export enum FunctionType {
    Int = "int",
    Alpha = "alpha",
    Email = "email",
    Password = "password",
    ConfirmPassword = "confirmpass"
}

export enum InputErrorMessage {
    Empty = "must provide a ",
    Email = "must provide a valid email",
    Length = " must be between ",
    Alpha = " must only contain letters.",
    Password = "password must contain an uppercase letter, lowercase letter, and a number.",
    ConfirmPassword = "passwords do not match.",
    Range = " must be a whole number between "
}

// this object is what the developer passes in
export type ValidatorObject = {
    // name on html form input
    body: string,
    
    // label for that input
    label: string,
    
    // length of string
    minLength?: number,
    maxLength?: number,
    
    // range of integers
    minValue?: number,
    maxValue?: number,
    
    // validationChain functions
    type: Exclude<FunctionType, FunctionType.Int>
} | {
    // name on html form input
    body: string,
    
    // label for that input
    label: string,
    
    // length of string
    minLength?: number,
    maxLength?: number,
    
    // range of integers
    minValue?: number,
    maxValue?: number,
    
    // validationChain functions
    type: FunctionType.Int
}