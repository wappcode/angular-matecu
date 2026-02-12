/**
 * [value,label]
 */
export type MatecuAutocompleteOption = [string, string];
export type MatecuAutocompleteFilterFn = (optionLabel: string, search: string) => boolean;
