package main

import (
	"context"

	"HangmanUI/internal/game"
)

// App struct
type App struct {
	ctx context.Context
	g   *game.Game
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Called from UI to start/refresh a game
func (a *App) NewGame() game.State {
	a.g = game.NewRandom()
	return a.g.State()
}

// Called from UI to make a guess
func (a *App) Guess(letter string) game.State {
	if a.g == nil {
		a.g = game.NewRandom()
	}
	return a.g.Guess(letter)
}

// Called from UI to read current state
func (a *App) GetState() game.State {
	if a.g == nil {
		a.g = game.NewRandom()
	}
	return a.g.State()
}
