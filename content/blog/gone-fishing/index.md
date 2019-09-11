---
title: "Gone Fishing"
tags: ["python", "education"]
published: true
date: "2019-09-08"
dateComment: "53rd anniversary of Star Trek"
---

This is republished from a Jupyter Notebook I published on a [GitHub Gist](https://gist.github.com/TomFaulkner/eb57a5f468b56abb8241e3fe27e215e4).

After getting the book ["Math Adventures with Python"](https://nostarch.com/mathadventures) I've been more interested in solving math problems in Python and how one might go about it at a junior high or high school level. I teach neither Math or Programming, but I am a programmer. Today I heard the riddle on a Car Talk re-run and decided to solve it using Python.

## The Riddle

RAY: Three guys go out fishing. They decide in advance that whatever they catch, they're going to divvy it up equally.

So, they finish fishing for the day. They pull back into port, and they're going to sleep on the boat overnight. They're going to get up in the morning, divvy up the fish, and go home. In the middle of the night, however, one of the guys has a severe hemorrhoidal flare-up, and he's got to get to the drugstore right away to buy some stuff.

So, he goes to take his third of the fish, and he notices that the number that they caught is not divisible by three, unless he throws one of the fish overboard. So, he throws one of the fish overboard, takes his third and leaves. A few hours later, in the middle of the night, another guy wakes up with horrible stomach pains. He’s gotta have the Kaopectate. So he goes to take his third of the fish, and he notices, interestingly, the same thing -- he can't take a third unless he throws one fish overboard. He throws one fish overboard, takes his third, and goes home.

Third guy gets up in the morning and figures the other guys are still sleeping. So he figures, “I'll just take my third, and I'll go. When they wake up, they can take their third.” However, he realizes that he can't take a third. It's not divisible by three.

He throws one fish overboard, takes his third, and leaves.

## Question

What is the smallest number of fish by which this little scenario could have taken place?

```python
In [28]:

first, second, third = 0, 0, 0
for fish in range(300):
fish_remaining = fish

    if (fish_remaining - 1) % 3:
        continue
    first = (fish_remaining - 1) // 3
    fish_remaining -= 1 + first

    if (fish_remaining - 1) % 3:
        continue
    second = (fish_remaining - 1) // 3
    fish_remaining -= 1 + second

    if (fish_remaining - 1) % 3:
        continue
    third = (fish_remaining - 1) // 3
    fish_remaining -= 1 + third
    break

print(f'Starting {fish}\nFirst: {first}\nSecond: {second}\nThird: {third}\nRotting: {fish_remaining}')
```

```python
Starting 25
First: 8
Second: 5
Third: 3
Rotting: 6
```

## Explanation

This demonstrates a simple for loop with continue and break along with conditionals (if) and the modulus operator to continue iteration when it is proven that the guess is incorrect without doing unnecessary checks. Finally, once the first possible answer is proven the loop breaks rather than iterating further.

Is it better than doing this as an algebraic equation? I don't know, but I think it presents an opportunity for students to think about the logic in another manner and to practice their problem solving skills.

## Answer

RAY: You could do it simply by trial and error. Just keep trying numbers.

Or you can do a very simple equation: Y=2/3(X-1), so that Y is what you end up with, X is what you start with, and you keep plugging in numbers for X until you can solve that equation three times without running into non-integers. That doesn't happen until you get to 25.

They caught 25 fish.

The first guy tosses one overboard because you can't divide 25 by three. That's 24. He takes his third, which is eight, that leaves 16 fish. The next guy comes; you can't divide 16 by three. Throws one overboard. That's 15. He takes five. That leaves 10 fish. The third guy shows up in the morning, there's 10 fish. He thinks he's dividing it again into threes. He can't divide it by three, he throws one fish overboard, takes his three, leaving six fish on the deck to rot.
