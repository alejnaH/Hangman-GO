package main 

func main() {
	word := "golang"
	attempts := 6
	currentWords := initalizeCurrentWordState(word)

	fmt.Println("Hangman Game :)")
	displayCurrentState(currentWords, attempts)
}
