# GorillaWarfareAI
Modded Chess with Artificial Intelligence Integration

#### Character Properties

All Character pieces have designated properties including: 
> ( Heatlh Points, Attack Damage, Step Count, Allowed Terrains ) 
## Dependencies
- p5 :: [Reference](https://p5js.org/reference/)
- lodash [Reference](https://lodash.com/)
- webpack [Reference](https://webpack.js.org/)
### Setup

Install Nodejs and npm [here](https://nodejs.org/en/).

Install Webpack
```
cd GorillaWarfare
npm install webpack --save-dev
npm install webpack-cli --save-dev
```

Load Dependencies into your Project
```
npm install
```

### Build
Bundle and build code with:
```
npm run build
```
### Run Locally
Setup a local server:
```
py -m http.server
```

Open localhost:8000 on browser.
# Files

## Board
Manages the Game State of Gorilla Warfare containing the grid of Tiles and Player profiles. It switches the game states between Move and Attack. 
#### Included Functions
- createNewGrid()
- showPawnAttackDirection()
- attackTargetPawn(x,y)
- checkPawnDeath(tileX,tileY,pawnName)
- togglePlayerTurn()
- showPawnAttack(x,y)
- movePawn(currentTile)

## Tile
Manages sections of the board dealing holding potential characters and terrains. This class creates a buffer between the board and the characters handling the visual aspects of the board.

## KongAI
Manages AI behavior in response to the current game board. KongAI is responsible for identifying the best possible move, making changes to the board respectively. 
#### Included Functions
- measureWeights(prevPlayerStatus,currPlayerStatus)
- applyMiniMaxScore(root,toMaximize)
- findOptimalState()
- updateBoard(gameBoard)
## Pawn
Base class for each character in the game. Pawn is responsible for implementing each character's basic behavior and properties. Each of the sublevel classes that are more specific will have unique implementations that override the base class implementation.

#### Included Functions
- getAvailableAttacks(direction)
- move(targetPos)
- getTargets(boardGrid)