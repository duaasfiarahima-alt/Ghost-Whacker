# Ghost Whacker

This is my Halloween game that I made with p5.js. Ghosts pop out of graves and you have to click them before they sink back down. It's kind of like whack-a-mole but spooky.

## How to play

- Click (or tap) the **ghosts** to get points.
- Don't click the **bats**. If you hit a bat you lose a life.
- You have **3 lives**. Lose them all and it's game over.
- Beat all 3 levels to win.

## The levels

| Level | Name | Ghosts to hit | What's different |
| 1 | Quiet Graveyard | 10 | Slow ghosts, no bats. Good for warming up. |
| 2 | Bat Night | 15 | Ghosts are faster and bats start showing up. |
| 3 | Midnight Rush | 20 | Everything is the fastest and there are the most bats. |

## Controls

- **Mouse click / finger tap:** whack a ghost
- **Enter:** start the game or go to the next level (clicking works too)

## How to run it

1. Copy the code into a file called `index.html`.
2. Open the file in a web browser (Chrome, Firefox, etc.).
3. That's it! You need internet though, because it loads p5.js from a CDN.

## How the code works

- The game has a `state` variable that keeps track of what screen you're on: `title`, `play`, `between`, `over`, or `win`.
- There are 9 graves (holes) in a 3x3 grid. Every so often the game picks a random one and puts either a ghost or a bat in it.
- Each level is an object in the `LV` list with its own settings:
  - `goal`: how many ghosts you need to hit
  - `stay`: how long a ghost or bat stays up (in milliseconds)
  - `gap`: how long to wait before the next one pops up
  - `bats`: the chance that something is a bat instead of a ghost
- `mousePressed()` checks if you clicked close enough to a ghost or bat using `dist()`.

## Want to make it harder or easier?

Change the numbers in `LV` at the top of the code. Lower `stay` and `gap` to make it harder, or raise them to make it easier. Raising `bats` gives you more bats to avoid.

