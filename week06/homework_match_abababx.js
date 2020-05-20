function match(string) {
  let state = start;
  for (let c of string) {
    console.log(c);
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if (c === "a") {
    return foundA;
  } else {
    return start;
  }
}

function end(c) {
  // trap 终态
  return end;
}

function foundA(c) {
  if (c === "b") {
    return foundB;
  } else {
    // foundA有三种分支 在此拿到a、拿到b、拿到ab以外的字符
    // 拿到a时可以使用start(c)回到A状态 拿到ab以外的字符也可以使用start(c)回到start状态
    return start(c);
  }
}

function foundB(c) {
  if (c === "a") {
    return foundA2;
  } else {
    return start(c);
  }
}

function foundA2(c) {
  if (c === "b") {
    return foundB2;
  } else {
    return start(c);
  }
}

function foundB2(c) {
  if (c === "a") {
    return foundA3;
  } else {
    return start(c);
  }
}

function foundA3(c) {
  if (c === "b") {
    return foundB3;
  } else {
    return start(c);
  }
}

function foundB3(c) {
  if (c === "x") {
    return end;
  } else {
    return foundB2(c);
  }
}

console.log(match("xababababxx"));
