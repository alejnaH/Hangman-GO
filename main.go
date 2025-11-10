package main 

func main() {
	word := "golang"
	attempts := 6
	currentWords := initalizeCurrentWordState(word)


	scanner := bufio.NewScanner(os.Stdin)
	guessedLetters := make(map[string]bool)
	fmt.Println("Hangman Game :)")

	for atempts > 0 {
		currentState(currentWords, attempts)
		userInput := getUserInput(scanner)

		if !isValidInput(userInput) {
			fmt.Println("..you need to type in a single letter..")
			continue
		}

		if guessedLetters[userInput] {
			fmt.Println("...uhmm already guessed that letter..")
			continue
		}
		guessedLetters[userInput] = true

		correctGuess := updateGuessedLetters(word, currentWords, userInput)
	}
}

func isValidInput(input string) bool {
	return utf8.RuneCountInString(input) == 1
}

func getUserInput(scanner *bufio.Scanner) string {
	scanner.Scan()
	return scanner.Text()
}

func initializeCurrentWords(word string) []string {
	currentWords := make([]string, len(word))
	for i := range currentWords {
		currentWords[i] = "_"
	}
	return currentWords
}

func currentState(currentWords []string, attempts int) {
	fmt.Println("Current state of the word is ", strings.Join(currentWords, " "))
	fmt.Println("Attempts left ", attempts)
}