package main 
import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"
	"unicode/utf8"
)

func main() {
	word, err := getRandomWord("word_file.txt")

	if err != nil {
		fmt.Println("error occurred ", err)
		return 
	}

	attempts := 6
	currentWords := initializeCurrentWords(word)


	scanner := bufio.NewScanner(os.Stdin)
	guessedLetters := make(map[string]bool)
	fmt.Println("Hangman Game :)")

	for attempts > 0 {
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

		if !correctGuess {
			attempts--
		}

		displayHangman(6 - attempts)

		if wordGuessed(currentWords, word) {
			fmt.Println("correct !!!")
			return
		} 

		if attempts == 0 {
			fmt.Println(" game over, u lost :( , the correct word was ", word)
			return
		}
	}
}

func getRandomWord(filename string) (string, error) {
	data, err := os.ReadFile(filename)
	if err != nil {
		return "", err
	}

	words := strings.Split(string(data), "\n")
	rand.Seed(time.Now().UnixNano())

	return words[rand.Intn(len(words))], nil
}


func wordGuessed(guessed[] string, word string) bool {
	return strings.Join(guessed, "") == word
}

func displayHangman(incorrectGuesses int){
	if incorrectGuesses >= 0  && incorrectGuesses < len(hangman) {
		fmt.Println(hangman[incorrectGuesses])
	}
}

func updateGuessedLetters(word string, guessed []string, letter string) bool {
	correctGuess := false 

	for i, char := range word {
		if string(char) == letter {
			guessed[i] = letter
			correctGuess = true
		}
	}
	return correctGuess
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