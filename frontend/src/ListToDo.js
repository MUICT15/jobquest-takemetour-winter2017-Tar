import React from 'react';
import { graphql ,compose} from 'react-apollo';
import gql from 'graphql-tag';

const queryListToDo = gql`
    query AllTodo{
        listTodos
      }
`;

const mutationTodo = gql`
    mutation add($todo:String!){
        addTodos(todo:$todo)
    }
`

const mutationRemoveTodo = gql`
    mutation remove($index:Int){
        remove(index: $index)
    }
`
class ListToDoComponent extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            newToDo:''
        };
    }
    
    addToDo(event){
        this.setState({
            newToDo: event.target.value
        });
    }
    add(){
        this.props.add({
            variables:{
                todo: this.state.newToDo
            }
        })
        this.props.data.refetch();
    }
    remove(index){
        this.props.remove({
            variables:{
                index: index
            }
        })
        this.props.data.refetch();
    }
    render(){
        if(this.props.data.loading === true){
            return(
                <h1>โหลด</h1>
            )
        }else{
            return(
                <div>
                    <br/>
                    <input type="text" onChange={this.addToDo.bind(this)}/>
                    <button type="button" onClick={this.add.bind(this)} >เพิ่ม</button>
                    <ul>
                        {this.props.data.listTodos.map((value , index)=>{
                    return(
                        <li key={index}>{value} </li>
                    )
                })}
                    </ul>
                </div>
            )
        }
        
    }
}

const query = compose(
    graphql(queryListToDo ,),
    graphql(mutationTodo,{name: 'add'}),
    graphql(mutationRemoveTodo,{name: 'remove'})
)(ListToDoComponent);

export default query;