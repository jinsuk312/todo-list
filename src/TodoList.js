import React, { Component } from 'react';
import TodoItems from './TodoItems';
import './TodoList.css';

class TodoList extends Component {
    // lets deal with events
    constructor(props){
        // initializes the use of this
        super(props);
        // where we store our items
        this.state = {
            items: []
        }
        // bind this appropriately for addItem method
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    // add item method
    addItem(e){
        // if theres no value we need to create a newItem and add it to our list
        if(this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) =>{
                return{
                    items: prevState.items.concat(newItem)
                };
            });
        }
        // clear the value once its been submitted 
        this._inputElement.value = "";
        console.log(this.state.items);
        // prevent page from reloading on submit
        e.preventDefault();
    }

    deleteItem(key){
        console.log("key in deleteItem: " + key);
        console.log("Items at delete: " + this.state.items);
        var filteredItems = this.state.items.filter(function(item){
            return(item.key !== key)
        })
        this.setState({
            items: filteredItems
        })
    }
    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input 
                            ref={(a) => this._inputElement = a} 
                            placeholder="enter task">
                        </input>
                        <button type="submit">add</button>
                    </form>
                </div>
                <TodoItems 
                    delete={this.deleteItem}
                    entries={this.state.items}
                />
            </div>
        );
    }
}

export default TodoList;