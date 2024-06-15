import { object, string, number, array, Infer } from 'superstruct'

export const OldText = object({
    text: string(),
    id: number(),
})
export const ReplaceTextInput = object({
    description: string(),
    oldText: array(OldText),
})

export type OldText = Infer<typeof OldText>

export type ReplaceTextInput = Infer<typeof ReplaceTextInput>

export const OldImage = object({
    url: string(),
    id: number(),
})
export type OldImage = Infer<typeof OldImage>
