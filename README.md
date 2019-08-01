## Tic Tac Toe
A React web application that implements a customizable NxN game of Tic Tac Toe.

## Features:
* Set a custom NxN size of the board.
* Scorecard to keep track of X & O score.
* Keep track of whose turn it is.
* Keeping track of X and 0s in each row/column. After each action, we are updating the numbers. It only needs to check number of X & O in dimension.
* Efficiently determine a winner with dynamic programming.
	* Theoretically, my application supports `N = [0, 2^53 - 1]`, the largest 64-bit floating point value that JavaScript can handle.

## Setup
* npm install
* npm start
* __open [http://localhost:3000](http://localhost:3000)__
