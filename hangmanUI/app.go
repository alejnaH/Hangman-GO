package main

import (
	"context"

	"HangmanUI/internal/game"
)

type App struct {
	ctx context.Context
	g   *game.Game
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) NewGame() game.State {
	a.g = game.NewRandom()
	return a.g.State()
}

func (a *App) Guess(letter string) game.State {
	if a.g == nil {
		a.g = game.NewRandom()
	}
	return a.g.Guess(letter)
}

func (a *App) GetState() game.State {
	if a.g == nil {
		a.g = game.NewRandom()
	}
	return a.g.State()
}
