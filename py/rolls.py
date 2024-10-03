import math
import matplotlib.pyplot as plt

def prob_all_same(n):
    return 1 / (n**4)  # Probability of all 5 dice showing the same number

def expected_rolls_new_player(n):
    return 5 / prob_all_same(n)  # Expected number of rolls to get 5 sets

def expected_rolls_existing_player(n, prev_n):
    return (5 - math.floor(prev_n / n)) / prob_all_same(n)

def main():
    max_n = 100
    step = 5
    difficulties = range(10, max_n + 1, step)
    
    avg_rolls_new = [expected_rolls_new_player(n) for n in difficulties]
    
    avg_rolls_existing = []
    prev_n = 10
    for n in difficulties:
        avg_rolls_existing.append(expected_rolls_existing_player(n, prev_n))
        prev_n = n

    plt.figure(figsize=(12, 6))
    plt.plot(difficulties, avg_rolls_new, marker='o', label='New Player')
    plt.plot(difficulties, avg_rolls_existing, marker='s', label='Existing Player')
    plt.title("Expected Number of Rolls vs. Difficulty")
    plt.xlabel("Number of Possible Values (Difficulty)")
    plt.ylabel("Expected Number of Rolls")
    plt.legend()
    plt.grid(True)
    plt.savefig('rolls_plot.png')
    plt.show()
    print("Plot saved as 'rolls_plot.png'")

if __name__ == "__main__":
    main()
