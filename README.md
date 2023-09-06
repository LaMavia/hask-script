# hask-script

A functional javascript transformer.

## Built-In Predicate

```hs
isBuiltIn env expression =
  if isDottedExpression expression
    then isBuiltIn env (getPrimaryToken expression)
    else !isInScope env expression && !isMapped env expression
```
