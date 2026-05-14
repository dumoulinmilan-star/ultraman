function isPalindrome(input) {
    const cleanString = input.toLowerCase().replace(/[^a-z]/g, '');
    const cleanStringArray = cleanString.split('');
    const reversed = [...cleanStringArray].reverse().join("");
    return cleanString === reversed;
}