```python
import sys

RATIO1 = 2
RATIO2 = 1.5
RATIO3 = 0.83

def feeding1(start_inoc):
    return start_inoc + RATIO1 * start_inoc + ((RATIO1 * start_inoc) / 2)

def feeding2(f1:float):
    return f1 + RATIO2 * f1 + ((RATIO2 * f1) / 2)

def feeding3(start_inoc):
    f1 = feeding1(start_inoc)
    f2 = feeding2(f1)
    return f2 + RATIO3 * f2 + ((RATIO3 * f2) / 2)


def main():
    x0 = 8
    # Check if an argument was provided
    if len(sys.argv) > 1:
        # Access the first argument after the script name
        start_inoc = sys.argv[1]
        x0 = int(start_inoc)
        print(f"For x0={x0-1} the final amont of LM is {feeding3(x0-1)}g")
        print(f"For x0={x0} the final amont of LM is {feeding3(x0)}g")
        print(f"For x0={x0+1} the final amont of LM is {feeding3(x0+1)}g")
        print("Finished")
    else:
        print("No argument was provided. Expacted: py calculate.py <starting_inoculation_for_feeding1_in_grams>")
        return
    
if __name__ == "__main__":
    main()
```

Example usage:
```
py start.py 9
```