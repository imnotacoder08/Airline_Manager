function add(){
    let num = 1;
    return ()=>{
        num = num+1;
        return num
    };
}//IIFE 
// const adder = add()
// const adder = (()=>{
//     let num = 1;
//     return ()=>{
//         num = num+1;
//         return num
//     };
// })()

// console.log(adder())
// console.log(adder())
// console.log(adder())

//  ###############################################################

const React = ( ()=>{
    let val = []
    let idx = 0;
    function useState(initialValue){
        const _idx = idx;
        const state = val[idx] || initialValue
        function setState(newVlaue){
            val[_idx] = newVlaue
        }
        idx++;
        return [state,setState]
    }
    function render(component){
        idx = 0;
        const com = component()
        com.print()
        return com;
    }
    return {useState,render}
})()
console.log(React)
const initialValue = 5

const Component = ()=>{
    const [state,setState] = React.useState(initialValue)
    const [newstate,setNewState] = React.useState("initialValue")
    return {
        print:()=>console.log(state,newstate),
        set:(val)=>setState(val),
        type:(val)=>setNewState(val)
    };
}

const App = React.render(Component)
App.type("any value")
App = React.render(Component)
App.set(7)
App = React.render(Component)