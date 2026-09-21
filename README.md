# ITE 18 Topic 4 - Class Resource Loader

**Section:** FNHP1
**Name:** Jia Marie Garong


## Part 1: Predictions A to F Answers

### A. Event registration
- **When `Hello` appears:** Immediately when the script evaluates `greet()`.
- **Will a later click call `greet`?** No, because `addEventListener` receives `undefined`.
- **Correction:** `button.addEventListener("click", greet);`

### B. Independent closures
- **Predicted output:** `1`, `2`, `1`, `3`
- **Explanation:** Each call to `makeCounter()` creates a new scope with its own `n` variable. Calling `b()` increments `b`'s isolated counter from 0 to 1 without affecting `a`'s counter state.

### C. Event loop order
- **Output order:** `A`, `B`, `C`, `D`
- **Synchronous logs:** `A`, `B`
- **Promise microtask:** `C`
- **Timer task (macrotask):** `D`
- **Explanation:** `setTimeout` callbacks go to the macrotask queue, which only executes after the synchronous call stack finishes and all pending microtasks (Promises) drain.

### D. Promise chaining
- **Predicted value:** `undefined`
- **Repaired handler:** `.then(n => { return n * 2; })`
- **Role of `return`:** Explicitly passes the transformed value to the next `.then()` in the chain.

### E. Rejection and cleanup
- **Output order:** `outside`, `Offline`, `cleanup`
- **Does `success` appear?** No, `await Promise.reject(...)` throws an error directly into `catch`.
- **Why `outside` executes first:** Encountering `await` inside an `async` function pauses its body execution and returns control back to the caller, running remaining synchronous code first.

### F. Class inheritance
- **What happens:** ReferenceError (accessing `this` before calling `super()`).
- **Correction:**
  ```javascript
  constructor(title, minutes) {
    super(title);
    this.minutes = minutes;
  }
