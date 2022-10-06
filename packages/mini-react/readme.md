## React

### Fiber

* [react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)

### Feature

* createElement
* ReactDOM.render
* function Component
* class Component
* setState update state
* synthetic event and batch update data
* ref:
  * element ref
  * class component ref
  * function component: forward ref
* class component lifecycle:
  * initial(constructor)
  * componentWillMount
  * componentDidMount
  * componentShouldUpdate
  * componentWillUpdate
  * componentDidUpdate

### Note

`React.Memo` only work for primitive value props, if props contain object or function , maybe use it combine with useMemo and useCallback

```tsx
// always render when parent update
const Child = (props) => {
  console.log('props',props)
  return <div>child</div>
}
const Parent = () => {
  const obj = {a:1}
  const fn = () => {
    console.log('fn')
  }
  return <Child obj={obj} fn={fn} />
}
```
