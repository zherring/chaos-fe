import numpy as np
import matplotlib.pyplot as plt

# Correcting the calculation to reflect the increased difficulty in collecting new numbers

def calculate_cumulative_rolls_corrected(start, end, increment):
    increments = np.arange(start, end + increment, increment)
    cumulative_rolls = []
    total_rolls = 0

    for range_end in increments:
        expected_rolls = range_end  # Expected rolls to collect all numbers in the current range
        total_rolls += expected_rolls
        cumulative_rolls.append(total_rolls)

    return increments, cumulative_rolls

# Recalculating cumulative rolls from number range 10 to 100
increments, cumulative_rolls_corrected = calculate_cumulative_rolls_corrected(10, 100, 1)

# Plotting the corrected cumulative rolls for each number range
plt.figure(figsize=(10, 6))
plt.plot(increments, cumulative_rolls_corrected, marker='o', linestyle='-', color='g')
plt.title('Cumulative Expected Rolls vs Number Range')
plt.xlabel('Number Range (N)')
plt.ylabel('Cumulative Expected Rolls')
plt.grid(True)
plt.show()

def calculate_rolls_and_pot(start, end, increment, cost_per_roll):
    increments = np.arange(start, end + increment, increment)
    cumulative_rolls = []
    average_pots = []
    total_rolls = 0
    pot = 0

    for range_end in increments:
        expected_rolls = range_end
        total_rolls += expected_rolls
        cumulative_rolls.append(total_rolls)
        
        pot += expected_rolls * cost_per_roll
        winner_prize = pot * 0.5
        pot = winner_prize  # 50% stays in the pot for the next round
        average_pots.append(pot)

    return increments, cumulative_rolls, average_pots

# Parameters
start, end, increment = 10, 100, 1
cost_per_roll = 0.05  # 5 cents per roll

# Calculate rolls and pot
increments, cumulative_rolls, average_pots = calculate_rolls_and_pot(start, end, increment, cost_per_roll)

# Plotting
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 10))

# Plot cumulative rolls
ax1.plot(increments, cumulative_rolls, color='tab:blue', marker='o', linestyle='-')
ax1.set_xlabel('Number Range (N)')
ax1.set_ylabel('Cumulative Expected Rolls')
ax1.set_title('Cumulative Expected Rolls vs Number Range')
ax1.grid(True)

# Plot average pot size
ax2.plot(increments, average_pots, color='tab:orange', marker='s', linestyle='-')
ax2.set_xlabel('Number Range (N)')
ax2.set_ylabel('Average Pot Size ($)')
ax2.set_title('Average Pot Size vs Number Range')
ax2.grid(True)

plt.tight_layout()
plt.show()

print(f"Final pot size: ${average_pots[-1]:.2f}")
print(f"Total rolls: {cumulative_rolls[-1]}")
print(f"Total money in: ${cumulative_rolls[-1] * cost_per_roll:.2f}")
