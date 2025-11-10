package game

import (
	"math/rand"
	"strings"
	"time"
	"unicode"
)

type State struct {
	Mask      string `json:"mask"`
	Misses    int    `json:"misses"`
	MaxMisses int    `json:"maxMisses"`
	Won       bool   `json:"won"`
	Lost      bool   `json:"lost"`
	Guessed   string `json:"guessed"` // e.g. "AEIO"
}

type Game struct {
	word      string
	guessed   map[rune]bool
	misses    int
	maxMisses int
}

var words = []string{
	"COMPUTER", "PROGRAM", "HANGMAN", "ALGORITHM", "DATABASE",
	"PYTHON", "GOLANG", "KOTLIN", "VECTOR", "MATRIX",
}

func NewRandom() *Game {
	rand.Seed(time.Now().UnixNano())
	w := words[rand.Intn(len(words))]
	return &Game{
		word:      w,
		guessed:   map[rune]bool{},
		misses:    0,
		maxMisses: 10, // you can change this
	}
}

func (g *Game) mask() string {
	var b strings.Builder
	for _, r := range g.word {
		if g.guessed[r] {
			b.WriteRune(r)
		} else {
			if unicode.IsLetter(r) {
				b.WriteRune('_')
			} else {
				b.WriteRune(r)
			}
		}
		b.WriteRune(' ')
	}
	return strings.TrimSpace(b.String())
}

func (g *Game) inWord(r rune) bool {
	for _, x := range g.word {
		if x == r {
			return true
		}
	}
	return false
}

func (g *Game) allRevealed() bool {
	for _, r := range g.word {
		if unicode.IsLetter(r) && !g.guessed[r] {
			return false
		}
	}
	return true
}

func (g *Game) State() State {
	return State{
		Mask:      g.mask(),
		Misses:    g.misses,
		MaxMisses: g.maxMisses,
		Won:       g.allRevealed(),
		Lost:      g.misses >= g.maxMisses,
		Guessed:   guessedString(g.guessed),
	}
}

func guessedString(m map[rune]bool) string {
	var s []rune
	for r := range m {
		s = append(s, r)
	}
	return string(s)
}

func (g *Game) Guess(letter string) State {
	if letter == "" {
		return g.State()
	}
	r := rune(unicode.ToUpper(rune(letter[0])))
	if !unicode.IsLetter(r) {
		return g.State()
	}
	// already guessed? just return state
	if g.guessed[r] {
		return g.State()
	}
	g.guessed[r] = true
	if !g.inWord(r) {
		g.misses++
	}
	return g.State()
}
