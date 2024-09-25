import { ValidatorObject, InputErrorMessage, FunctionType } from "./types";
import { body, ValidationChain } from "express-validator"

export default function validateInput(constraints: ValidatorObject[]): ValidationChain[] {
    const result = constraints.map((constraint) => {
        let chain: ValidationChain = body(constraint.body).trim().notEmpty().withMessage(InputErrorMessage.Empty + constraint.label)

        switch(constraint.type) {
            case FunctionType.Int:
                chain = chain.isInt({min: constraint.minValue, max: constraint.maxValue}).withMessage(constraint.label + InputErrorMessage.Range + constraint.minValue + ", " + constraint.maxValue)
                break;
            case FunctionType.Alpha:
                chain = chain.isAlpha().withMessage(constraint.label + InputErrorMessage.Length)
                break;
            case FunctionType.Email:
                chain = chain.isEmail().withMessage(InputErrorMessage.Email)
                break
            case FunctionType.Password:
                chain = chain.custom((value) => {
                    let hasLower: boolean = false;
                    let hasUpper: boolean = false;
                    let hasNumber: boolean = false;

                    for (let i = 0; i < value.length; i++) {
                        const letter: string = value[i]

                        // special characters have no effect
                        if (/[A-Z]/.test(letter)) {
                            hasUpper = true;
                        }

                        if (/[a-z]/.test(letter)) {
                            hasLower = true;
                        }

                        if (/\d/.test(letter)) {
                            hasNumber = true;
                        }
                    }

                    if (!hasLower || !hasUpper || !hasNumber) {
                        throw new Error(InputErrorMessage.Password)
                    }

                    return true
                })
                break;
            case FunctionType.ConfirmPassword:
                chain = chain.custom((value, {req}) => {
                    if (value !== req.body.password) {
                        throw new Error(InputErrorMessage.ConfirmPassword)
                    }

                    return true
                })
                break;
            
            default:
                break;
        }

        return chain
    })

    return result
}