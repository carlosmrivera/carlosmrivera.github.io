def count_up(start, stop):
    """Print all numbers from start up to and including stop.

    For example:

        count_up(5, 7)

   should print:

        5
        6
        7
    """

    # YOUR CODE HERE
    if start > stop:
        return
    else:
        print(start)
        count_up(start + 1, stop)


count_up(5, 7)
