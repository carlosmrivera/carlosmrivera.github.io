def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """

    return [x for x in lst if x]


print(compact([0, 1, 2, '', [], False, (), None, 'All done']))
