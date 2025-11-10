package main 

func main() {
	word := "golang"
	attempts := 6
	currentWords := initalizeCurrentWordState(word)


	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("Hangman Game :)")

	for atempts > 0 {
		currentState(currentWords, attempts)
		userInput := getUserInput(scanner)

		if !isValidInput(userInput) {
			fmt.Println("invalid user input, you need to type in a single letter")
			continue
		}
	}
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