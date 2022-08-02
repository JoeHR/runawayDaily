## React 组件如何通讯

## JSX 本质是什么

## context 是什么，有何用途？

## shouldComponentUpdate 的用途

## 描述 redux 单项数据流

## setState 是同步还是异步？

```JSX
class Root extends React.Component{
  constructor(props){
    super(props)
    this.state = {count:0}
  }

  componentDidMount(){
    this.setState({count:this.state.count+1})
    console.log(this.state.count)
    this.setState({count:this.state.count+1})
    console.log(this.state.count)
    setTimeout(() => {
    this.setState({count:this.state.count+1})
    console.log(this.state.count)
    }, 0)
    setTimeout(function(){
      this.setState({count:this.state.count+1})
        console.log(this.state.count)
    },0)
  }

  render(){
    return <h1>{this.state.count}</h1>
  }
}

```
