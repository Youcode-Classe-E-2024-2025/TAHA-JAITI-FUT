export const validateInputs = (key, input) => {
    if (!input.value && input.type !== 'file' && key !== 'id') {
        return `${key} can't be empty.`;
    }
    if (key === 'name' && !/^[a-zA-Z\s]{1,25}$/.test(input.value)) {
        return 'Enter a valid name (20 characters or less).';
    }
    if (input.value < 0 || input.value > 100) {
        return `${key} must be between 0 and 100.`;
    }
    if (key === 'position') {
        const validPositions = ['ST', 'LW', 'RW', 'CM', 'RM', 'LM', 'CB', 'RB', 'LB', 'GK'];
        if (!validPositions.includes(input.value.toUpperCase())) {
            return `Select a valid position.`;
        }
    }
    if (input.type === 'file' && !input.files.length) {
        return `Please upload a file for ${key}.`;
    }
    return null;
};