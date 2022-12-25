// // Closure is way for functions to have private variables.
// function add(){
//     let val = 1;
//    return setValue=()=>{
//         val = val+1;
//         return val
//     }
// }
// const valueChange = add()
// console.log(valueChange())
// console.log(valueChange())
// console.log(valueChange())
// console.log(valueChange())

// ################################################################################//

const react = (function () {
  const val = [];
  let idx = 0
  function useState(initialState) {
      const _idx = idx
    const state = val[idx] || initialState;
    function setState(newValue) {
      val[_idx] = newValue;
    }
    idx++
    return [state, setState];
  }
  function render(component) {
    idx = 0
    const c = component();
    c.print();
    return c;
  }
  return { useState, render };
})();

function component() {
    const [state, setState] = react.useState(5);
    const [text, setText] = react.useState("val");
  return {
    print: () => console.log({state, text}),
    click: () => setState(state + 1),
    type: (value) => setText(value),
  };
}

let App = react.render(component);
App.type("cdsa");
App.click();
App = react.render(component);
App.click();
App = react.render(component);
App.click();
App.type("casd");
App = react.render(component);
