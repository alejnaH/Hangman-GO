package main 

func main() {
	word := "golang"
	attempts := 6
	currentWords := initalizeCurrentWordState(word)

	fmt.Println("Hangman Game :)")
	displayCurrentState(currentWords, attempts)
}

func initializeCurrentWords(word string) []string {
	currentWords := make([]string, len(word))
	for i := range currentWords {
		currentWords[i] = "_"
	}
	return currentWords
}