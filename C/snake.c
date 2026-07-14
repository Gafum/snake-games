#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#ifdef _WIN32
#include <conio.h>
#include <windows.h>
#else
#include <unistd.h>
#endif

#define WIDTH 18
#define HEIGHT 18
#define AREASIZE (WIDTH * HEIGHT)
int area[AREASIZE];
int direction = 3; // 0 up, 1 down, 2 left, 3 right
int running = 1;

int getRandom(int min, int max) {
    return min + rand() % (max - min + 1);
}

void clearScreen() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void sleepMs(int ms) {
#ifdef _WIN32
    Sleep(ms);
#else
    usleep(ms * 1000);
#endif
}

void initArea() {
    memset(area, 0, sizeof(area));
    int headIndex = WIDTH * (HEIGHT / 2) + WIDTH / 2;
    area[headIndex] = 2;
    area[headIndex + WIDTH] = 1;
}

int getHeadIndex() {
    int best = 0;
    for (int i = 1; i < AREASIZE; i++) {
        if (area[i] > area[best]) {
            best = i;
        }
    }
    return best;
}

int maxValue() {
    int max = 0;
    for (int i = 0; i < AREASIZE; i++) {
        if (area[i] > max) {
            max = area[i];
        }
    }
    return max;
}

void generateFood() {
    int index = getRandom(0, AREASIZE - 1);
    while (area[index] != 0) {
        index = getRandom(0, AREASIZE - 1);
    }
    area[index] = -1;
}

void removeTail() {
    for (int i = 0; i < AREASIZE; i++) {
        if (area[i] > 0) {
            area[i]--;
        }
    }
}

void draw() {
    clearScreen();
    for (int y = 0; y < HEIGHT; y++) {
        for (int x = 0; x < WIDTH; x++) {
            int value = area[y * WIDTH + x];
            char ch = value > 0 ? 'O' : value == -1 ? '*' : '.';
            printf("%c ", ch);
        }
        printf("\n");
    }
    int score = maxValue() - 2;
    if (score < 0) score = 0;
    printf("\nScore: %d\n", score);
    printf("Use arrow keys to move, q to quit.\n");
}

int isKeyPressed() {
#ifdef _WIN32
    return _kbhit();
#else
    return 0;
#endif
}

int readKey() {
#ifdef _WIN32
    int c = _getch();
    if (c == 0 || c == 224) {
        c = _getch();
    }
    return c;
#else
    return getchar();
#endif
}

void handleInput() {
    if (!isKeyPressed()) {
        return;
    }

    int key = readKey();
#ifdef _WIN32
    if (key == 72 && direction != 1) {
        direction = 0;
    } else if (key == 80 && direction != 0) {
        direction = 1;
    } else if (key == 75 && direction != 3) {
        direction = 2;
    } else if (key == 77 && direction != 2) {
        direction = 3;
    } else if (key == 'q' || key == 'Q') {
        running = 0;
    }
#else
    if ((key == 'w' || key == 'W') && direction != 1) {
        direction = 0;
    } else if ((key == 's' || key == 'S') && direction != 0) {
        direction = 1;
    } else if ((key == 'a' || key == 'A') && direction != 3) {
        direction = 2;
    } else if ((key == 'd' || key == 'D') && direction != 2) {
        direction = 3;
    } else if (key == 'q' || key == 'Q') {
        running = 0;
    }
#endif
}

void gameOver() {
    clearScreen();
    printf("Game Over!\n");
    printf("Final score: %d\n", maxValue() - 2);
    printf("Press Enter to exit...\n");
    getchar();
    running = 0;
}

void step() {
    int headIndex = getHeadIndex();
    int nextIndex = headIndex;

    if (direction == 0) {
        nextIndex -= WIDTH;
    } else if (direction == 1) {
        nextIndex += WIDTH;
    } else if (direction == 2) {
        nextIndex -= 1;
    } else if (direction == 3) {
        nextIndex += 1;
    }

    if (direction == 2 && headIndex % WIDTH == 0) {
        gameOver();
        return;
    }
    if (direction == 3 && headIndex % WIDTH == WIDTH - 1) {
        gameOver();
        return;
    }
    if (nextIndex < 0 || nextIndex >= AREASIZE) {
        gameOver();
        return;
    }
    if (area[nextIndex] > 1) {
        gameOver();
        return;
    }

    int ateFood = area[nextIndex] == -1;
    if (!ateFood) {
        removeTail();
    } else {
        generateFood();
    }

    area[nextIndex] = maxValue() + 1;
}

int main(void) {
    srand((unsigned)time(NULL));
    initArea();
    generateFood();
    draw();

    while (running) {
        handleInput();
        step();
        if (!running) {
            break;
        }
        draw();
        sleepMs(200);
    }

    return 0;
}
